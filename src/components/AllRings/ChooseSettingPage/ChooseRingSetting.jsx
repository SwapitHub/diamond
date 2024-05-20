import axios from "axios";
import $ from "jquery";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../App";
import { ProductListFaq } from "../../../pages/home/ProductListFaq";
import { ProductListMoreToExplore } from "../../../pages/home/ProductListMoreToExplore";
import { addToWishList, removeToWishlist } from "../../../redux/action";
import { productList } from "../../../redux/productAction";
import LoaderSpinner from "../../LoaderSpinner";
import { ShopByStyleMobileSlider } from "./ShopByStyleMobileSlider";

const ChooseRingSetting = () => {
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  const [removeWishList, setRemoveWishList] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuShapeName = queryParams.get("shape");
  const menuShopStyle = queryParams.get("style");
  const [wishListId, setWishListId] = useState();
  const user_id = localStorage.getItem("formData");
  const ring = "ring";
  console.log("remove ============wish", removeWishList);
  const [items, setItems] = useState([]);
  const {baseUrl} = useContext(UserContext)
  const options = [
    { value: "best_seller", label: "Best Sellers" },
    { value: "Newest", label: "Newest" },
    { value: "low_to_high", label: "Price (Low to High)" },
    { value: "high_to_low", label: "Price (High to Low)" },
  ];
  const wishlistData = useSelector((state) => state.wishlistData);
  console.log(wishlistData);
  // const menuOldName = queryParams.get("name");
  // const menuNameArray = menuOldName ? menuOldName.split(" ") : [];
  // const menuName = menuNameArray.map((word) => word.replace(/-/g, " "));

  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";

  const [filterRoseData, setFilterRoseData] = useState([]);
  const [newPrevData, setNewPrevData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [metalColor, setMetalColor] = useState([]);
  const [changeName, setChangeName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activePage, setActivePage] = useState([]);
  const [activeColor, setActiveColor] = useState(white);
  const [shapeName, setShapeName] = useState([]);
  const [shapeBreadCamb, setShapeBreadCamb] = useState([]);
  const [selectedShopStyleIds, setSelectedShopStyleIds] = useState([]);
  var a = [];
  a.push(menuShopStyle);
  const mergedArray = [...selectedShopStyleIds, ...a];
  const selectedShopStyleIdsString = mergedArray.join(",");

  const [activeStyleIds, setActiveStyleIds] = useState([]);
  const [shapeData, setShapeData] = useState([]);
  const [metalId, setMetalId] = useState([]);
  const [priceShorting, setPriceShorting] = useState();
  const [wishlistId, setWishlistId] = useState();
  const [breadCrumbColor, setBreadCrumbColor] = useState();

  // bridal set for start
  const checkedBridalSets = queryParams.get("bridal-sets");
  const [bridalSets, setBridalSets] = useState(
    checkedBridalSets ? checkedBridalSets : false
  );
  useEffect(() => {
    const newQueryParams = new URLSearchParams(location.search);
    const newBridalSets = newQueryParams.get("bridal-sets");
    setBridalSets(newBridalSets ? newBridalSets : false);
  }, [location.search]);
  // bridal set for end

  // gemstone
  const [newData, setNewData] = useState([]);
  const [diamondData, setDiamondData] = useState([]);
  const stock_num = queryParams?.get("stock_num");

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
        setNewData(response.data.response.body.gemstones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [stock_num]);

  // Diamond api
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://apiservices.vdbapp.com//v2/diamonds?type=Diamond&stock_num=${stock_num}`;

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
  // cont a = bredCramStyleFilter.
  // ===============  shop by price range==============
  const minRange = 800;
  const maxRange = 15000;
  const [minPrice, setMinPrice] = useState(minRange);
  const [maxPrice, setMaxPrice] = useState(maxRange);
  const [range, setRange] = useState([minRange, maxRange]);

  // =============== shop by price range end==============
  // ``${baseUrl}/products?page=${page}&sortby=${priceShorting}&ring_style=${selectedShopStyleIds}&shape=${shapeName}&metal_color=${metalId}&price_range=${minPrice},${maxPrice}`

  useEffect(() => {
    setLoading(true);

    const URLNEW = `${baseUrl}/products?page=${page}&sortby=${priceShorting}&ring_style=${selectedShopStyleIdsString}&shape=${
      shapeName ? shapeName : ""
    }&metal_color=${metalId}&bridal_sets=${bridalSets}`;
    console.log(URLNEW);
    axios
      .get(URLNEW)

      .then((res) => {
        setNewPrevData(res.data);

        const updatedProducts = res.data.data.map((product) => ({
          id: product.id,
          sku: product.sku,
          name: product.name,
          image: product.default_image_url,
          images: product.default_image_url
            .split("/")
            .slice(-1)
            .join()
            .split(".")
            .shift(),
          slug: product.slug,
          CenterShape: product.CenterShape,
          multiCategory: product.multiCategory,
          imageName: product.default_image_url
            .split("/")
            .slice(-1)
            .join()
            .split(".")
            .shift(),
          white_gold_price: product.white_gold_price,
          yellow_gold_price: product.yellow_gold_price,
          rose_gold_price: product.rose_gold_price,
          platinum_price: product.platinum_price,
        }));

        if (page > 1) {
          setFilterRoseData((prevData) => [...prevData, ...updatedProducts]);
          setLoading(false);
        } else {
          setFilterRoseData(updatedProducts);
        }

        setLoading(false);
      })
      .catch(() => {
        console.log("API error");
        setLoading(false);
      });
  }, [
    page,
    selectedShopStyleIdsString,
    minPrice,
    maxPrice,
    shapeName,
    metalId,
    priceShorting,
    menuShopStyle,
    bridalSets,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    selectedShopStyleIdsString,
    minPrice,
    maxPrice,
    shapeName,
    metalId,
    priceShorting,
    menuShopStyle,
  ]);
  //  scroll pagination start============
  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= 0.7 * scrollHeight && !loading) {
          setLoading(true);
          setPage((prev) => prev + 1);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [page, loading]);

  //  =====================scroll pagination end===================
  // ===========metal three color rose yellow white  =============================
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/metalcolor`
      )
      .then((res) => {
        setMetalColor(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const onChangeName = (value, className, slug) => {
    setChangeName({ value, className });
    setIsActive(!isActive);
    setActivePage(className);

    setActiveColor(value);
    console.log(value);
  };

  // ======================metal three color rose yellow white end =============================

  // filter shape
  const style = "style";
  const shape = "shape";

  const [styleFilter, setStyleFilter] = useState(style);
  const FilterProduct = (styleData) => {
    setStyleFilter(styleData);
  };

  // =============== shop by shape start ==============
  useEffect(() => {
    axios
      .get(
        "`${baseUrl}/diamondshape"
      )
      .then((res) => {
        setShapeData(res.data.data);
        setShapeName(menuShapeName);
      })
      .catch(() => {
        console.log("API error");
      });
  }, [menuShapeName]);

  const shapeOnclick = (shapeNameItem) => {
    setShapeBreadCamb(shapeNameItem);
    setShapeName((prevShapeName) =>
      prevShapeName === shapeNameItem ? "" : shapeNameItem
    );
  };
  // =============== shop by shape end ==============

  // =============== shop by  style ==============
  const [ShopByStyle, setShopStyle] = useState([]);
  console.log(ShopByStyle);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "`${baseUrl}/product-style"
        );
        setShopStyle(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("shop style api error:", error);
      }
    };

    fetchData();
  }, []);

  const ShopStyle = (shopStyleId) => {
    const isActive = activeStyleIds.includes(shopStyleId);
    setActiveStyleIds((prevActiveStyleIds) =>
      isActive
        ? prevActiveStyleIds.filter((id) => id !== shopStyleId)
        : [...prevActiveStyleIds, shopStyleId]
    );

    if (selectedShopStyleIds.includes(shopStyleId)) {
      setSelectedShopStyleIds(
        selectedShopStyleIds.filter((selectedId) => selectedId !== shopStyleId)
      );
    } else {
      setSelectedShopStyleIds([...selectedShopStyleIds, shopStyleId]);
    }
  };

  const resetAllStyles = () => {
    setActiveStyleIds([]);
    setSelectedShopStyleIds([]);
    setShapeBreadCamb([]);
    setShapeName([]);
  };
  const resetAllShape = () => {
    setShapeBreadCamb([]);
    setShapeName([]);
  };

  const resetAllColor = () => {
    setMetalColorValue();
    setMetalId([]);
  };

  const resetOneStyles = (resetOneStylesSlug) => {
    setActiveStyleIds((prevActiveStyleIds) =>
      prevActiveStyleIds.filter((id) => id !== resetOneStylesSlug)
    );

    setSelectedShopStyleIds((prevSelectedShopStyleIds) =>
      prevSelectedShopStyleIds.filter((id) => id !== resetOneStylesSlug)
    );
  };
  // =============== shop by  style end==============

  // =============== shop by metal start ==============
  const [metalColorValue, setMetalColorValue] = useState();
  const metalOnclick = (metaColorId, metalValueColor) => {
    setMetalId((prevMetalID) =>
      prevMetalID === metaColorId ? "" : metaColorId
    );
    setMetalColorValue(metalValueColor);
  };

  // =============== shop by metal end ==============

  // =============== shop by price range==============
  const handleChange = (newRange) => {
    setRange(newRange);
    setMinPrice(newRange[0]);
    setMaxPrice(newRange[1]);
  };
  // ===============shop by price range end==============

  $(document).ready(function () {
    $(".resultdata > div.all-pages-data").each(function (i, odiv) {
      $(odiv)
        .find(".main-common-active > div")
        .click(function () {
          var index = $(this).index();
          $(odiv)
            .find(".outerDiv > a > .main-common-active.product-main-img > div")
            .removeClass("active");
          $(odiv).addClass("active");

          $(odiv)
            .find(".main-common-active > div.defaultImg")
            .removeClass("active")
            .eq(index)
            .addClass("active");

          $(odiv)
            .find(".outerDiv > a > div.main-common-active > div")
            .removeClass("active");

          $(odiv)
            .find(".outerDiv > a > div.main-common-active > div")
            .eq(index)
            .addClass("active");

          $(this).addClass("active");

          // Add 'metal-value-active' class to the corresponding .metal-name-item-name
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .removeClass("metal-value-active");

          var metalNameItem = $(odiv).find(".metal-name-item-name").eq(index);
          metalNameItem.addClass("metal-value-active");

          // 'price-active' class from all price elements
          $(odiv)
            .find(".main-common-active .product-price")
            .removeClass("price-active");

          var priceElement;
          switch (index) {
            case 0:
              priceElement = $(odiv).find(".all-img1.product-price.defaultImg");
              break;
            case 1:
              priceElement = $(odiv).find(".all-img1.product-price.img-1");
              break;
            case 2:
              priceElement = $(odiv).find(".all-img1.product-price.img-2");
              break;
            case 3:
              priceElement = $(odiv).find(".all-img1.product-price.img-3");
              break;
            default:
              break;
          }

          priceElement.addClass("price-active");
        });
    });
  });

  // ================

  // ==================== hover effect
  $(document).ready(function () {
    $(".resultdata > div.all-pages-data").each(function (i, odiv) {
      $(odiv)
        .find(".outerDiv > a .main-common-active > .all-card-four-color")
        .on("mouseenter", function () {
          var index = $(this).index();

          // Add class on hover
          $(odiv).addClass("hover-active");
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .eq(index)
            .addClass("metal-hover-active");
          $(odiv)
            .find(".main-common-active > .product-price")
            .eq(index)
            .addClass("price-hover-active");
          $(odiv)
            .find(".main-common-active > .common-img")
            .eq(index)
            .addClass("common-img-hover-active");
          // $(odiv)
          //   .find(".main-common-active > .common-img.defaultImg")
          //   .eq(index)
          //   .removeClass("active");
        })
        .on("mouseleave", function () {
          var index = $(this).index();

          // Remove class on hover out
          $(odiv).removeClass("hover-active");
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .eq(index)
            .removeClass("metal-hover-active");
          $(odiv)
            .find(".main-common-active > .product-price")
            .eq(index)
            .removeClass("price-hover-active");
          $(odiv)
            .find(".main-common-active > .common-img")
            .eq(index)
            .removeClass("common-img-hover-active");
        });
    });
  });

  // ==================sort by price start

  const handlePriceChange = (selectedOption) => {
    setPriceShorting(selectedOption.value);
  };
  // ========
  const ShopStyleSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const ShopShapeSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const ShopStyleSliderOuter = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const {
    toggledProducts,
    setToggledProducts,
    localWishlist,
    setLocalWishlist,
  } = useContext(UserContext);

  const wishlist = useSelector((state) => state.wishlistData);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
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

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    ring_id,
    ring_color,
    ring_price,
    imgSku,
    tokenData
  ) => {
    try {
      const newItem = {
        item,
        ring_color,
        product_type,
        uniqueId: uuidv4(),
      };

      // Dispatch action to add item to Redux store
      dispatch(addToWishList(newItem));

      // Assuming setToggledProducts and setLocalWishlist are useState hooks
      setToggledProducts((prevState) => ({
        ...prevState,
        [item.id]: true,
      }));
      setLocalWishlist([...localWishlist, newItem]);

      // Construct URL for API call
      const fetchData = async () => {
        try {
          // Construct URL for API call
          setLoading(true);
          const apiUrl = `${baseUrl}/add_to_wishlist?user_id=${user_id}&ring_price=${ring_price}&ring_id=${ring_id}&ring_color=${ring_color}&product_type=${product_type}&img_sku=${imgSku}&ring_type=natural`;
          // Make API call
          const response = await axios.get(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": tokenData,
            },
          });

          if (response.status === 200) {
            console.log(
              "Wishlist item added successfully:",
              response.data.data
            );
            dispatch(productList());
            setLoading(false);
          } else {
            console.error(
              "Error adding item to wishlist. Status:",
              response.status
            );
            setLoading(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };

      // Debounce fetchData function
      const debouncedFetchData = debounce(fetchData, 50); // Adjust delay as needed (in milliseconds)

      debouncedFetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [tokenData, setTokenData] = useState();
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setTokenData(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);
  // =======remove to card
  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;

      axios
        .get(removeWish)
        .then((res) => {
          console.log("=====", res.data);
          setLoading(false);
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
  // ==================
  // ============
  function handleWishlistRemove(belowItem, itemId) {
    console.log(itemId);
    wishlist.forEach((item) => {
      if (belowItem.id === item.item?.id) {
        dispatch(removeToWishlist(item));
        setToggledProducts((prevState) => ({
          ...prevState,
          [belowItem.id]: false,
        }));
        const updatedWishlist = localWishlist.filter(
          (wishlistItem) => wishlistItem.item?.id !== belowItem?.id
        );
        setLocalWishlist(updatedWishlist);
      }
    });
    console.log(wishListDataBase);

    const keys = Object.keys(wishListDataBase);
    keys.forEach((key) => {
      const item = wishListDataBase[key];
      console.log(belowItem?.id, "===============", item);
      if (belowItem?.id === item?.ring_id) {
        console.log(item?.id);
        setRemoveWishList(item?.id);
      }
    });
  }

  // ===================get wishList all data

  // useEffect(() => {
  //   // Compare current length with previous length
  //   const fetchData = async () => {
  //     try {
  //       if (user_id) {
  //         const response = await axios.get(
  //           ``${baseUrl}/wishlist-items?user_id=${user_id}`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": shapeData,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log(
  //             "==================================",
  //             response.data.data
  //           );
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
  //   };

  //   const debouncedFetchData = debounce(fetchData, 1000);

  //   debouncedFetchData();

  //   return () => debouncedFetchData.cancel();
  // }, [setWishlistDetails, wishlist]);

  useEffect(() => {
    const ringIds = wishListDataBase.map((itemss) => {
      return itemss.ring_id;
    });

    setItems(ringIds);
  }, [wishListDataBase]);

  return (
    <>
      {stock_num ? (
        <div className="sticky-gemstone-name">
          {(newData.length > 0 ? newData : diamondData).map((item) => {
            return (
              <React.Fragment key={item.id}>
                <div className="sticky-gemstone-img">
                  <img src={item.image_url} alt="" />
                </div>
                <div className="sticky-gemstone-detail">
                  {newData.length > 0
                    ? item.short_title
                      ? `${item.short_title} `
                      : `${item.size} Carat ${item.shape}`
                    : `${item.size} Carat ${item.shape} Diamond `}
                  <span>${item.total_sales_price}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
      <div className="container choose-setting-pages-main">
        <div className="main-content choose-setting-pages">
          {stock_num ? (
            <div className="main-btn-setting">
              <div className="ring Create-Your-Ring">
                <span>Design Your Ring</span>
                <div className="arrow-shape">{/* arrow design */}</div>
              </div>
              <div className="ring Choose-Setting">
                <Link to="#">
                  {(newData.length > 0 ? newData : diamondData).map((item) => {
                    return (
                      <>
                        <span className="step-counting">1</span>
                        <div className="image-of-gemstone">
                          <img src={item.image_url} alt="" />
                        </div>
                        <div className="gemstone-detail-banner">
                          <div className="setting step-heading">
                            {diamondData.length > 0 ? (
                              <span>Diamond</span>
                            ) : (
                              <span>Gemstone</span>
                            )}
                          </div>
                          <div className="name-of-gemstone">
                            {item.shape} - ${item.total_sales_price}
                          </div>
                          <div className="change-view">
                            <div className="change">
                              <Link
                                to={
                                  newData
                                    ? `/view_diamond/?stock_num=${item.stock_num}`
                                    : `/gemstones-detail/?stock_num=${item.stock_num}`
                                }
                              >
                                view
                              </Link>
                            </div>
                            <div className="change">
                              <Link
                                to={
                                  newData
                                    ? `/engagement-rings/start-with-a-diamond`
                                    : `/engagement-rings/start-with-a-gemstone`
                                }
                              >
                                Change
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Link>

                <div className="arrow-shape">{/* arrow design */}</div>
              </div>
              <div className="ring Choose-Diamond">
                <Link to="/engagement-rings/start-with-a-diamond">
                  <span className="step-counting">2</span>
                  <div className="img">
                    <img
                      src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/dimondbl.png"
                      alt=""
                    />
                  </div>
                  <div className="browse-setting-data">
                    <span className="step-heading">Choose Setting</span>
                  </div>
                </Link>
                <div className="arrow-shape">{/* arrow design */}</div>
              </div>

              <div className="ring Complete-Ring">
                <div className="inner-s">
                  <span className="step-counting">3</span>
                  <div className="img">
                    <img
                      src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/dimondbl3.png"
                      alt=""
                    />
                  </div>
                  <span className="step-heading">Complete Ring</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="center">Engagement Ring Setting</h1>

              {/* ====================create your ring start */}
              <div className="ring-choose-setting flex">
                <div className="one-choose-setting">
                  <span>1. Choose Setting</span>
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
                  <span>2. Choose Diamonds</span>
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
            </>
          )}
          {/* ====================create your ring end */}
          <div>
            <div className="white-wrapper">
              <div className="lab-diamond-btn">
                <div
                  className={`shop-by-common ShopByStyle ${
                    styleFilter === "style" ? "active" : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      FilterProduct(style);
                    }}
                  >
                    Shop by Style
                  </Link>
                </div>

                <div
                  className={`shop-by-common shop-by-shape ${
                    styleFilter === "shape" ? "active" : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      FilterProduct(shape);
                    }}
                  >
                    More Filters
                  </Link>
                </div>
              </div>
              {/* shop by style filtering start here */}
              <div
                className={`shop-by-page-common shop-by-shape-style buttons-container filter-button ${
                  styleFilter === "style" ? "active" : ""
                }`}
              >
                <SlickSlider
                  {...ShopStyleSliderOuter}
                  responsive={[
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        infinite: true,
                      },
                    },
                    {
                      breakpoint: 639,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                      },
                    },

                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                      },
                    },
                  ]}
                >
                  {ShopByStyle.map((styleItem) => {
                    return (
                      <>
                        <Link
                          to="#"
                          onClick={(e) => {
                            ShopStyle(styleItem.slug);
                          }}
                          className={`${
                            activeStyleIds.includes(styleItem.slug) ||
                            menuShopStyle === styleItem.slug
                              ? "style-active-common"
                              : ""
                          } `}
                        >
                          <div className="shop-style-img">
                            <img src={styleItem.image} alt="" />
                          </div>
                          <div className="shop-style-text">
                            <span>{styleItem.name}</span>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </SlickSlider>
              </div>
              {/* shop by style filtering  end */}

              {/* shop by Shape filtering  start */}
              <div
                className={`shop-by-page-common shop-by-shape-page ${
                  styleFilter === "shape" ? "active" : ""
                }`}
              >
                <div className="style-main">
                  <div className="corusel-diamond">
                    <span className="corusel-diamond-heading">
                      Setting Style
                    </span>
                    <div className="check-text">
                      <span>Bridal Sets Only</span>
                      <span className="corusel-diamond-checkbox">
                        <form action="">
                          <div class="form-group-diamond">
                            <input
                              type="checkbox"
                              id="html2"
                              onClick={() => setBridalSets(!bridalSets)}
                              checked={bridalSets}
                            />
                            <label for="html2"></label>
                          </div>
                        </form>
                      </span>
                    </div>
                  </div>
                  {/* shop by style filtering start here */}
                  <div
                    className={` shop-by-shape-style buttons-container filter-button 
                }`}
                  >
                    <SlickSlider
                      {...ShopStyleSlider}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 5,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 639,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {ShopByStyle.map((styleItem) => {
                        return (
                          <>
                            <Link
                              to="#"
                              onClick={(e) => {
                                ShopStyle(styleItem.slug);
                              }}
                              className={`${
                                activeStyleIds.includes(styleItem.slug) ||
                                menuShopStyle === styleItem.slug
                                  ? "style-active-common"
                                  : ""
                              } `}
                            >
                              <div className="shop-style-img">
                                <img src={styleItem.image} alt="" />
                              </div>
                              <div className="shop-style-text">
                                <span>{styleItem.name}</span>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>
                  {/* shop by style filtering  end */}
                </div>

                <div
                  className={`shop-by-metal-page ${
                    styleFilter === "metal" ? "active" : ""
                  }`}
                >
                  <div className="metal-variants">
                    <div className="metal-text">Metal</div>
                    <div className="metal-variant-list">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={MetalColor.id}
                          className="shop-by-metal-color"
                        >
                          <Link
                            to="javascript:void(0);"
                            className={`${
                              metalId === MetalColor.id
                                ? "metal-color-active"
                                : ""
                            }`}
                            type="button"
                            style={{
                              background: MetalColor.color,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              metalOnclick(MetalColor.id, MetalColor.value);
                            }}
                          >
                            <div>{MetalColor.name}</div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shape-main">
                  <span>Diamond Shape</span>
                  <SlickSlider
                    {...ShopShapeSlider}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 6,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 991,
                        settings: {
                          slidesToShow: 5,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 639,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 375,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 2,
                          infinite: true,
                        },
                      },
                    ]}
                  >
                    {shapeData.map((ShapeItem) => (
                      <div>
                        <Link
                          to="#"
                          className={`shape ${
                            shapeName === ShapeItem.shape ? "shape-active" : ""
                          }`}
                          key={ShapeItem.id}
                        >
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              shapeOnclick(ShapeItem.shape);
                            }}
                          >
                            <img src={ShapeItem.icon} alt={ShapeItem.name} />
                          </div>
                          <div className="shape-text">
                            <span>{ShapeItem.shape}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </SlickSlider>
                </div>
              </div>
            </div>
            {/* shop by Shape filtering  end */}

            <ShopByStyleMobileSlider />
          </div>
        </div>
        <div className="best-seller-main">
          <span>{newPrevData.product_count} ENGAGEMENT RINGS</span>

          <div className="best-seller">
            <form>
              <label for="#">Sort : </label>
              <Select
                placeholder="Best Seller"
                onChange={handlePriceChange}
                options={options}
              />
            </form>
          </div>
        </div>

        <div
          className={`bredCramStyleFilter ${
            selectedShopStyleIdsString ? "style-active" : ""
          } ${shapeName === shapeBreadCamb ? "shape-active" : ""}`}
        >
          {mergedArray.map((item, index) => {
            var bredCramStyleFilter_1 = item;
            // console.log(bredCramStyleFilter_1);
            const bredCramStyleFilter_2 = bredCramStyleFilter_1
              ? bredCramStyleFilter_1.split(" ")
              : [];
            const bredCramStyleFilter = bredCramStyleFilter_2.map((word) =>
              word.replace(/-/g, " ")
            );

            return (
              <React.Fragment key={index}>
                <React.Fragment key={index}>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      resetOneStyles(bredCramStyleFilter_1);
                    }}
                    className={`${
                      activeStyleIds.includes(bredCramStyleFilter_1)
                        ? "style-active-common"
                        : "style-setting"
                    }`}
                  >
                    {bredCramStyleFilter} <span>X</span>
                  </Link>
                </React.Fragment>
              </React.Fragment>
            );
          })}

          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllShape();
            }}
            className={`${
              shapeName === shapeBreadCamb ? "style-active-common" : "shape"
            }`}
          >
            <span>{shapeBreadCamb} X </span>
          </Link>

          {mergedArray.length > 1 && (
            <React.Fragment>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  resetAllStyles();
                }}
              >
                Reset All <span>X</span>
              </Link>
            </React.Fragment>
          )}
        </div>
        <div className="all-metal-color">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              metalColorValue === white ? "style-active-common color" : "color"
            }`}
          >
            <span>White X </span>
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              metalColorValue === yellow ? "style-active-common color" : "color"
            }`}
          >
            <span>Yellow X </span>
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              metalColorValue === rose ? "style-active-common color" : "color"
            }`}
          >
            <span>Pink X </span>
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              metalColorValue === platinum
                ? "style-active-common color"
                : "color"
            }`}
          >
            <span>Platinum X </span>
          </Link>
        </div>
        <div className="resultdata setings-Page-img">
          {filterRoseData.length > 0 ? (
            filterRoseData.map((item, index) => (
              <div key={item.index} className="resultdata all-pages-data ">
                <div className="outerDiv" id={`items-${item.id}`}>
                  <Link
                    to={
                      newData.length > 0
                        ? `/detail-ring-product-gemstone?slug=${
                            item.slug
                          }&color=${activeColor}&stock_num=${
                            stock_num ? stock_num : ""
                          }`
                        : `/detail-ring-product?slug=${
                            item.slug
                          }&color=${activeColor}${
                            stock_num ? `&stock_num=${stock_num}` : ""
                          }`
                    }
                  >
                    <div className="main-common-active product-main-img">
                      <div className="all-img1 common-img defaultImg ">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            effect="blur"
                            className="lazy-image"
                            src={item.image}
                            alt={item.name}
                          />
                        </span>
                        <span className="common-stand-img white-stand-img">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                          />
                        </span>
                        <LazyLoadImage
                          effect="blur"
                          className="video-poster"
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={item.name}
                        />
                      </div>

                      <div className="all-img1 img-1 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.alt.jpg`}
                            alt={item.name}
                          />
                        </span>
                        <span className="common-stand-img yellow-stand-img">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.side.alt.jpg`}
                            alt={item.name}
                          />
                        </span>
                      </div>

                      <div className="all-img1 img-2 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.alt1.jpg`}
                            alt={item.name}
                          />
                        </span>
                        <span className="common-stand-img rose-stand-img">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.side.alt1.jpg`}
                            alt={item.name}
                          />
                        </span>
                      </div>
                      <div className="all-img1 img-3 common-img">
                        <span className="common-stand-img-1">
                          <img src={item.image} alt={item.name} />
                        </span>
                        <span className="common-stand-img platinum-stand-img">
                          <img
                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="heart-icon">
                      <Link to={`${item.id}`}>
                        {toggledProducts[item.id] ? (
                          <IoMdHeart
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWishlistRemove(item, item.id);
                            }}
                          />
                        ) : (
                          <CiHeart
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWishlist(
                                item,
                                user_id,
                                ring,
                                item.id,
                                white,
                                item.white_gold_price,
                                item.sku
                              );
                            }}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="main-common-active all-card-four-colors ">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={MetalColor.id}
                          className={`all-card-four-color  ${
                            item.id === activePage &&
                            activeColor === MetalColor.name
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            style={{
                              background: MetalColor.color,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onChangeName(MetalColor.value, item.id);
                            }}
                          ></Link>
                        </div>
                      ))}
                    </div>
                    <div className="main-common-active">
                      <div className="metal-name-by-default">
                        <span>{item.name}</span>
                      </div>
                      {metalColor.map((MetalValue, index) => (
                        <div
                          className="metal-name-item-name"
                          key={MetalValue.id}
                        >
                          <span>
                            {MetalValue.value} {item.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* { changeName.className === item.id ? (
                      <div className={`main-common-active ${item.id}`}>
                        <div className={`metal-name ${changeName.className === item.id ? 'metal-active' : ""}`}>
                          <span>{changeName.value}</span> <span>{item.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="product-name">
                        <span>{item.name}</span>
                      </div>
                    )} */}

                    <div className="main-common-active">
                      <div className="all-img1 product-price defaultImg">
                        ${item.white_gold_price}
                      </div>
                      <div className="all-img1 product-price img-1">
                        ${item.yellow_gold_price}
                      </div>
                      <div className="all-img1 product-price img-2 ">
                        ${item.rose_gold_price}
                      </div>
                      <div className="all-img1 product-price img-3 ">
                        ${item.platinum_price}
                      </div>
                    </div>
                  </Link>
                  {/* <div>{item.id}</div> */}
                </div>
              </div>
            ))
          ) : (
            <h3 className="center">data not found</h3>
          )}
        </div>
        <div>
          <ProductListMoreToExplore />
        </div>
        <div>
          <ProductListFaq />
        </div>
        <div>{loading && <LoaderSpinner />}</div>
      </div>
    </>
  );
};

export default ChooseRingSetting;
