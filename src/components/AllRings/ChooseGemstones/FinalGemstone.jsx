import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { GiRingBox } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import { IoCallOutline, IoChatbubbleOutline, IoStar } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import {
  addToCart,
  addToWishList,
  removeToWishlist,
  setWishlistDetails,
} from "../../../redux/action";
import { DropHint } from "../../forntFiles/DropHint";
import { CiHeart } from "react-icons/ci";
import { UserContext } from "../../../App";
import debounce from "lodash.debounce";
import { productList, productListCart } from "../../../redux/productAction";

export const FinalGemstone = () => {
  const productType = "ring_gemstone";
  const {
    diamondRingToggle,
    setDiamondRingToggle,
    diamondRingLocal,
    setDiamondRingLocal,
    baseUrl,
  } = useContext(UserContext);

  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productSlug = queryParams.get("slug");
  const productColor = queryParams.get("color");
  const diamond_origin = queryParams.get("diamond_origin");
  const stock_num = queryParams.get("stock_num");
  const listColor = queryParams.get("color");
  const diamond_original = queryParams.get("diamond_original");
  const [labGrownDetails, setLabGrownDetails] = useState();

  const [orderShow, setOrderShow] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggle, setToggle] = useState({});
  const [sortedOption, setSortedOption] = useState("Highest Rating");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [shapeData, setShapeData] = useState([]);
  const [removeWishList, setRemoveWishList] = useState();

  const diamondData = Object.assign({}, ...data);
  console.log(diamondData);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://apiservices.vdbapp.com//v2/gemstones?markup_mode=true&stock_num=${stock_num}`;
      const params = {
        stock_item_type: "gemstones",
        status: "pending",
        page_number: 1,
        page_size: 30,
      };

      const headers = {
        Authorization:
          "Token token=iltz_Ie1tN0qm-ANqF7X6SRjwyhmMtzZsmqvyWOZ83I, api_key=_eTAh9su9_0cnehpDpqM9xA",
      };

      try {
        const response = await axios.get(url, { params, headers });
        setData(response.data.response.body.gemstones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleOrderShow = (index) => {
    setToggle((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const orderShowToggle = (index) => {
    setOrderShow((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const options = [
    { value: "Less than 3", label: "Less than 3" },
    { value: "3", label: "3" },
    { value: "3 1/2", label: "3 1/2" },
    { value: "4", label: "4" },
    { value: "4 1/2", label: "4 1/2" },
    { value: "5", label: "5" },
    { value: "5 1/2", label: "5 1/2" },
    { value: "6", label: "6" },
    { value: "6 1/2", label: "6 1/2" },
    { value: "7", label: "7" },
    { value: "7 1/2", label: "7 1/2" },
    { value: "8", label: "8" },
    { value: "8 1/2", label: "8 1/2" },
    { value: "9", label: "9" },
    { value: "9 1/2", label: "9 1/2" },
    { value: "10", label: "10" },
    { value: "10 1/2", label: "10 1/2" },
    { value: "11", label: "11" },
    { value: "11 1/2", label: "11 /12" },
    { value: "12", label: "12" },
    { value: "Greater than 12", label: "Greater than 12" },
  ];

  const sortOptions = [
    { value: "Highest Rating", label: "Highest Rating" },
    { value: "Lowest Rating", label: "Lowest Rating" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Most Helpful", label: "Least Helpful" },
    { value: "Least Helpful", label: "Least Helpful" },
  ];

  // ===============ring details Api==============

  const [filterData, setFilterData] = useState([]);
  console.log(filterData);
  const [similarProducts, setSimilarProducts] = useState([]);

  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/${productSlug}`);

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
  // ring api details Api end

  // =======================
  const userId = localStorage.getItem("formData");
  console.log(userId);
  // const [userIds, setUserIds] = useState();
  // const userId = localStorage.getItem("formData");
  // useEffect(() => {
  //   if (userId) {
  //     const formDataArray = JSON.parse(userId);
  //     const ids = formDataArray.map((item) => item.user_id);
  //     setUserIds(ids);
  //   } else {
  //     console.log(null);
  //   }
  // }, []);
  // console.log(userIds);
  // const userIdsString = userIds?.map(String)?.slice(0, 1)?.join("") || "";
  // console.log(userIdsString);

  // ================cart post method
  // ================cart post method
  const [formData, setFormData] = useState();
  console.log(formData);
  const handleCreateAccount = async (
    product_type,
    ring_price,
    ring_id,
    ring_data,
    ring_img,
    ring_color,
    diamond_id,
    gemstone,
    diamond_price,
    userId,
    ring_gemstone,
    ring_size,
    event
  ) => {
    if (!ring_size) {
      document.getElementById("error-message").innerText =
        "Please select the ring size.";
      event.preventDefault(); // Prevent the default action (navigation)
      return; // Exit the function
    }
    const newItem = {
      product_type: product_type,
      ring_data,
      ring_img,
      ring_color,
      ring_price,
      gemstone,
      ring_size,
      qty: 1,
      uniqueId: uuidv4(),
    };

    dispatch(addToCart(newItem));

    const formData = {
      user_id: userId,
      ring_price: ring_price,
      ring_id: ring_id,
      ring_color: ring_color,
      img_sku: ring_img,
      gemstone_id: gemstone.stock_num,
      gemstone_price: gemstone.total_sales_price,
      product_type: ring_gemstone,
      ring_size: ring_size,
    };

    localStorage.setItem("cart_data", JSON.stringify(formData) || []);
    const a = localStorage.getItem("cart_data");

    console.log("============================", a.ring_price);
    setFormData(a);
    var newAPI = `${baseUrl}/cart?user_id=${formData.user_id}&ring_price=${formData.ring_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&img_sku=${formData.img_sku}&product_type=${formData.product_type}&ring_size=${formData.ring_size}`;
    console.log(newAPI);
    console.log(newAPI);

    axios
      .get(
        newAPI,

        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": shapeData,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "=================cart data user id",
            response.data.data.user_id
          );
          dispatch(productListCart());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setShapeData(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);

  // ===========
  const [ringPrice, setRingPrice] = useState({});

  useEffect(() => {
    // Update active price when productColor changes
    switch (productColor) {
      case "18K WHITE GOLD":
        setRingPrice(filterData.product?.white_gold_price);
        break;
      case "18K YELLOW GOLD":
        setRingPrice(filterData.product?.yellow_gold_price);
        break;
      case "18K ROSE GOLD":
        setRingPrice(filterData.product?.rose_gold_price);
        break;
      case "Platinum":
        setRingPrice(filterData.product?.platinum_price);
        break;
      default:
        setRingPrice(0);
    }
  });

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("ring-diamond")) || [];
    setDiamondRingLocal(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist.forEach((item) => {
      initialToggledProducts[item.diamond?.id] = true;
    });

    setDiamondRingToggle(initialToggledProducts);
  }, [setDiamondRingToggle]);

  useEffect(() => {
    localStorage.setItem("ring-diamond", JSON.stringify(diamondRingLocal));
  }, [diamondRingLocal]);

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

  console.log(wishListDataBase);
  function handleWishlistRemove(belowItem, diamondItem) {
    wishlist.map((item) => {
      if (diamondItem?.id === item.diamond?.id) {
        dispatch(removeToWishlist(item));
        setDiamondRingToggle((prevState) => ({
          ...prevState,
          [diamondItem?.id]: false,
        }));
        const updatedWishlist = diamondRingLocal.filter(
          (wishlistItem) => wishlistItem.diamond?.id !== diamondItem?.id
        );

        setDiamondRingLocal(updatedWishlist);
      }
    });
    wishListDataBase?.forEach((item) => {
      console.log(belowItem, "===============", item);
      if (belowItem?.id === item?.ring_id) {
        console.log(item?.id);
        setRemoveWishList(item?.id);
      }
    });
  }
  const wishlist = useSelector((state) => state.wishlistData);
  // function handleWishlist(product_type, item, diamond, diamondItem) {
  //   const removingItem = {
  //     ringPrice: ringPrice,
  //     product_id: filterData.product?.id,
  //     ring_data: filterData.product,
  //     ring_img: filterData.imgUrl,
  //     ring_color: productColor,
  //     stock_num: diamondItem.stock_num,
  //     gemstone: diamondItem,
  //     totalSalesPrice: diamondItem.total_sales_price,
  //     uniqueId: uuidv4(),
  //   };

  //   const newItem = {
  //     item,
  //     diamond,
  //     removingItem: removingItem,
  //     product_type: productType,
  //     uniqueId: uuidv4(),
  //   };
  //   dispatch(addToWishList(newItem));
  //   setDiamondRingToggle((prevState) => ({
  //     ...prevState,
  //     [diamond.id]: true,
  //   }));
  //   setDiamondRingLocal([...diamondRingLocal, newItem]);
  // }

  // wish list page
  const handleWishlist = async (
    productType,
    item,
    diamond,
    diamondItem,
    ringPrice,
    ring_id,
    productColor,
    img_sku,
    gemstone_id,
    gemstone_price,
    userId,
    ring_size
  ) => {
    const removingItem = {
      ringPrice: ringPrice,
      product_id: filterData.product?.id,
      ring_data: filterData.product,
      ring_img: filterData.imgUrl,
      ring_color: productColor,
      stock_num: diamondItem.stock_num,
      gemstone: diamondItem,
      totalSalesPrice: diamondItem.total_sales_price,
      uniqueId: uuidv4(),
    };

    const newItem = {
      item,
      diamond,
      removingItem: removingItem,
      product_type: productType,
      ring_size: ring_size,
      uniqueId: uuidv4(),
    };
    dispatch(addToWishList(newItem));
    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [diamondItem?.id]: true,
    }));
    setDiamondRingLocal([...diamondRingLocal, newItem]);

    const formData = {
      user_id: userId,
      product_type: productType,
      ring_id: ring_id,
      ring_color: productColor,
      ring_price: ringPrice,
      img_sku: img_sku,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      ring_size: ring_size,
    };

    // localStorage.setItem("wish-list-data-base", JSON.stringify(formData))
    // const savedWishlist = JSON.parse(localStorage.getItem("wish-list-data-base")) || [];

    // console.log("============================",savedWishlist);
    console.log("data ring ", formData);
    const gem_URL = `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&ring_price=${formData.ring_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&product_type=${formData.product_type}&img_sku=${formData.img_sku}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&ring_type=${diamond_origin}&ring_size=${formData.ring_size}`;

    console.log(gem_URL);
    axios
      .get(
        gem_URL,

        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": shapeData,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("=================cart data user id", response.data.data);
          dispatch(productList());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ===================get wishList all data
  useEffect(() => {
    const fetchData = debounce(async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `${baseUrl}/wishlist-items?user_id=${userId}`,

            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": shapeData,
              },
            }
          );

          if (response.status === 200) {
            console.log("=================get card item details", response);
            dispatch(setWishlistDetails(response.data.data));
            console.log(response);
          } else {
            console.error("Error Status:", response.status);
          }
        } else {
          console.log(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }, 500);

    fetchData();

    return () => {
      // Ensure cleanup by canceling debounce when component unmounts
      fetchData.cancel();
    };
  }, [setWishlistDetails, wishlist]);

  // ============ price  lab_grown =======================//
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${
          filterData.product?.sku
        }&metalType=${
          listColor === "Platinum" ? "Platinum" : "18kt"
        }&metalColor=${
          filterData.product?.metalColor
        }&diamond_type=${diamond_original}`
      )

      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data.price);
          setLabGrownDetails(response.data.data);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, [
    filterData.product?.sku,
    listColor,
    filterData.product?.metalColor,
    diamond_original,
  ]);

  const handleSelectSize = (options) => {
    setSelectedOption(options);
    document.getElementById("error-message").innerText = "";
  };
  return (
    <div className="sticky-right-column final-ring">
      <div className="container">
        {data.map((diamondItem, key) => {
          console.log(diamondItem);
          return (
            <>
              {/* ====================create your ring start */}
              <div className="main-arrow-heading" key={diamondItem.id}>
              <div className="ring-choose-setting flex">
                  <div className="one-choose-setting">
                    <span>1.  Gemstone</span>
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
                    <span>2. Ring</span>
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
              </div>
              {/* ====================create your ring end */}
              <div className="sticky-inner-main">
                <div className="left-product-images">
                  <ul className="product-list">
                    <li
                      className={
                        productColor === white ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === yellow ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={productColor === rose ? "active" : "displayed"}
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === platinum ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li>
                      <img src={diamondItem.image_url} alt="Still" />
                    </li>
                    <li
                      className={
                        productColor === white ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === yellow ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.alt.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={productColor === rose ? "active" : "displayed"}
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.set.alt1.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === platinum ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                        alt="Gold Ring"
                      />
                    </li>

                    <div className="details-videos">
                      <video
                        className={
                          productColor === white ? "active" : "displayed"
                        }
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.video.white.mp4`}
                        loop
                        autoPlay
                        muted
                      ></video>
                      <video
                        className={
                          productColor === yellow ? "active" : "displayed"
                        }
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.video.yellow.mp4`}
                        loop
                        autoPlay
                        muted
                      ></video>
                      <video
                        className={
                          productColor === rose ? "active" : "displayed"
                        }
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.video.rose.mp4`}
                        loop
                        autoPlay
                        muted
                      ></video>
                      <video
                        className={
                          productColor === platinum ? "active" : "displayed"
                        }
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.video.white.mp4`}
                        loop
                        autoPlay
                        muted
                      ></video>
                    </div>

                    <li
                      className={
                        productColor === white ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === yellow ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.alt.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={productColor === rose ? "active" : "displayed"}
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.alt1.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li
                      className={
                        productColor === platinum ? "active" : "displayed"
                      }
                    >
                      <img
                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                        alt="Gold Ring"
                      />
                    </li>
                    <li>
                      <iframe
                        src={diamondItem.video_url}
                        frameBorder={0}
                        allowFullScreen
                      ></iframe>
                    </li>
                  </ul>
                </div>
                <div className="right-product-content">
                  <h4 className="heading-four border-botttom">
                    Your One-of-a-Kind Ring
                  </h4>
                  <div className="seleted-items-purchage">
                    <div className="selected-inner-pair">
                      <div className="left-icon-image">
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png"
                          alt="Ring Icon"
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p>
                          {productColor} {filterData.product?.name}
                        </p>
                        <p>
                          <span className="star-icons">
                            {" "}
                            <span>
                              {" "}
                              <IoStar />
                              <IoStar />
                              <IoStar />
                              <IoStar />
                              <IoStar />
                            </span>{" "}
                            <span>(89)</span>{" "}
                          </span>
                        </p>
                        <div className="name-price">
                          <div>
                            {/* <span>{filterData.product?.name}</span> */}
                          </div>

                          {diamond_original == "lab_grown" ? (
                            <div className={`price-tabbing-common `}>
                              <span> ${labGrownDetails?.price} </span>
                            </div>
                          ) : (
                            <div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === white ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  ${filterData.product?.white_gold_price}{" "}
                                </span>
                              </div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === yellow ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  ${filterData.product?.yellow_gold_price}{" "}
                                </span>
                              </div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === rose ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  ${filterData.product?.rose_gold_price}{" "}
                                </span>
                              </div>

                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === platinum ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  ${filterData.product?.platinum_price}{" "}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="selected-inner-pair caret-rounded">
                      <div className="left-icon-image">
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/spark.png"
                          alt="Diamond Icon"
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p>
                          <span>{diamondItem.short_title}</span>
                        </p>
                        <p>
                          <span>{diamondItem.gem_type}</span>
                        </p>
                        <span> ${diamondItem.total_sales_price} </span>
                      </div>
                    </div>
                    <div className="setting-price-main">
                      {diamond_original == "lab_grown" ? (
                        <div className={`price-tabbing-common `}>
                          $
                          {(
                            parseFloat(labGrownDetails?.price) +
                            parseFloat(diamondItem?.total_sales_price)
                          ).toFixed(2)}
                        </div>
                      ) : (
                        <div className="setting-only-price">
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === white ? "active" : ""
                            }`}
                          >
                            <span>
                              $
                              {(
                                parseFloat(
                                  filterData.product?.white_gold_price
                                ) + parseFloat(diamondItem?.total_sales_price)
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === yellow ? "active" : ""
                            }`}
                          >
                            <span>
                              $
                              {(
                                parseFloat(
                                  filterData.product?.yellow_gold_price
                                ) + parseFloat(diamondItem.total_sales_price)
                              ).toFixed(2)}{" "}
                            </span>
                          </div>
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === rose ? "active" : ""
                            }`}
                          >
                            <span>
                              {" "}
                              $
                              {(
                                parseFloat(
                                  filterData.product?.rose_gold_price
                                ) + parseFloat(diamondItem.total_sales_price)
                              ).toFixed(2)}{" "}
                            </span>
                          </div>

                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === platinum ? "active" : ""
                            }`}
                          >
                            <span>
                              {" "}
                              $
                              {(
                                parseFloat(filterData.product?.platinum_price) +
                                parseFloat(diamondItem.total_sales_price)
                              ).toFixed(2)}{" "}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="selected-inner-pair caret-rounded">
                      <div className="left-icon-image">
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png"
                          alt="Ring Icon"
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <h4 className="media-heading">ENDS SOON!</h4>
                        <p className="media-text">
                          Lab Diamond Studs With Purchase Over $1,000. Surprise
                          Earrings With All Other Purchases.
                        </p>
                      </div>
                    </div>
                    <div className="purchage-select-box">
                      <div className="select-custom-size-side">
                        <Select
                          defaultValue={selectedOption}
                          onChange={handleSelectSize}
                          options={options}
                          placeholder="Select Size"
                        />
                        <p
                          id="error-message"
                          className="error"
                          style={{ color: "red" }}
                        ></p>
                      </div>
                      <div className="add-to-cart">
                        <Link
                          // to="/cart-page"
                          to={"/cart"}
                          onClick={(e) => {
                            if (!selectedOption) {
                              document.getElementById(
                                "error-message"
                              ).innerText = "Please select the ring size.";
                              e.preventDefault(); // Prevent the default action (navigation)
                              return;
                            }
                            handleCreateAccount(
                              productType,
                              diamond_original === "lab_grown"
                                ? labGrownDetails?.price
                                : ringPrice,
                              filterData.product?.id,
                              filterData.product,
                              filterData.imgUrl,
                              productColor,
                              diamondItem.stock_num,
                              diamondItem,
                              diamondItem.total_sales_price,
                              userId ? userId : null,
                              "ring_gemstone",
                              selectedOption?.value,
                              labGrownDetails?.diamond_type
                            );
                          }}
                        >
                          Add to bag
                        </Link>
                        <span className="heart-toggle-class">
                          <Link to="javascript:void(0);">
                            {" "}
                            {diamondRingToggle[diamondData?.id] ? (
                              <IoMdHeart
                                onClick={() =>
                                  handleWishlistRemove(
                                    filterData.product,
                                    diamondData
                                  )
                                }
                              />
                            ) : (
                              <CiHeart
                                onClick={() => {
                                  if (!selectedOption) {
                                    document.getElementById(
                                      "error-message"
                                    ).innerText =
                                      "Please select the ring size.";
                                    return;
                                  } else {
                                    handleWishlist(
                                      productType,
                                      filterData.product,
                                      diamondData,
                                      diamondItem,
                                      ringPrice,
                                      filterData.product?.id,
                                      productColor,
                                      filterData.imgUrl,
                                      diamondItem.stock_num,
                                      diamondItem.total_sales_price,
                                      userId,
                                      selectedOption?.value
                                    );
                                  }
                                }}
                              />
                            )}
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="selected-inner-pair caret-rounded">
                      <div className="left-icon-image">
                        <FaTruckFast />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p className="media-text">
                          Free Shipping, Free 30 Day Returns
                        </p>
                      </div>
                    </div>
                    <div className="selected-inner-pair caret-rounded border-botttom">
                      <div className="left-icon-image">
                        <img
                          src="https://css.brilliantearth.com/static/img/icon/svg/calendar-icon-y23.svg?v"
                          alt="Ring Icon"
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p className="media-text">
                          Order now and your order ships by Tue, Feb 27
                        </p>
                      </div>
                    </div>
                    <div className="social-icons">
                      <ul>
                        <li>
                          <Link to="javascript:void(0);">
                            <Popup
                              trigger={
                                <Link to="javascript:void(0);">
                                  <MdMarkEmailRead /> Drop Hint
                                </Link>
                              }
                              open={open}
                              closeOnDocumentClick
                              onOpen={() => setOpen(true)}
                              onClose={() => setOpen(false)}
                              position="center"
                            >
                              <DropHint setOpen={setOpen} />
                            </Popup>
                          </Link>
                        </li>
                        <li>
                          <Link to="/help">
                            <span>
                              <TfiEmail />
                            </span>{" "}
                            Email Us
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0);">
                            <span>
                              <IoCallOutline />
                            </span>
                            800.691.0952
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0);">
                            <span>
                              <IoChatbubbleOutline />
                            </span>{" "}
                            chat
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="below-sticky-section">
                {/* luxury Conscience */}
                <div className="luxury-conscience-wrapper">
                  <div className="inner-wrapper">
                    <div className="luxury-content">
                      <h4 className="heading-luxy">
                        Luxury with a Conscience®
                      </h4>
                      <p>
                        A ring that evokes the happiness of love and partnership
                        is even more joyful when you know that it was
                        sustainably sourced and mindfully produced. From our
                        mission to our unique jewelry designs, everything at
                        Brilliant Earth is held to exceptional standards.
                      </p>
                    </div>

                    <div className="luxury-drop">
                      <div className="order-left-details">
                        <div className="custom-order-faq ">
                          <h4>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => toggleOrderShow(1)}
                            >
                              <span>
                                <ul className="grop-top-data">
                                  <li>
                                    <span className="drop-img-ring">
                                      <img
                                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png"
                                        alt="ring"
                                      />
                                    </span>
                                  </li>
                                  <li className="drop-content-text">
                                    <span>
                                      <h5>Designed for You</h5>
                                    </span>
                                    <span>Your one-of-a-kind ring</span>
                                  </li>
                                </ul>
                              </span>
                              <span>
                                {toggle[1] ? (
                                  <IoIosArrowDown />
                                ) : (
                                  <IoIosArrowUp />
                                )}
                              </span>
                            </Link>
                          </h4>
                          {toggle[1] && (
                            <div className="show-order-content">
                              <p>
                                Our engagement ring settings are made-to-order
                                with each one handcrafted for your selected
                                center gem’s unique characteristics to ensure
                                the high quality of the finished piece.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="custom-order-faq ">
                          <h4>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => toggleOrderShow(2)}
                            >
                              <span>
                                <ul className="grop-top-data">
                                  <li>
                                    <span className="drop-img-ring">
                                      <FaGlobeAmericas />
                                    </span>
                                  </li>
                                  <li className="drop-content-text">
                                    <span>
                                      <h5>Progress to Carbon Neutrality</h5>
                                    </span>
                                    <span>
                                      We are committed to protecting the planet
                                    </span>
                                  </li>
                                </ul>
                              </span>
                              <span>
                                {orderShow[2] ? (
                                  <IoIosArrowDown />
                                ) : (
                                  <IoIosArrowUp />
                                )}
                              </span>
                            </Link>
                          </h4>
                          {toggle[2] && (
                            <div className="show-order-content">
                              <p>
                                We’re leading the jewelry industry towards clean
                                energy. We use clean energy in our showrooms and
                                offices, have displaced all other corporate
                                emissions since 2018, and support wind and solar
                                energy projects through collaborations that help
                                address climate change.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="custom-order-faq ">
                          <h4>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => toggleOrderShow(3)}
                            >
                              <span>
                                <ul className="grop-top-data">
                                  <li>
                                    <span className="drop-img-ring">
                                      <GiRingBox />
                                    </span>
                                  </li>
                                  <li className="drop-content-text">
                                    <span>
                                      <h5>Responsibly Packaged</h5>
                                    </span>
                                    <span>
                                      Made with less energy, less water, and
                                      fewer emissions
                                    </span>
                                  </li>
                                </ul>
                              </span>
                              <span>
                                {toggle[3] ? (
                                  <IoIosArrowDown />
                                ) : (
                                  <IoIosArrowUp />
                                )}
                              </span>
                            </Link>
                          </h4>
                          {toggle[3] && (
                            <div className="show-order-content">
                              <p>
                                Our packaging uses recycled materials made with
                                less energy, less water, and fewer emissions. We
                                make our iconic ring boxes with wood certified
                                by the Forest Stewardship Council and design
                                them to last lifetimes. Since 2021, we’ve used
                                100% recycled paper, saving hundreds of tons of
                                CO2, and we’re shrinking our packaging even more
                                to further reduce waste.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end luxury Conscience */}

                <div className="review-section-main">
                  <div className="top-review-sec">
                    <h3>Reviews</h3>
                    <ul className="review-list-top">
                      <li>
                        <p>
                          <span className="review-rating">5.0</span>
                        </p>
                        <p>
                          <span className="star-review-rating">Star</span>
                        </p>
                        <p>
                          <span className="total-review-rating">
                            89 Reviews
                          </span>
                        </p>
                        <p>
                          <Link
                            to="javascript:void(0);"
                            className="total-review-rating"
                          >
                            Leave a Review
                          </Link>
                        </p>
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                      <li>
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                          alt="Hand"
                        />
                      </li>
                    </ul>
                    <div className="sort-start-heighest">
                      <Select
                        defaultValue={sortedOption}
                        onChange={setSortedOption}
                        options={sortOptions}
                        placeholder={sortedOption}
                      />
                    </div>
                  </div>

                  <div className="review-named-person">
                    <div className="review-named-about">
                      <p>
                        <span className="name-about">Nikol</span>
                      </p>
                      <p>
                        <span className="name-about-star">star</span>
                      </p>
                      <p>
                        <span className="name-about-views">
                          Love love love it!
                        </span>
                      </p>
                      <p>
                        <span className="name-about-discription">
                          I love the fact I was able to customize this ring. I
                          love the simplicity but elegance to it. The shine is
                          incredible.
                        </span>
                      </p>
                    </div>
                    <div className="review-named-right-img">
                      <div className="date-view">
                        <span>September 28, 2023</span>
                      </div>
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                        alt="Hand"
                      />
                    </div>
                  </div>
                  <div className="review-named-person">
                    <div className="review-named-about">
                      <p>
                        <span className="name-about">Frank's Fiancé</span>
                      </p>
                      <p>
                        <span className="name-about-star">star</span>
                      </p>
                      <p>
                        <span className="name-about-views">The Sparkle ✨</span>
                      </p>
                      <p>
                        <span className="name-about-discription">
                          This marquise Nadia gold ring is the ring of my
                          dreams. I am so happy with it. It never stops
                          sparkling and I am constantly getting compliments. My
                          fiancé did a wonderful job picking out the setting.
                        </span>
                      </p>
                    </div>
                    <div className="review-named-right-img">
                      <div className="date-view">
                        <span>July 3, 2023</span>
                      </div>
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand.jpg"
                        alt="Hand"
                      />
                    </div>
                  </div>

                  <div className="load-more">
                    <Link to="javascript:void(0);">Load more</Link>
                  </div>
                </div>
                <div className="purchage-order-details">
                  <div className="order-inner-main">
                    <div className="order-left-details">
                      <h3>
                        <span>
                          <img
                            src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png"
                            alt="Order Logo"
                          />
                        </span>
                        Order Details
                      </h3>
                      <div className="custom-order-faq active">
                        <h4>
                          <Link
                            to="javascript:void(0);"
                            onClick={() => orderShowToggle(1)}
                          >
                            <span>Your Order Includes</span>
                            <span>
                              {orderShow[1] ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowUp />
                              )}
                            </span>
                          </Link>
                        </h4>
                        {orderShow[1] && (
                          <div className="show-order-content">
                            <p>HRD Certificate</p>
                            <p>Professional Appraisal</p>
                            <p>Free Lifetime Warranty</p>
                          </div>
                        )}
                      </div>
                      <div className="custom-order-faq">
                        <h4>
                          <Link
                            to="javascript:void(0);"
                            onClick={() => orderShowToggle(2)}
                          >
                            <span>Your Order Includes</span>
                            <span>
                              {orderShow[2] ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowUp />
                              )}
                            </span>
                          </Link>
                        </h4>
                        {orderShow[2] && (
                          <div className="show-order-content">
                            <p>HRD Certificate</p>
                            <p>Professional Appraisal</p>
                            <p>Free Lifetime Warranty</p>
                          </div>
                        )}
                      </div>
                      <div className="custom-order-faq">
                        <h4>
                          <Link
                            to="javascript:void(0);"
                            onClick={() => orderShowToggle(3)}
                          >
                            <span>Your Order Includes</span>
                            <span>
                              {orderShow[3] ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowUp />
                              )}
                            </span>{" "}
                          </Link>
                        </h4>
                        {orderShow[3] && (
                          <div className="show-order-content">
                            <p>HRD Certificate</p>
                            <p>Professional Appraisal</p>
                            <p>Free Lifetime Warranty</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="order-right-details-img">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/order-details-bg.jpg"
                        alt="Order Details Background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
