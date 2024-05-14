import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SlickSlider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import {
  addToWishList,
  removeToWishlist,
  setWishlistDetails,
} from "../../../redux/action";
import { UserContext } from "../../../App";
import { IoMdHeart } from "react-icons/io";
import LoaderSpinner from "../../LoaderSpinner";
import { useHistory } from "react-router-use-history";
import debounce from "lodash.debounce";
import { productList } from "../../../redux/productAction";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ChooseGemstones = () => {
  const location = useLocation();
  const gemSlug = new URLSearchParams(location.search);
  const gemStyle = gemSlug.get("style");
  const gemColor = gemSlug.get("color");
  const gemShape = gemSlug.get("shape");
  const history = useHistory();

  const [removeWishList, setRemoveWishList] = useState(null);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  let gemStyleSlider = "";
  if (gemStyle) {
    gemStyleSlider = `&gem_type[]=${
      gemStyle?.slice(0, 1).toUpperCase() + gemStyle?.slice(1)
    }`;
  }

  let gemColorSlider = "";
  if (gemColor) {
    gemColorSlider = `&color[]=${
      gemColor?.slice(0, 1).toUpperCase() + gemColor?.slice(1)
    }`;
  }

  let gemShapeSlider = "";
  if (gemShape) {
    gemShapeSlider = `&shapes[]=${
      gemShape?.slice(0, 1).toUpperCase() + gemShape?.slice(1)
    }`;
  }

  const gemStyles_use =
    gemStyle?.slice(0, 1).toUpperCase() + gemStyle?.slice(1);

  const gemColor_use = gemColor?.slice(0, 1).toUpperCase() + gemColor?.slice(1);

  const gemShape_use = gemShape?.slice(0, 1).toUpperCase() + gemShape?.slice(1);

  const [styleDataSlider, setStyleDataSlider] = useState([]);

  const [menuStyleNames, setMenuStyleNames] = useState(gemStyle);

  const [colorDataSlider, setColorDataSlider] = useState([]);
  const [menuColorNames, setMenuColorNames] = useState(gemColor);

  const [shapeDataSlider, setShapeDataSlider] = useState([]);
  const [menuShapeNames, setMenuShapeNames] = useState(gemShape);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user_id = localStorage.getItem("formData");
  const gemstone = "gemstone";

  const [shapeDataSliderGem, setShapeDataSliderGem] = useState([]);
  const [styleDataSliderGem, setStyleDataSliderGem] = useState([]);
  const [colorGem, setColorGem] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [gemCount, setGemCount] = useState([]);
  const [gemstoneFilterData, setGemstoneFilterData] = useState([]);

  const handleShapeClick = (styleItem) => {
    if (menuShapeNames === styleItem || gemShape_use === styleItem) {
      setMenuShapeNames("");
      gemSlug.set("shape", "");
      history.push({ search: gemSlug.toString() });
    } else {
      if (shapeDataSlider.includes(styleItem)) {
        setShapeDataSlider(
          shapeDataSlider.filter((item) => item !== styleItem)
        );
      } else {
        setShapeDataSlider([...shapeDataSlider, styleItem]);
      }
    }
  };

  const newShapeSliderData = shapeDataSlider
    ?.map(
      (style) => `&shapes[]=${style.slice(0, 1).toUpperCase() + style.slice(1)}`
    )
    .join("");
  const handelSettingStyle = (styleItem) => {
    if (menuStyleNames === styleItem || gemStyles_use === styleItem) {
      setMenuStyleNames("");
      gemSlug.set("style", "");
      history.push({ search: gemSlug.toString() });
    } else {
      if (styleDataSlider.includes(styleItem)) {
        setStyleDataSlider(
          styleDataSlider.filter((item) => item !== styleItem)
        );
      } else {
        setStyleDataSlider([...styleDataSlider, styleItem]);
      }
    }
  };

  const newStyleSliderData = styleDataSlider
    ?.map(
      (style) =>
        `&gem_type[]=${style.slice(0, 1).toUpperCase() + style.slice(1)}`
    )
    .join("");

  const handleColor = (color) => {
    if (menuColorNames === color || gemColor_use === color) {
      setMenuColorNames("");
      gemSlug.set("style", "");
      history.push({ search: gemSlug.toString() });
    } else {
      if (colorDataSlider.includes(color)) {
        setColorDataSlider(colorDataSlider.filter((item) => item !== color));
      } else {
        setColorDataSlider([...colorDataSlider, color]);
      }
    }
  };

  const newColorSliderData = colorDataSlider
    ?.map(
      (style) => `&color[]=${style.slice(0, 1).toUpperCase() + style.slice(1)}`
    )
    .join("");

  const fetchDataGem = useMemo(
    () => async () => {
      const url = `https://apiservices.vdbapp.com//v2/gemstones?markup_mode=true&page_number=${page}${
        gemStyleSlider ? gemStyleSlider : ""
      }${newStyleSliderData ? newStyleSliderData : ""}${
        newColorSliderData ? newColorSliderData : ""
      }${gemColorSlider ? gemColorSlider : ""}${
        newShapeSliderData ? newShapeSliderData : ""
      }${gemShapeSlider ? gemShapeSlider : ""}`;

      const params = {
        stock_item_type: "gemstones",
        status: "pending",
        page_number: page,
        page_size: 30,
      };

      const headers = {
        Authorization:
          "Token token=iltz_Ie1tN0qm-ANqF7X6SRjwyhmMtzZsmqvyWOZ83I, api_key=_eTAh9su9_0cnehpDpqM9xA",
      };

      try {
        setLoading(true);
        const response = await axios.get(url, { params, headers });
        if (page === 1) {
          setData(response.data.response.body.gemstones);
        } else {
          setData((prevData) => [
            ...prevData,
            ...response.data.response.body.gemstones,
          ]);
        }
        setGemCount(response.data.response.body);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      page,
      gemStyleSlider,
      newStyleSliderData,
      gemColorSlider,
      newColorSliderData,
      gemShapeSlider,
      newShapeSliderData,
      setLoading,
      setData,
      setGemCount,
    ]
  );

  // Call the memoized fetchData function inside useEffect
  useEffect(() => {
    fetchDataGem();
  }, [fetchDataGem]);
  useEffect(() => {
    setPage(1);
  }, [
    gemStyleSlider,
    newStyleSliderData,
    gemColorSlider,
    newColorSliderData,
    gemShapeSlider,
    newShapeSliderData,
  ]);

  // Scroll pagination start
  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= 0.7 * scrollHeight && !loading) {
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [page, loading]);
  // Scroll pagination end

  const style = "style";
  const moreFilter = "moreFilter";
  const [gemstones, setGemstone] = useState(style);
  const GemstonesProduct = (style) => {
    setGemstone(style);
  };
  const gemstonesStyleSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const gemstonesStyleSliderDesktop = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const moreGemstoneSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const moreGemstoneSliderColor = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
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
    user_id,
    product_type,
    gemstone_id,
    gemstone_price,
    gemstone_stock
  ) => {
    const newItem = { item, product_type: product_type, uniqueId: uuidv4() };
    dispatch(addToWishList(newItem));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.id]: true,
    }));
    setLocalWishlist([...localWishlist, newItem]);

    const formData = {
      user_id: user_id,
      product_type: product_type,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      gemstone_stock_no: gemstone_stock,
    };

    // localStorage.setItem("wish-list-data-base", JSON.stringify(formData))
    // const savedWishlist = JSON.parse(localStorage.getItem("wish-list-data-base")) || [];

    // console.log("============================",savedWishlist);
    const urlNew = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${formData.user_id}&product_type=${formData.product_type}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&gemstone_stock_no=${formData.gemstone_stock_no}`;
    axios
      .get(urlNew, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": tokenData,
        },
      })
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

  const [tokenData, setTokenData] = useState();
  const fetchCsrfToken = useMemo(() => {
    return async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
        );
        return response.data.csrf_token;
      } catch (error) {
        console.log("CSRF Token API Error:", error);
        return null;
      }
    };
  }, []);

  useEffect(() => {
    fetchCsrfToken().then((token) => {
      if (token) {
        setTokenData(token);
      }
    });
  }, [fetchCsrfToken]);

  useEffect(() => {
    const removeWishlist = async () => {
      try {
        const response = await axios.get(
          `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${removeWishList}`
        );
        console.log("===========", response.data);
        dispatch(productList());
      } catch (error) {
        console.log("CSRF Token API Error:", error);
      }
    };

    removeWishlist();
  }, [removeWishList]);

  // ===================get wishList all data
  // const fetchData = useMemo(() => {
  //   return async () => {
  //     try {
  //       if (user_id) {
  //         const response = await axios.get(
  //           `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/wishlist-items?user_id=${user_id}`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": tokenData,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log("==================================", response);
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
  // }, [wishlist]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  function handleWishlistRemove(belowItem) {
    wishlist.forEach((item) => {
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

    // Iterate over the values array
    wishListDataBase.forEach((item) => {
      console.log(item);
      if (belowItem?.stock_num === item?.gemstone_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  // loader
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // =========shape api
  const fetchGemstoneAttributes = useMemo(
    () => async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/gemstone-attributes"
        );
        setGemstoneFilterData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("shape API error gemstone");
      }
    },
    [setGemstoneFilterData]
  );

  // Call the memoized function inside useEffect
  useEffect(() => {
    fetchGemstoneAttributes();
  }, [fetchGemstoneAttributes]);

  const handleRemoveStyle = (slug) => {
    setStyleDataSlider((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedStyle) => selectedStyle !== slug)
    );
  };
  const handleRemoveShape = (shape) => {
    setShapeDataSlider((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedShape) => selectedShape !== shape)
    );
  };
  const handleRemoveColor = (color) => {
    setColorDataSlider((prevSelectedColors) =>
      prevSelectedColors.filter((selectedColor) => selectedColor !== color)
    );
  };
  const handleResetAll = () => {
    setStyleDataSlider([]);
    setColorDataSlider([]);
    setShapeDataSlider([]);
  };

  return (
    <>
      <section className="gemstone-main">
        <div className="container">
          <div className="main-content choose-setting-pages">
            <div>
              <h1 className="center">Teal Gemstones</h1>
              <div className="bread-cram-setting-pages">
                <Link to="/">Home / </Link>
                <Link to="/engagement-rings">Gemstones</Link> / teal
              </div>
              {/* ====================create your ring start */}
              <div className="main-arrow-heading">
                <div className="main-btn-setting">
                  <div className="ring Create-Your-Ring">
                    <span>Create Your Ring</span>
                    <div className="arrow-shape">{/* arrow design */}</div>
                  </div>

                  <div className="ring Choose-Setting">
                    <Link to="#">
                      <span className="step-counting">1</span>
                      <div className="img">
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/dimondbl4.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="setting step-heading">Gemstone</div>
                      </div>
                    </Link>
                    <div className="arrow-shape">{/* arrow design */}</div>
                  </div>

                  <div className="ring Choose-Diamond">
                    <Link to="/engagement-rings/start-with-a-setting">
                      <span className="step-counting">2</span>
                      <div className="img">
                        <img
                          src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/dimondbl4.png"
                          alt=""
                        />
                      </div>
                      <span className="step-heading">Choose Setting</span>
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
              </div>
              {/* ====================create your ring end */}
              <div className="white-wrapper">
                <div className="lab-diamond-btn">
                  <div
                    className={`shop-by-common ShopByStyle ${
                      gemstones === style ? "gemstone-Active" : ""
                    }`}
                  >
                    <Link
                      to="javascript:void(0)"
                      onClick={() => {
                        GemstonesProduct(style);
                      }}
                    >
                      Shop by Gemstone
                    </Link>
                  </div>

                  <div
                    className={`shop-by-common shop-by-shape ${
                      gemstones === moreFilter ? "gemstone-Active" : ""
                    }`}
                  >
                    <Link
                      to="javascript:void(0)"
                      onClick={() => {
                        GemstonesProduct(moreFilter);
                      }}
                    >
                      More Filters
                    </Link>
                  </div>
                </div>

                {/* shop by style filtering start here */}
                <div
                  className={`shop-by-page-common shop-by-shape-style buttons-container filter-button ${
                    gemstones === style ? "gemstone-active" : ""
                  } `}
                >
                  <SlickSlider
                    {...gemstonesStyleSliderDesktop}
                    responsive={[
                      {
                        breakpoint: 991,
                        settings: {
                          slidesToShow: 6,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },

                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 4,
                          slidesToScroll: 2,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 375,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 2,
                          infinite: true,
                        },
                      },
                    ]}
                  >
                    {gemstoneFilterData.gemstones?.map((item) => {
                      return (
                        <>
                          <Link
                            to="javascript:void(0);"
                            onClick={() => handelSettingStyle(item.name)}
                            className={`style-active-common ${
                              styleDataSlider.includes(item?.name) ||
                              menuStyleNames === item?.name ||
                              gemStyles_use === item?.name
                                ? "active"
                                : ""
                            }`}
                          >
                            <img src={item.image} alt="Sapphire-img" />
                            <span className="color-name">{item.name}</span>
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
                    gemstones === moreFilter ? "gemstone-Active" : ""
                  } `}
                >
                  <div className="style-main">
                    <div className="corusel-diamond">
                      <span className="corusel-diamond-heading">
                        Setting Style
                      </span>
                      {/* <div className="check-text">
                        <span>Bridal Sets Only</span>
                        <span className="corusel-diamond-checkbox">
                          <form action="">
                            <div class="form-group-diamond">
                              <input type="checkbox" id="html2" />
                              <label for="html2"></label>
                            </div>
                          </form>
                        </span>
                      </div> */}
                    </div>
                    <SlickSlider
                      {...gemstonesStyleSlider}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData.gemstones?.map((item) => {
                        return (
                          <>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => handelSettingStyle(item.name)}
                              className={`style-active-common ${
                                styleDataSlider.includes(item?.name) ||
                                menuStyleNames === item?.name ||
                                gemStyles_use === item?.name
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <img src={item.image} alt="Sapphire-img" />
                              <span className="color-name">{item.name}</span>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>

                  <div className="color-slider">
                    <span>Gemstone Color</span>
                    <SlickSlider
                      {...moreGemstoneSliderColor}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData.gemstone_color?.map((item) => {
                        return (
                          <>
                            <Link
                              to="#"
                              onClick={() => handleColor(item.name)}
                              className={`style-active-common ${
                                colorDataSlider.includes(item?.name) ||
                                menuColorNames === item?.name ||
                                gemColor_use === item?.name
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <img src={item.image} alt="Sapphire-img" />
                              <span className="color-name">{item.name}</span>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>

                  <div className="shape-main">
                    <span>Diamond Shape</span>
                    <SlickSlider
                      {...moreGemstoneSlider}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData.gemstone_shape?.map((item) => {
                        return (
                          <>
                            <Link
                              to="javascript:void(0);"
                              onClick={() => handleShapeClick(item?.name)}
                              className={`style-active-common ${
                                shapeDataSlider.includes(item?.name) ||
                                menuShapeNames == item?.name ||
                                gemShape_use == item?.name
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <img src={item.image} alt="Sapphire-img" />
                              <span className="color-name">{item.name}</span>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>
                </div>
              </div>
              {/* shop by Shape filtering  end */}
            </div>
          </div>
          <div className="best-seller-main">
            <span>{gemCount?.total_gemstones_found} Colored Gemstones</span>

            {/* <div className="best-seller">
              <form>
                <label for="#">Sort : </label>
                <select name="sort-price" id="sort">
                  <option value="best_seller">Best Sellers</option>
                  <option value="Newest">Newest</option>
                  <option value="low_to_high">Price (Low to High)</option>
                  <option value="high_to_low">Price (High to Low)</option>
                </select>
              </form>
            </div> */}
          </div>
          <div className="bredCramStyleFilter">
            {styleDataSlider.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveStyle(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {colorDataSlider.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveColor(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {shapeDataSlider.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveShape(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {(shapeDataSlider.length > 0 ||
              colorDataSlider.length > 0 ||
              styleDataSlider.length > 0) && (
              <div className="breadCram">
                <Link to="#" onClick={() => handleResetAll()}>
                  Reset All <span>X</span>
                </Link>
              </div>
            )}
          </div>
          {loader ? (
            <LoaderSpinner />
          ) : (
            <div className="gemstone-inners">
              {data.map((item) => {
                return (
                  <>
                    <div className="gemstone-inner-main">
                      <Link
                        to={`/gemstones-detail/?stock_num=${item.stock_num}`}
                      >
                        <div className="diamoond-gems">
                        <LazyLoadImage 
                           effect="blur" 
                          className="lazy-image"
                          src={item.image_url} alt={item.name} 
                          />
                          <div className="dia-gems">
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
                                    gemstone,
                                    item.stock_num,
                                    item.total_sales_price,
                                    item.id
                                  );
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="gems-limit">
                          <Link to="#">
                            <span> {item.short_title}</span>
                          </Link>
                          <span className="">${item.total_sales_price}</span>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {loading && <LoaderSpinner />}
        </div>
      </section>
    </>
  );
};
