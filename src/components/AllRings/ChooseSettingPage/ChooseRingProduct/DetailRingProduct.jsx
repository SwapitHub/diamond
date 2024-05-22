import axios from "axios";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useState } from "react";
import { BiDownArrow, BiSolidPhoneCall, BiUpArrow } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../../App";
import {
  addToWishList,
  removeToWishlist
} from "../../../../redux/action";
import { productList } from "../../../../redux/productAction";
import LoaderSpinner from "../../../LoaderSpinner";
import { ShapePopup } from "../../popups/ShapePopup";

export const DetailRingProduct = () => {
  const history = useHistory(); // Call useHistory at the top level of the component
  const [urlColor, setUrlColor] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var productSlug = queryParams.get("slug");
  const listColor = queryParams.get("color");
  const stock_num = queryParams.get("stock_num");
  console.log(listColor);

  // find url area
  const {baseUrl} = useContext(UserContext)
  const url = window.location.href;
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";

  useEffect(() => {
    // Update URL color when listColor changes
    if (listColor === white) {
      setUrlColor("white");
    } else if (listColor === yellow) {
      setUrlColor("yellow");
    } else if (listColor === rose) {
      setUrlColor("rose");
    } else if (listColor === platinum) {
      setUrlColor("platinum");
    }
  }, [listColor]);

  const user_id = localStorage.getItem("formData");

  const [filterData, setFilterData] = useState([]);
  const [changeOver, setChangeOver] = useState(null);
  const [changeClick, setChangeClick] = useState(listColor);
  const [shapeProduct, setShapeProduct] = useState([]);
  const [selectedShape, setSelectedShape] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selected_2, setSelected_2] = useState(null);
  const [getPrice, setGetPrice] = useState();
  const [shippingDay, setShippingDay] = useState([]);
  const [diamondData, setDiamondData] = useState([]);
  const [variantSlug, setVariantSlug] = useState();
  const [changeOverNature, setChangeOverNature] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const [diamondTypeClick, setDiamondTypeClick] = useState("natural");
  const [diamondTypeColr, setDiamondTypeColor] = useState("18kt");
  const [diamondType, setDiamondType] = useState();
  const [diamondTypeByDefault, setDiamondTypeByDefault] = useState();
  const [shapeOpen, setShapeOpen] = useState(false);
  console.log(diamondTypeClick);
  var globalProductImages = [];

  const [similarProducts, setSimilarProducts] = useState([]);
  const {
    toggledProducts,
    setToggledProducts,
    localWishlist,
    setLocalWishlist,
  } = useContext(UserContext);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistData);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    setLocalWishlist(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

  // function handleWishlist(item) {
  //   const newItem = { item, uniqueId: uuidv4() };
  //   dispatch(addToWishList(newItem));
  //   setToggledProducts((prevState) => ({
  //     ...prevState,
  //     [item.id]: true,
  //   }));
  //   setLocalWishlist([...localWishlist, newItem]);
  // }
  const handleWishlist = async (
    item,
    product_type,
    user_id,
    ring_id,
    ring_color,
    img_sku,
    ring_price
  ) => {
    try {
      const newItem = { item, ring_color, product_type, uniqueId: uuidv4() };
      dispatch(addToWishList(newItem));

      setToggledProducts((prevState) => ({
        ...prevState,
        [item?.id]: true,
      }));
      setLocalWishlist([...localWishlist, newItem]);

      // Construct URL for API call
      const apiUrl = `${baseUrl}/add_to_wishlist?user_id=${user_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${img_sku}&ring_price=${ring_price}&ring_type=${diamondTypeClick}`;
      // Make API call
      const response = await axios.get(apiUrl, {
        // headers: {
        //   "Content-Type": "application/json",
        //   "X-CSRF-TOKEN": shapeData,
        // },
      });

      if (response.status === 200) {
        // setWishListId(response.data.data);
        dispatch(productList());
      } else {
        console.error(
          "Error adding item to wishlist. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function handleWishlistRemove(belowItem) {
    wishlist.map((item) => {
      if (belowItem?.id === item.item?.id) {
        dispatch(removeToWishlist(item));
        setToggledProducts((prevState) => ({
          ...prevState,
          [belowItem?.id]: false,
        }));
        const updatedWishlist = localWishlist.filter(
          (wishlistItem) => wishlistItem.item?.id !== belowItem?.id
        );
        setLocalWishlist(updatedWishlist);
      }
    });

    const keys = Object.keys(wishListDataBase);
    keys.forEach((key) => {
      const item = wishListDataBase[key];
      if (belowItem?.id === item?.ring_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  // useEffect(() => {
  //   const fetchData = debounce(async () => {
  //     try {
  //       if (user_id) {
  //         const response = await axios.get(
  //           ``${baseUrl}/wishlist-items?user_id=${user_id}`

  //           // {
  //           //   headers: {
  //           //     "Content-Type": "application/json",
  //           //     "X-CSRF-TOKEN": shapeData,
  //           //   },
  //           // }
  //         );

  //         if (response.status === 200) {
  //           dispatch(setWishlistDetails(response.data.data));
  //         } else {
  //           console.error("Error Status:", response.status);
  //         }
  //       } else {
  //         console.log(null);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }, 500);

  //   fetchData();

  //   return () => {
  //     // Ensure cleanup by canceling debounce when component unmounts
  //     fetchData.cancel();
  //   };
  // }, [setWishlistDetails, wishlist]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${
          filterData.product?.sku
        }&metalType=${
          listColor === "Platinum" ? "Platinum" : "18kt"
        }&metalColor=${filterData.product?.metalColor}&diamond_type=natural`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondTypeByDefault(response.data.data);
          setDiamondTypeClick("natural");
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, [filterData.product?.sku, listColor, filterData.product?.metalColor]);

  useEffect(() => {
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;

      axios
        .get(removeWish)
        .then((res) => {
          console.log("=====", res.data);
          dispatch(productList());
        })
        .catch((error) => {
          console.log("CSRF Token API Error:", error);
        });
    };

    const debouncedFetchData = debounce(fetchData, 50); // Adjust delay as needed (in milliseconds)

    if (removeWishList !== null) {
      debouncedFetchData();
    }

    return () => debouncedFetchData.cancel(); // Cleanup
  }, [removeWishList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/${productSlug}`
        );

        const product = response.data.data;
        const imgUrl = product.default_image_url
          .split("/")
          .slice(-1)
          .join()
          .split(".")
          .shift();

        // Update state with both product and imgUrl
        setFilterData({
          product: product,
          imgUrl: imgUrl,
        });

        const similarProductsData = JSON.parse(product.similar_products);
        setSimilarProducts(similarProductsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productSlug]);

  // Diamond api

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://apiservices.vdbapp.com//v2/diamonds?type=Diamond&stock_num=${
        stock_num ? stock_num : ""
      }`;

      const params = {
        stock_item_type: "Diamond",
        status: "pending",
      };

      const headers = {
        Authorization:
          "Token token=iltz_Ie1tN0qm-ANqF7X6SRjwyhmMtzZsmqvyWOZ83I, api_key=_eTAh9su9_0cnehpDpqM9xA",
      };

      try {
        const response = await axios.get(url, { params, headers });
        setDiamondData(response.data.response.body.diamonds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // diamond shape
  const [shapeData, setShapeData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/diamondshape`
      )
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  const DetailsRecommended = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  // =====

  // hover change carate color
  const [changePriceColor, setChangePriceColor] = useState([]);
  function changeBackground(color) {
    setChangePriceColor(color);
  }

  // =============

  // var imgUrl = url.split("/").slice(-1).join().split(".").shift();
  const [diamondColor, setDiamondColor] = useState();
  const onChangeOver = (colorName) => {
    setChangeOver(colorName);
  };
  const onChangeClick = (
    productSku,
    ProductMetalColor,
    productType,
    diamond_type,
    colorName,
    getPrice,
    diamondColor
  ) => {
    setChangeClick(colorName);
    setGetPrice(getPrice);
    setDiamondColor(diamondColor);
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${productSku}&metalType=${productType}&metalColor=${diamondColor}&diamond_type=${diamond_type}`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondTypeColor(response.data.data);
          onChangeClickNature(
            productSku,
            ProductMetalColor,
            productType,
            diamond_type,
            diamondColor
          );
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // nature and lab-grown
  const onChangeNature = (original) => {
    setChangeOverNature(original);
  };

  const onChangeClickNature = (
    productSku,
    ProductMetalColor,
    productType,
    diamond_type
  ) => {
    setDiamondTypeClick(diamond_type);
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${productSku}&metalType=${productType}&metalColor=${
          diamondColor ? diamondColor : urlColor
        }&diamond_type=${diamond_type}`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondType(response.data.data);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // nature and lab-grown end

  // ============= shape api
  const shapeOnclick = (shape) => {
    setShapeProduct(shape);
  };

  // faq details page
  var index = 1;
  var index_2 = 2;
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const toggle_2 = (i) => {
    if (selected_2 === i) {
      return setSelected_2(null);
    }
    setSelected_2(i);
  };

  // ===========
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentDay = currentDate.getDate();
  const currentFinalDate = new Date(currentDate);
  currentFinalDate.setDate(
    currentFinalDate.getDate() + parseInt(filterData.product?.shippingDay)
  );
  const formattedDate = currentFinalDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // variant start here
  const handleVariation = (variantSlug) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("slug", variantSlug); // Set the "slug" parameter to the new variantSlug
    const newSearchString = searchParams.toString();

    const newURL = `${"/detail-ring-product"}?${newSearchString}`;
    history.replace(newURL);
    setVariantSlug(variantSlug);
  };

  // const handleVariation = (variantSlug) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   console.log(searchParams);
  //   searchParams.set("slug", variantSlug);
  //   const newSearchString = searchParams.toString();
  //   history.push({
  //     pathname: window.location.pathname,
  //     search: newSearchString,
  //   });
  // };

  return (
    <div className={`details-page container ${stock_num ? "diamond-bread-crumb-active": null}`}>
     
      <div className="">
        <>
          {/* ====================create your ring start */}
          {stock_num !== null ? (
             <div className="ring-choose-setting flex">
             <div className="one-choose-setting">
               <Link to="/engagement-rings/start-with-a-diamond">1. Choose Diamonds</Link>
             </div>
             <div className="svg-icn">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
               >
                 <g clip-path="url(#clip0_492_13580)">
                   <path
                     d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                     stroke="#E8E8E8"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                   <path
                     d="M8.25 12H15.75"
                     stroke="#D7D7D7"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                   <path
                     d="M12.75 9L15.75 12L12.75 15"
                     stroke="#D7D7D7"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                 </g>
                 <defs>
                   <clipPath id="clip0_492_13580">
                     <rect width="24" height="24" fill="white" />
                   </clipPath>
                 </defs>
               </svg>
             </div>
             <div className="one-choose-setting">
               <Link to="/engagement-rings/start-with-a-setting">2. Choose Rings</Link>
             </div>
             <div className="svg-icn">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
               >
                 <g clip-path="url(#clip0_492_13575)">
                   <path
                     d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                     fill="#310F4C"
                     stroke="#734E90"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                   <path
                     d="M8.25 12H15.75"
                     stroke="white"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                   <path
                     d="M12.75 9L15.75 12L12.75 15"
                     stroke="white"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   />
                 </g>
                 <defs>
                   <clipPath id="clip0_492_13575">
                     <rect width="24" height="24" fill="white" />
                   </clipPath>
                 </defs>
               </svg>
             </div>
            
             <div className="one-choose-setting">
               <span>3. Complete Ring </span>
             </div>
           </div>
          ) : (
            <>
              <div className="main-arrow-heading">
                  {/* ====================create your ring start */}
              <div className="ring-choose-setting flex">
                <div className="one-choose-setting">
                  <Link to="/engagement-rings/start-with-a-setting">1. Choose Rings</Link>
                </div>
                <div className="svg-icn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_492_13575)">
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        fill="#310F4C"
                        stroke="#734E90"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.25 12H15.75"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.75 9L15.75 12L12.75 15"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_492_13575">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="one-choose-setting">
                  <Link to="/engagement-rings/start-with-a-diamond">2. Choose Diamonds</Link>
                </div>
                <div className="svg-icn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_492_13580)">
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#E8E8E8"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.25 12H15.75"
                        stroke="#D7D7D7"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.75 9L15.75 12L12.75 15"
                        stroke="#D7D7D7"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_492_13580">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="one-choose-setting">
                  <span>3. Complete Ring </span>
                </div>
              </div>
              </div>
            </>
          )}
          {/* ====================create your ring end */}
          <div className="singleProduct">
            {!shapeData ? (
              <div className="loading-details">
                <LoaderSpinner />
              </div>
            ) : (
              <>
                <div className="singleProduct-img">
                  <div className="details-videos">
                    <LazyLoadImage
                      src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                      alt="Poster Image"
                      className="video-poster"
                      effect="blur" // Add the effect="blur" if needed
                    />
                    <video
                      className={`details-video-common 
                         ${changeClick === white ? "active" : ""}
                        
                     `}
                      src={filterData.product?.videos.white}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                      preload="none"
                      playsInline
                    ></video>

                    <video
                      className={`details-video-common 
                     ${changeClick === yellow ? "active" : ""}
                    
                 `}
                      src={filterData.product?.videos.yellow}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                    ></video>

                    <video
                      className={`details-video-common 
                     ${changeClick === rose ? "active" : ""}
                    
                 `}
                      src={filterData.product?.videos.rose}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                    ></video>

                    <video
                      className={`details-video-common 
                         ${changeClick === platinum ? "active" : ""}
                        
                     `}
                      src={filterData.product?.videos.white}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                    ></video>
                  </div>

                  <div className="all-images">
                    <div className="detail-images">
                      {/* common image white start */}
                      <div
                        className={`detail-images-common detail-images-default ${
                          changeClick === white ? "active" : ""
                        }`}
                      >
                        {/* =========heart yellow start */}
                        <div
                          className={`heart-shape-img default-img white-common ${
                            shapeProduct === "he" ? "active" : ""
                          }`}
                        >
                          <div className={`heart-common he-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========heart white end */}

                        {/* =========radiant white start */}
                        <div
                          className={`radiant-shape-img default-img white-common ${
                            shapeProduct === ".ra" ? "active" : ""
                          }`}
                        >
                          <div className={`radiant-common radiant-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========radiant white end */}

                        {/* =========asscher white start */}
                        <div
                          className={`asscher-shape-img default-img white-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                        >
                          <div className={`asscher-common asscher-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========asscher white end */}

                        {/* =========marquise white start */}
                        <div
                          className={`marquise-shape-img default-img white-common ${
                            shapeProduct === "mq" ? "active" : ""
                          }`}
                        >
                          <div className={`marquise-common marquise-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========marquise white end */}

                        {/* =========emerald white start */}
                        <div
                          className={`emerald-shape-img default-img white-common ${
                            shapeProduct === "em" ? "active" : ""
                          }`}
                        >
                          <div className={`emerald-common emerald-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========emerald white end */}
                        {/* =========Oval white start */}
                        <div
                          className={`Oval-shape-img default-img white-common ${
                            shapeProduct === "ov" ? "active" : ""
                          }`}
                        >
                          <div className={`Oval-common Oval-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Oval white end */}
                        {/* =========Round white start */}
                        <div
                          className={`Round-shape-img default-img white-common ${
                            shapeProduct === "rd" ? "active" : ""
                          }`}
                        >
                          <div className={`Round-common Round-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Round white end */}

                        {/* =========Cushion white start */}
                        <div
                          className={`Cushion-shape-img default-img white-common ${
                            shapeProduct === "cu" ? "active" : ""
                          }`}
                        >
                          <div className={`Cushion-common Cushion-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Cushion white end */}

                        {/* =========Pear white start */}
                        <div
                          className={`Pear-shape-img default-img white-common ${
                            shapeProduct === "pe" ? "active" : ""
                          }`}
                        >
                          <div className={`Pear-common Pear-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Pear white end */}
                        {/* default img start */}
                        <div className="white default-img">
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* default white img end */}
                      </div>
                      {/* common image white end */}

                      {/* common image yellow start */}
                      <div
                        className={`detail-images-common  detail-images-alt ${
                          changeClick === yellow ? "active" : ""
                        }`}
                      >
                        {/* =========heart yellow start */}
                        <div
                          className={`heart-shape-img default-img yellow-common ${
                            shapeProduct === "he" ? "active" : ""
                          }`}
                        >
                          <div className={`heart-common he-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========heart yellow end */}

                        {/* =========radiant yellow start */}
                        <div
                          className={`radiant-shape-img default-img yellow-common ${
                            shapeProduct === ".ra" ? "active" : ""
                          }`}
                        >
                          <div className={`radiant-common radiant-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========radiant yellow end */}

                        {/* =========asscher yellow start */}
                        <div
                          className={`asscher-shape-img default-img yellow-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                        >
                          <div className={`asscher-common asscher-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========asscher yellow end */}

                        {/* =========marquise yellow start */}
                        <div
                          className={`marquise-shape-img default-img yellow-common ${
                            shapeProduct === "mq" ? "active" : ""
                          }`}
                        >
                          <div className={`marquise-common marquise-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========marquise yellow end */}

                        {/* =========emerald yellow start */}
                        <div
                          className={`emerald-shape-img default-img yellow-common ${
                            shapeProduct === "em" ? "active" : ""
                          }`}
                        >
                          <div className={`emerald-common emerald-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========emerald yellow end */}
                        {/* =========Oval yellow start */}
                        <div
                          className={`Oval-shape-img default-img yellow-common ${
                            shapeProduct === "ov" ? "active" : ""
                          }`}
                        >
                          <div className={`Oval-common Oval-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Oval yellow end */}
                        {/* =========Round yellow start */}
                        <div
                          className={`Round-shape-img default-img yellow-common ${
                            shapeProduct === "rd" ? "active" : ""
                          }`}
                        >
                          <div className={`Round-common Round-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Round yellow end */}

                        {/* =========Cushion yellow start */}
                        <div
                          className={`Cushion-shape-img default-img yellow-common ${
                            shapeProduct === "cu" ? "active" : ""
                          }`}
                        >
                          <div className={`Cushion-common Cushion-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Cushion yellow end */}

                        {/* =========Pear yellow start */}
                        <div
                          className={`Pear-shape-img default-img yellow-common ${
                            shapeProduct === "pe" ? "active" : ""
                          }`}
                        >
                          <div className={`Pear-common Pear-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Pear yellow end */}

                        {/* default img start */}
                        <div className="yellow default-img">
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.alt.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.alt.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* default img start */}
                      </div>
                      {/* common image yellow end */}

                      {/* common image rose start */}
                      <div
                        className={`detail-images-common detail-images-alt1 ${
                          changeClick === rose ? "active" : ""
                        }`}
                      >
                        {/* =========heart rose start */}
                        <div
                          className={`heart-shape-img default-img rose-common ${
                            shapeProduct === "he" ? "active" : ""
                          }`}
                        >
                          <div className={`heart-common he-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========heart rose end */}

                        {/* =========radiant rose start */}
                        <div
                          className={`radiant-shape-img default-img rose-common ${
                            shapeProduct === ".ra" ? "active" : ""
                          }`}
                        >
                          <div className={`radiant-common radiant-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========radiant rose end */}

                        {/* =========asscher rose start */}
                        <div
                          className={`asscher-shape-img default-img rose-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                        >
                          <div className={`asscher-common asscher-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========asscher rose end */}

                        {/* =========marquise rose start */}
                        <div
                          className={`marquise-shape-img default-img rose-common ${
                            shapeProduct === "mq" ? "active" : ""
                          }`}
                        >
                          <div className={`marquise-common marquise-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========marquise rose end */}

                        {/* =========emerald rose start */}
                        <div
                          className={`emerald-shape-img default-img rose-common ${
                            shapeProduct === "em" ? "active" : ""
                          }`}
                        >
                          <div className={`emerald-common emerald-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========emerald rose end */}
                        {/* =========Oval rose start */}
                        <div
                          className={`Oval-shape-img default-img rose-common ${
                            shapeProduct === "ov" ? "active" : ""
                          }`}
                        >
                          <div className={`Oval-common Oval-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Oval rose end */}
                        {/* =========Round rose start */}
                        <div
                          className={`Round-shape-img default-img rose-common ${
                            shapeProduct === "rd" ? "active" : ""
                          }`}
                        >
                          <div className={`Round-common Round-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Round rose end */}

                        {/* =========Cushion rose start */}
                        <div
                          className={`Cushion-shape-img default-img rose-common ${
                            shapeProduct === "cu" ? "active" : ""
                          }`}
                        >
                          <div className={`Cushion-common Cushion-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Cushion rose end */}

                        {/* =========Pear rose start */}
                        <div
                          className={`Pear-shape-img default-img rose-common ${
                            shapeProduct === "pe" ? "active" : ""
                          }`}
                        >
                          <div className={`Pear-common Pear-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Pear rose end */}
                        {/* default img start */}
                        <div className="rose default-img">
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.alt1.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.alt1.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* default img start */}
                      </div>
                      {/* common image rose end */}
                      {/* common image platinum start */}
                      <div
                        className={`detail-images-common detail-images-default ${
                          changeClick === platinum ? "active" : ""
                        }`}
                      >
                        {/* =========heart platinum start */}
                        <div
                          className={`heart-shape-img default-img white-common ${
                            shapeProduct === "he" ? "active" : ""
                          }`}
                        >
                          <div className={`heart-common he-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`heart-common he-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========heart platinum end */}

                        {/* =========radiant platinum start */}
                        <div
                          className={`radiant-shape-img default-img white-common ${
                            shapeProduct === ".ra" ? "active" : ""
                          }`}
                        >
                          <div className={`radiant-common radiant-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`radiant-common radiant-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========radiant platinum end */}

                        {/* =========asscher platinum start */}
                        <div
                          className={`asscher-shape-img default-img white-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                        >
                          <div className={`asscher-common asscher-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`asscher-common asscher-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========asscher platinum end */}

                        {/* =========marquise platinum start */}
                        <div
                          className={`marquise-shape-img default-img white-common ${
                            shapeProduct === "mq" ? "active" : ""
                          }`}
                        >
                          <div className={`marquise-common marquise-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`marquise-common marquise-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========marquise platinum end */}

                        {/* =========emerald platinum start */}
                        <div
                          className={`emerald-shape-img default-img white-common ${
                            shapeProduct === "em" ? "active" : ""
                          }`}
                        >
                          <div className={`emerald-common emerald-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`emerald-common emerald-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========emerald platinum end */}
                        {/* =========Oval platinum start */}
                        <div
                          className={`Oval-shape-img default-img white-common ${
                            shapeProduct === "ov" ? "active" : ""
                          }`}
                        >
                          <div className={`Oval-common Oval-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Oval-common Oval-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Oval platinum end */}
                        {/* =========Round platinum start */}
                        <div
                          className={`Round-shape-img default-img white-common ${
                            shapeProduct === "rd" ? "active" : ""
                          }`}
                        >
                          <div className={`Round-common Round-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Round-common Round-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Round platinum end */}

                        {/* =========Cushion platinum start */}
                        <div
                          className={`Cushion-shape-img default-img white-common ${
                            shapeProduct === "cu" ? "active" : ""
                          }`}
                        >
                          <div className={`Cushion-common Cushion-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Cushion-common Cushion-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Cushion white end */}

                        {/* =========Pear white start */}
                        <div
                          className={`Pear-shape-img default-img white-common ${
                            shapeProduct === "pe" ? "active" : ""
                          }`}
                        >
                          <div className={`Pear-common Pear-side `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-set `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                              alt=""
                            />
                          </div>
                          <div className={`Pear-common Pear-angle `}>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* =========Pear platinum end */}

                        {/* default img start */}
                        <div className="platinum default-img">
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.jpg`}
                              alt=""
                            />
                          </div>
                        </div>
                        {/* default platinum img end */}
                      </div>
                      {/* common image platinum end */}
                    </div>
                  </div>
                </div>

                <div className="singleProduct-text">
                  <h4>{filterData.product?.name}</h4>
                  {/* <div className="star-rating">
                    <span>
                      <IoIosStar />
                    </span>
                    <span>
                      <IoIosStar />
                    </span>
                    <span>
                      <IoIosStar />
                    </span>
                    <span>
                      <IoIosStar />
                    </span>
                  </div> */}
                  <span>
                    <p>{filterData.product?.description}</p>
                  </span>
                  {filterData.product?.variants.length > 0 ? (
                    <div className="Diamond-Original-main  Setting-Carat Variation">
                      {filterData.product?.variants.map(
                        (variantItem, index) => {
                          const inputString = variantItem.sku;
                          const regex = /(\d+\/\d+)/;
                          const match = inputString.match(regex);
                          if (match && match.length > 0) {
                            const fraction = match[0];

                            return (
                              <>
                                {index === 0 && (
                                  <span className="bold full-width">
                                    Variation :
                                  </span>
                                )}
                                <div
                                  className={
                                    variantSlug === variantItem.slug
                                      ? "active-variant variant-outer"
                                      : "variant-outer"
                                  }
                                  key={index}
                                >
                                  <span
                                    onClick={() =>
                                      handleVariation(variantItem.slug)
                                    }
                                  >
                                    {fraction}
                                  </span>
                                </div>
                              </>
                            );
                          }
                          return null; // Make sure to return null if the condition is not met
                        }
                      )}
                    </div>
                  ) : null}

<div className="shape-diamond">
                    {filterData.product?.images.map((allProductImg, index) => {
                      const productImages = allProductImg
                        .split(".")
                        .slice(-4, -3)
                        .join()
                        .split(".")
                        .shift();
                      globalProductImages.push(productImages);
                    })}
                    {shapeData.map((ShapeItemSlug) => {
                      const matchingImages = globalProductImages.filter(
                        (element) => element === ShapeItemSlug.slug
                      );

                      const capt2 =
                        filterData.product?.center_stone_options?.toUpperCase();
                      const capt = ShapeItemSlug.shape?.toUpperCase();
                      let result;
                      if (capt2 && capt) {
                        const newStone = capt2.split("/");
                        result = newStone.includes(capt);
                        console.log(newStone);

                        return (
                          newStone.length > 1 && (
                            <div className="shape-main" key={ShapeItemSlug.id}>
                              <span class="bold">
                                View with diamond Shape:
                                <span class="unbold">oval</span>
                              </span>

                              <Slider {...settings}>
                                {shapeData.map((ShapeItem) => {
                                  const capt2 =
                                    filterData.product?.center_stone_options?.toUpperCase();
                                  const capt = ShapeItem.shape?.toUpperCase();
                                  let result;
                                  if (capt2 && capt) {
                                    const a = capt2.split("/");
                                    result = a.includes(capt);
                                    console.log(result);
                                    return (
                                      <div
                                        className="shape"
                                        key={ShapeItem.id}
                                        onClick={() =>
                                          shapeOnclick(ShapeItem.slug)
                                        }
                                      >
                                        {console.log(ShapeItem.name)}
                                        {result == true && (
                                          <img
                                            src={ShapeItem.icon}
                                            alt={ShapeItem.name}
                                          />
                                        )}
                                      </div>
                                    );
                                  }
                                })}
                              </Slider>
                            </div>
                          )
                        );
                      }
                    })}
                  </div>

                  <div className="detail-metal-main">
                    <div
                      className={`detail-metal ${changeOver ? "active" : ""} `}
                    >
                      <div class="bold"> Metal : </div>
                      <div class="unbold-content">
                        <div
                          className={`metal-common metal-1  ${
                            changeClick === white ? "active" : ""
                          } 
                           `}
                        >
                          <span className="span-click">{changeClick}</span>
                          <span className="span-over">{changeOver}</span>
                        </div>
                        <div
                          className={`metal-common metal-2  ${
                            changeClick === yellow ? "active" : ""
                          } `}
                        >
                          <span className="span-click">{changeClick}</span>
                          <span className="span-over">{changeOver}</span>
                        </div>
                        <div
                          className={`metal-common metal-3  ${
                            changeClick === rose ? "active" : ""
                          } `}
                        >
                          <span className="span-click">{changeClick}</span>
                          <span className="span-over">{changeOver}</span>
                        </div>
                        <div
                          className={`metal-common metal-4  ${
                            changeClick === platinum ? "active" : ""
                          } `}
                        >
                          <span className="span-click">{changeClick}</span>
                          <span className="span-over">{changeOver}</span>
                        </div>
                      </div>
                    </div>
                    <div className="metal-type-color detail-page">
                      <Link
                        to="#"
                        className={`${changeClick === white ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClick(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "18kt",
                            "natural",

                            white,
                            filterData.product?.white_gold_price,
                            "white"
                          );
                        }}
                        onMouseEnter={() => onChangeOver(white)}
                        onMouseOut={() => onChangeOver()}
                      />
                      <Link
                        to="#"
                        className={`${changeClick === yellow ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClick(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "18kt",
                            "natural",
                            yellow,
                            filterData.product?.yellow_gold_price,
                            "yellow"
                          );
                        }}
                        onMouseEnter={() => onChangeOver(yellow)}
                        onMouseOut={() => onChangeOver()}
                      />
                      <Link
                        to="#"
                        className={`${changeClick === rose ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClick(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "18kt",
                            "natural",

                            rose,
                            filterData.product?.rose_gold_price,
                            "rose"
                          );
                        }}
                        onMouseEnter={() => onChangeOver(rose)}
                        onMouseOut={() => onChangeOver()}
                      />
                      <Link
                        to="#"
                        className={`${
                          changeClick === platinum ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClick(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "Platinum",
                            "natural",

                            platinum,
                            filterData.product?.platinum_price,
                            "white"
                          );
                        }}
                        onMouseEnter={() => onChangeOver(platinum)}
                        onMouseOut={() => onChangeOver()}
                      />
                    </div>
                  </div>
                  {/* <div className="prong-type">
               <span>Prong Type: Four Prong</span>
               <div className="prong-type-img">
                 <Link to="#" className="img">
                   <img
                     src="https://image.brilliantearth.com/media/cache/07/3c/073cb20c313b8b4f654d1461a7eee080.jpg"
                     alt="#"
                   />
                 </Link>
                 <Link to="" className="img">
                   <img
                     src="https://image.brilliantearth.com/media/cache/07/3c/073cb20c313b8b4f654d1461a7eee080.jpg"
                     alt=""
                   />
                 </Link>
               </div>
             </div> */}

                  {/* <div className="Setting-Carat-main">
               <span>Setting Carat Weight: 1/3 ct. tw.</span>
               <div className="Setting-Carat">
                 <Link to="#">1/2</Link>
                 <Link to="#">1/3</Link>
                 <Link to="#">1/4</Link>
               </div>
             </div> */}

                  <div className="Diamond-Original-main">
                    <span class="bold">
                      Diamond Original:
                      <span
                        className={
                          diamondTypeClick === "natural"
                            ? "unbold  active"
                            : "unbold"
                        }
                      >
                        Nature
                      </span>
                      <span
                        className={
                          diamondTypeClick === "lab_grown"
                            ? "unbold  active"
                            : "unbold "
                        }
                      >
                        Lab Grown
                      </span>
                    </span>
                    <div className="Diamond-Original">
                      <Link
                        to="javascript:void(0)"
                        className={
                          diamondTypeClick === "natural" ? "active" : ""
                        }
                        // onMouseEnter={() => onChangeNature("natural")}
                        // onMouseOut={() => onChangeNature()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClickNature(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "18kt",
                            "natural"
                          );
                        }}
                      >
                        Natural
                      </Link>
                      <Link
                        to="javascript:void(0)"
                        className={
                          diamondTypeClick === "lab_grown" ? "active" : ""
                        }
                        // onMouseEnter={() => onChangeNature("lab_grown")}
                        // onMouseOut={() => onChangeNature()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChangeClickNature(
                            filterData.product?.sku,
                            filterData.product?.metalColor,
                            "18kt",
                            "lab_grown"
                          );
                        }}
                      >
                        Lab Grown
                      </Link>
                    </div>
                  </div>

                  {/* <div className="detail-price">
                      <div class="bold"> Price $ </div>
                      <div class="unbold">{diamondType?.price}</div>
                    </div> */}
                  {diamondType?.diamond_type === "lab_grown" ? (
                    <div className="detail-price">
                      <div class="bold"> Price $ </div>
                      <div class="unbold">{diamondType?.price}</div>
                    </div>
                  ) : (
                    <div className="detail-price">
                      <div class="bold"> Price $ </div>
                      <div class="unbold">
                        <div
                          className={`price-common ${
                            changeClick === white ? "active" : ""
                          }`}
                        >
                          <span> {filterData.product?.white_gold_price} </span>
                        </div>
                        <div
                          className={`price-common ${
                            changeClick === yellow ? "active" : ""
                          }`}
                        >
                          <span> {filterData.product?.yellow_gold_price} </span>
                        </div>
                        <div
                          className={`price-common ${
                            changeClick === rose ? "active" : ""
                          }`}
                        >
                          <span> {filterData.product?.rose_gold_price} </span>
                        </div>

                        <div
                          className={`price-common ${
                            changeClick === platinum ? "active" : ""
                          }`}
                        >
                          <span> {filterData.product?.platinum_price} </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="choose-btnn">
                    {stock_num !== null ? (
                      <Link
                        to={`/final_ring/?slug=${
                          filterData.product?.slug
                        }&color=${changeClick}&stock_num=${
                          stock_num ? stock_num : ""
                        }&diamond_original=${diamondTypeClick}`}
                        className="ChooseSetting btn-custom"
                      >
                        Choose a settings
                      </Link>
                    ) : (
                      <Link
                        to={`/engagement-rings/start-with-a-diamond/?slug=${filterData.product?.slug}&color=${changeClick}&diamond_original=${diamondTypeClick}`}
                        className="ChooseSetting btn-custom"
                      >
                        Choose a settings
                      </Link>
                    )}

                    <Link to="javascript:void(0);" className="wish-list">
                      <span>
                        {toggledProducts[filterData.product?.id] ? (
                          <IoMdHeart
                            onClick={() =>
                              handleWishlistRemove(filterData.product)
                            }
                          />
                        ) : (
                          <CiHeart
                            onClick={() =>
                              handleWishlist(
                                filterData.product,
                                "ring",
                                user_id,
                                filterData.product?.id,
                                white,
                                filterData.imgUrl,
                                filterData.product?.white_gold_price
                              )
                            }
                          />
                        )}
                      </span>
                    </Link>
                  </div>
                  <div className="user-detail">
                    <Link to="/help">
                      <span>
                        <MdEmail />
                      </span>
                      Email
                    </Link>
                    <div>
                      <Link to="/contact">
                        <span>
                          <BiSolidPhoneCall />
                        </span>
                        +917 576 6151
                      </Link>
                    </div>
                  </div>

                  <div className="shipping-add">
                    <ul>
                      <li>
                        <RiTruckLine />
                      </li>
                      <li>
                        <Link to="#">Free Shipping , </Link>
                      </li>
                      <li>
                        <Link to="#">Free 30 Day Returns</Link>
                      </li>
                    </ul>

                    <div className="order-data">
                      <span>
                        <FaRegCalendarAlt />
                      </span>
                      <p>
                        {" "}
                        Order now and your order ships by {currentDay}
                        {currentMonth} {currentYear}, {formattedDate} depending
                        on center diamond.
                      </p>
                    </div>
                  </div>

                  <div className="detail-accordian">
                    <div className="item" key={index}>
                      <div className="title" onClick={() => toggle(index)}>
                        <div>
                          <span>Ring Details</span>
                        </div>
                        <span>
                          {selected === index ? <BiUpArrow /> : <BiDownArrow />}
                        </span>
                      </div>

                      <div
                        className={
                          selected === index ? "content-show" : "content"
                        }
                      >
                        <div className="ring-info">
                          <span>RING INFORMATION</span>
                          <div>
                            <span>Style: {filterData.product?.sku}</span>
                          </div>
                          <div>
                            <span>
                              Metal:{" "}
                              {diamondTypeColr?.metalType == undefined
                                ? diamondTypeByDefault?.metalType
                                : diamondTypeColr?.metalType}
                            </span>
                          </div>
                          <div>
                            <span>
                              Avg. width: {filterData.product?.metalWeight}
                            </span>
                          </div>
                          <div>
                            <span>
                              Centre diamond: {filterData.product?.CenterShape}
                            </span>
                          </div>
                        </div>
                        <div className="ring-info">
                          <span>DIAMOND INFORMATION</span>
                          <div>
                            {diamondTypeClick === "natural" && (
                              <span>
                                <Link
                                  to="javascript:void(0);"
                                  onClick={() => setShapeOpen(!shapeOpen)}
                                >
                                  <IoInformationCircleOutline />
                                  {shapeOpen && (
                                    <div className="new-popups">
                                      <ShapePopup setShapeOpen={setShapeOpen} />
                                    </div>
                                  )}
                                </Link>
                                Diamond Quality:{" "}
                                {diamondType?.diamondQuality == undefined
                                  ? diamondTypeByDefault?.diamondQuality
                                  : diamondType?.diamondQuality}
                              </span>
                            )}
                            {diamondTypeClick === "lab_grown" && (
                              <span>
                                <Link
                                  to="javascript:void(0);"
                                  onClick={() => setShapeOpen(!shapeOpen)}
                                >
                                  <IoInformationCircleOutline />
                                  {shapeOpen && (
                                    <div className="new-popups">
                                      <ShapePopup setShapeOpen={setShapeOpen} />
                                    </div>
                                  )}
                                </Link>
                                Diamond Quality: {diamondType?.diamondQuality}
                              </span>
                            )}
                          </div>

                          <div>
                            <span>Style: {filterData.product?.sku}</span>
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => setShapeOpen(!shapeOpen)}
                            >
                              <IoInformationCircleOutline />
                              {shapeOpen && (
                                <div className="new-popups">
                                  <ShapePopup setShapeOpen={setShapeOpen} />
                                </div>
                              )}
                            </Link>
                            <span>
                              Shape: {filterData.product?.GemstoneShape1}
                            </span>
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => setShapeOpen(!shapeOpen)}
                            >
                              <IoInformationCircleOutline />
                              {shapeOpen && (
                                <div className="new-popups">
                                  <ShapePopup setShapeOpen={setShapeOpen} />
                                </div>
                              )}
                            </Link>
                            <span>
                              Avg. width: {filterData.product?.metalWeight}
                            </span>
                          </div>
                          <div>
                            <span>
                              Number: {filterData.product?.NoOfGemstones1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {similarProducts?.slice(0, 1).map((item) => {
                    return (
                      <>
                        <div className="detail-accordian detail-accordian_2">
                          <div className="item">
                            <div
                              className="title"
                              onClick={() => toggle_2(index_2)}
                            >
                              <div>
                                <span>Recommended bridal sets</span>
                              </div>
                              <span>
                                {selected_2 === index_2 ? (
                                  <BiUpArrow />
                                ) : (
                                  <BiDownArrow />
                                )}
                              </span>
                            </div>

                            <div
                              className={
                                selected_2 === index_2
                                  ? "content-show"
                                  : "content"
                              }
                            >
                              <div className="">
                                <div className="">
                                  <Slider {...DetailsRecommended}>
                                    <div>
                                      <img
                                        src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                        alt=""
                                      />
                                      <p>
                                        ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                      </p>
                                      <p>Price $ 3271.41</p>
                                    </div>
                                    <div>
                                      <img
                                        src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                        alt=""
                                      />
                                      <p>
                                        ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                      </p>
                                      <p>Price $ 3271.41</p>
                                    </div>
                                    <div>
                                      <img
                                        src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                        alt=""
                                      />
                                      <p>
                                        ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                      </p>
                                      <p>Price $ 3271.41</p>
                                    </div>
                                    <div>
                                      <img
                                        src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                        alt=""
                                      />
                                      <p>
                                        ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                      </p>
                                      <p>Price $ 3271.41</p>
                                    </div>
                                    {/* Add more slides as needed */}
                                  </Slider>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};
