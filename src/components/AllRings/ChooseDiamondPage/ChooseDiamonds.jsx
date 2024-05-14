import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaCamera } from "react-icons/fa6";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { PiVanFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slider";
import Switch from "react-switch";
import LoaderSpinner from "../../LoaderSpinner";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useHistory } from "react-router-use-history";
import debounce from "lodash.debounce";

export const ChooseDiamonds = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productSlug = queryParams.get("slug");
  const productColor = queryParams.get("color");
  const shapeDiamond = queryParams.get("shape-diamond");
  let menuShapeName = queryParams.get("shape");
  const listColor = queryParams.get("color");
  const diamond_original = queryParams.get("diamond_original");

  const history = useHistory();

  let shapeSlider = "";
  if (menuShapeName) {
    shapeSlider = `&shapes[]=${
      menuShapeName?.slice(0, 1).toUpperCase() + menuShapeName?.slice(1)
    }`;
  }

  const [shapeDataSlider, setShapeDataSlider] = useState([]);
  const [menuShapeNames, setMenuShapeNames] = useState(menuShapeName);
  const [labGrownDetails, setLabGrownDetails] = useState();
  console.log(labGrownDetails); 
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];
  const initialType = lastPathSegment === "lab" ? "lab" : "";
  const [type, setType] = useState(initialType);

  const handleTypeChange = (newType) => {
    setType(newType);
   
    history.push(
      `/engagement-rings/start-with-a-diamond${newType === "lab" ? "/lab" : ""}${location.search}`
    );
  };


  useEffect(() => {
    const newPathSegments = location.pathname.split("/");
    const newLastPathSegment = newPathSegments[newPathSegments.length - 1];
    const newType = newLastPathSegment === "lab" ? "lab" : "";
    setType(newType);
  }, [location.pathname]);

  const [checked, setChecked] = useState(false);
  const [checkedSecond, setCheckedSecond] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const resultArray = ["E", "F", "G", "H", "I", "J", "K"];
  const clarityOptions = [
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "FL",
    "IF",
  ];
  const cutOptions = [
    "Ideal",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
  ];
  let updatedArray = [...resultArray];
  const [sliderValue, setSliderValue] = useState([]);
  console.log(sliderValue);
  const [cutSliderValue, setCutSliderValue] = useState([]);
  console.log(cutSliderValue);
  const [claritySliderValue, setClaritySliderValue] = useState([]);
  console.log(claritySliderValue);

  function handleChange() {
    setChecked(!checked);
  }
  function handleChanges() {
    setCheckedSecond(!checkedSecond);
  }

  const shape = "shape";
  const moreFilter = "moreFilter";
  const [filterProduct, setFilterProduct] = useState(moreFilter);
  // range slider==============
  const minCaratRange = 0.01;
  const maxCaratRange = 15.0;
  const [minCarat, setMinCarat] = useState(minCaratRange);
  const [maxCarat, setMaxCarat] = useState(maxCaratRange);
  const [caratRange, setCaratRange] = useState([0.01, 15.0]);

  const minDiamondPriceRange = 100;
  const maxDiamondPriceRange = 100000;
  const [minDiamondPrice, setMinDiamondPrice] = useState(minDiamondPriceRange);
  const [maxDiamondPrice, setMaxDiamondPrice] = useState(maxDiamondPriceRange);
  const [diamondPriceRange, setDiamondPriceRange] = useState([100, 100000]);

  // color
  const minColorRange = 0;
  const maxColorRange = 100;
  const [colorRange, setColorRange] = useState([minColorRange, maxColorRange]);

  // cut
  const minCutRange = 0;
  const maxCutRange = 102;
  const [minCut, setMinCut] = useState(minCutRange);
  const [maxCut, setMaxCut] = useState(maxCutRange);
  const [cutRange, setCutRange] = useState([minCutRange, maxCutRange]);

  // clarity
  const minClarityRange = 0;
  const maxClarityRange = 100;
  const [clarityRange, setClarityRange] = useState([
    minClarityRange,
    maxClarityRange,
  ]);
  // range slider end========================
  const [data, setData] = useState([]);
  const [totalDiamond, setTotalDiamond] = useState([]);
  const [diamondFilter, setDiamondFilter] = useState(shape);
  const [shapeData, setShapeData] = useState([]);
  const [shapeName, setShapeName] = useState([]);
  const [activeStyleIds, setActiveStyleIds] = useState([]);

  const handleShapeClick = (styleItem) => {
    if (menuShapeName === styleItem || menuShapeNames === styleItem) {
      setMenuShapeNames("");
      queryParams.set("shape", "");
      history.push({ search: queryParams.toString() });
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

  const handleRemoveShape = (shape) => {
    setShapeDataSlider((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedShape) => selectedShape !== shape)
    );
  };
  const handleRemoveCarat = () => {
    setCaratRange([minCaratRange, maxCaratRange]);
  };
  const handleRemovePrice = () => {
    setDiamondPriceRange([minDiamondPriceRange, maxDiamondPriceRange]);
  };
  const handleRemoveColor = () => {
    setColorRange([minColorRange, maxColorRange]);
    setSliderValue([]);
  };
  const handleRemoveClarity = () => {
    setClarityRange([minClarityRange, maxClarityRange]);
    setClaritySliderValue([]);
  };
  const handleRemoveCut = () => {
    setCutRange([minCutRange, maxCutRange]);
    setCutSliderValue([]);
  };
  const handleResetAll = () => {
    setShapeDataSlider([]);
    setCaratRange([minCaratRange, maxCaratRange]);
    setDiamondPriceRange([minDiamondPriceRange, maxDiamondPriceRange]);
    setColorRange([minColorRange, maxColorRange]);
    setClarityRange([minClarityRange, maxClarityRange]);
    setCutRange([minCutRange, maxCutRange]);
    setSliderValue([]);
    setClaritySliderValue([]);
    setCutSliderValue([]);
  };

  const newShapeSliderData = shapeDataSlider
    ?.map(
      (shape) => `&shapes[]=${shape.slice(0, 1).toUpperCase() + shape.slice(1)}`
    )
    .join("");

  useEffect(() => {
    const fetchData = debounce(async () => {
      const url = `https://apiservices.vdbapp.com//v2/diamonds?type=${
        type == "lab" ? "Lab_grown_diamond" : "Diamond"
      }&markup_mode=true&price_total_to=${
        diamondPriceRange[1] ? diamondPriceRange[1] : ""
      }&price_total_from=${
        diamondPriceRange[0] ? diamondPriceRange[0] : ""
      }&size_from=${caratRange[0] ? caratRange[0] : ""}&size_to=${
        caratRange[1] ? caratRange[1] : ""
      }&color_from=${sliderValue[0] ? sliderValue[0] : ""}&color_to=${
        sliderValue[sliderValue.length - 1]
          ? sliderValue[sliderValue.length - 1]
          : ""
      }&page_number=${page}&cut_from=${cutSliderValue[0] ? cutSliderValue[0] : ""}&cut_to=${
        cutSliderValue[cutSliderValue.length]
          ? cutSliderValue[cutSliderValue.length - 1]
          : ""
      }${newShapeSliderData ? newShapeSliderData : ""}${
        shapeSlider ? shapeSlider : ""
      }`;

      // const url = `https://apiservices.vdbapp.com//v2/diamonds?type=Diamond&clarity_from=${claritySliderValue[0]}&clarity_to=${claritySliderValue[claritySliderValue.length-1]}`
      const params = {
        stock_item_type: "Diamond",
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
          setData(response.data.response.body.diamonds);
        } else {
          setData((prevData) => [
            ...prevData,
            ...response.data.response.body.diamonds,
          ]);
        }
        setTotalDiamond(response.data.response.body.total_diamonds_found);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    fetchData();
    console.log(diamondPriceRange[0], diamondPriceRange[1]);
    console.log(caratRange[0], caratRange[1]);
    console.log(sliderValue[0], sliderValue[sliderValue.length - 1]);
    console.log(cutSliderValue[0], cutSliderValue[cutSliderValue.length - 1]);
    console.log(
      claritySliderValue[0],
      claritySliderValue[claritySliderValue.length - 1]
    );
  }, [
    diamondPriceRange,
    caratRange,
    sliderValue[0],
    sliderValue[sliderValue.length - 1],
    cutSliderValue[0],
    cutSliderValue[cutSliderValue.length - 1],
    claritySliderValue[0],
    claritySliderValue[claritySliderValue.length - 1],
    claritySliderValue,
    cutSliderValue,
    sliderValue,
    page,
    type,
    newShapeSliderData,
    shapeSlider,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    type,
    diamondPriceRange,
    caratRange,
    sliderValue,
    cutSliderValue,
    claritySliderValue,
    type,
    newShapeSliderData,
    shapeSlider,
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

  //  =====================scroll pagination end===================

  // =============== shop by shape start ==============
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/diamondshape"
      )
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  // const shapeOnclick = (shapeNameItem) => {
  //   setShapeName((prevShapeName) =>
  //     prevShapeName === shapeNameItem ? "" : shapeNameItem
  //   );
  // };
  // =============== shop by shape end ==============
  // =============== shop by price range==============

  const caratHandleChange = (newRange) => {
    setCaratRange(newRange);
    setMinCarat(newRange[0]);
    setMaxCarat(newRange[1]);
  };

  const diamondPriceHandleChange = (newRange) => {
    setDiamondPriceRange(newRange);
    setMinDiamondPrice(newRange[0]);
    setMaxDiamondPrice(newRange[1]);
  };

  const colorHandleChange = (value) => {
    setColorRange(value);

    if (value[0] >= 14 || value[1] <= 14) {
      updatedArray = updatedArray.filter((item) => item !== "E");
    }
    if (value[0] >= 28 || value[1] <= 28) {
      updatedArray = updatedArray.filter((item) => item !== "F");
    }
    if (value[0] >= 42 || value[1] <= 42) {
      updatedArray = updatedArray.filter((item) => item !== "G");
    }
    if (value[0] >= 56 || value[1] <= 56) {
      updatedArray = updatedArray.filter((item) => item !== "H");
    }
    if (value[0] >= 70 || value[1] <= 70) {
      updatedArray = updatedArray.filter((item) => item !== "I");
    }
    if (value[0] >= 84 || value[1] <= 84) {
      updatedArray = updatedArray.filter((item) => item !== "J");
    }
    if (value[0] >= 98 || value[1] <= 98) {
      updatedArray = updatedArray.filter((item) => item !== "K");
    }

    const resultString = updatedArray.join(", ");
    setSliderValue(resultString);
  };
  const cutHandleChange = (newRange) => {
    setCutRange(newRange);
    let updatedCutArray = cutOptions.slice();

    if (newRange[0] >= 15 || newRange[1] <= 15) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Ideal");
    }
    if (newRange[0] >= 32 || newRange[1] <= 32) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Excellent");
    }
    if (newRange[0] >= 49 || newRange[1] <= 49) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Very Good");
    }
    if (newRange[0] >= 66 || newRange[1] <= 66) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Good");
    }
    if (newRange[0] >= 83 || newRange[1] <= 83) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Fair");
    }
    if (newRange[0] >= 100 || newRange[1] <= 100) {
      updatedCutArray = updatedCutArray.filter((item) => item !== "Poor");
    }

    setCutSliderValue(updatedCutArray);
  };

  const clarityHandleChange = (newRange) => {
    setClarityRange(newRange);

    let updateClarityOptions = clarityOptions.slice();

    if (newRange[0] >= 0 || newRange[1] <= 0) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "VVS1"
      );
    }
    if (newRange[0] >= 13 || newRange[1] <= 13) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "VVS2"
      );
    }
    if (newRange[0] >= 26 || newRange[1] <= 26) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "VS1"
      );
    }
    if (newRange[0] >= 39 || newRange[1] <= 39) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "VS2"
      );
    }
    if (newRange[0] >= 52 || newRange[1] <= 52) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "SI1"
      );
    }
    if (newRange[0] >= 65 || newRange[1] <= 65) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "SI2"
      );
    }
    if (newRange[0] >= 78 || newRange[1] <= 78) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "FL"
      );
    }
    if (newRange[0] >= 100 || newRange[1] <= 100) {
      updateClarityOptions = updateClarityOptions.filter(
        (item) => item !== "IF"
      );
    }

    setClaritySliderValue(updateClarityOptions);
  };
  // ===============shop by price range end==============

  const FilterProduct = (filterData) => {
    setDiamondFilter(filterData);
  };

  const [getTableData, setGetTableData] = useState([]);

  const findTableData = (shape, price, carat, color, clarity) => {
    const newData = { shape, price, carat, color, clarity };
    setGetTableData((prevData) => [...prevData, newData]);
  };

  const [activeUL, setActiveUL] = useState(null);
  const handleClick = (ulName) => {
    setActiveUL(ulName === activeUL ? null : ulName);
  };
  // ===============ring details Api==============

  const [filterData, setFilterData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  console.log(filterData);

  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/product/${productSlug}`
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
  // ring api details Api end

  const diamondShape = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  // loader
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, []);

  const [clickedCheckboxes, setClickedCheckboxes] = useState([]);
  const trackClick = (key) => {
    setClickedCheckboxes((prevState) => {
      if (prevState.includes(key)) {
        return prevState.filter((presentState) => presentState !== key);
      } else {
        return [...prevState, key];
      }
    });
  };

  // ============ price  lab_grown =======================//
  useEffect(() => {
    axios
      .get(
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/get_product_price?product_sku=${
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
  }, [filterData.product?.sku, listColor, filterData.product?.metalColor,diamond_original]);
  return (
    <div className="container choose-diamonds">
      <div className="bread-cram-setting-pages">
        <Link to="/">Home</Link> /{" "}
        <Link to="/engagement-rings">Engagement Rings</Link> / Start with a
        Diamond
      </div>
      {productSlug ? (
        <div className="main-arrow-heading">
          <div className="main-btn-setting">
            <div className="ring Create-Your-Ring">
              <span>Create Your Ring</span>
              <div className="arrow-shape"></div>
            </div>
            <div className="ring Choose-Setting">
              <Link to="javascript:void(0);">
                <span className="step-counting">1</span>
                <div className="img">
                  <div
                    className={`details-video-common tabbing-img-icon-common
                           ${productColor === white ? "active" : ""}
                          
                       `}
                  >
                    <img
                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                      alt=""
                    />
                  </div>

                  <div
                    className={`details-video-common tabbing-img-icon-common
                           ${productColor === yellow ? "active" : ""}
                          
                       `}
                  >
                    <img
                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                      alt=""
                    />
                  </div>
                  <div
                    className={`details-video-common tabbing-img-icon-common
                           ${productColor === rose ? "active" : ""}
                          
                       `}
                  >
                    <img
                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                      alt=""
                    />
                  </div>

                  <div
                    className={`details-video-common tabbing-img-icon-common
                           ${productColor === platinum ? "active" : ""}
                          
                       `}
                  >
                    <img
                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className="setting step-heading">Setting</div>
                  <div className="name-price">
                    <div>
                      <span>{filterData.product?.name}</span>
                    </div>
                    
                    { diamond_original == "lab_grown" ? (
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
                          <span> ${filterData.product?.white_gold_price} </span>
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
                          <span> ${filterData.product?.rose_gold_price} </span>
                        </div>

                        <div
                          className={`price-common price-tabbing-common ${
                            productColor === platinum ? "active" : ""
                          }`}
                        >
                          <span> ${filterData.product?.platinum_price} </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="change-view">
                    <div className="change">
                      <Link
                        to={`/detail-ring-product?slug=${productSlug}&color=${productColor}`}
                      >
                        view
                      </Link>
                    </div>
                    <div className="change">
                      <Link to="/engagement-rings/start-with-a-setting">
                        Change
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="arrow-shape"></div>
            </div>

            <div className="ring Choose-Diamond">
              <Link to="/engagement-rings/start-with-a-diamond">
                <span className="step-counting">2</span>
                <div className="img">
                  <img src="/images/dimondbl.png" alt="" />
                </div>
                <span className="step-heading">Choose Diamond</span>
              </Link>
              <div className="arrow-shape"></div>
            </div>

            <div className="ring Complete-Ring">
              <div className="inner-s">
                <span className="step-counting">3</span>
                <div className="img">
                  <img src="/images/dimondbl3.png" alt="" />
                </div>
                <span className="step-heading">Complete Ring</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-arrow-heading">
          <div className="main-btn-setting">
            <div className="ring Create-Your-Ring">
              <span>Create Your Ring</span>
              <div className="arrow-shape"></div>
            </div>
            <div className="ring Choose-Setting">
              <Link to="/engagement-rings/start-with-a-diamond">
                <span className="step-counting">1</span>
                <div className="img">
                  <img src="/images/dimondbl.png" alt="" />
                </div>
                <span className="step-heading">Choose Diamond</span>
              </Link>
              <div className="arrow-shape"></div>
            </div>

            <div className="ring Choose-Diamond">
              <Link to="/engagement-rings/start-with-a-setting">
                <span className="step-counting">2</span>
                <div className="img">
                  <img src="/images/dimondbl4.png" alt="" />
                </div>
                <span className="step-heading">Choose Setting</span>
              </Link>
              <div className="arrow-shape"></div>
            </div>

            <div className="ring Complete-Ring">
              <div className="inner-s">
                <span className="step-counting">3</span>
                <div className="img">
                  <img src="/images/dimondbl3.png" alt="" />
                </div>
                <span className="step-heading">Complete Ring</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="diamond-table-btn">
        <div
          className={`diamond-by-common diamondBy-shape  ${
            diamondFilter == shape ? "active" : ""
          }`}
        >
          <Link
            to="javascript:void(0);"
            onClick={() => {
              FilterProduct(shape);
            }}
          >
            Shape, Carat, & Price
          </Link>
        </div>

        <div
          className={`diamond-by-common diamondBy-more-filter ${
            diamondFilter == moreFilter ? "active" : ""
          }`}
        >
          <Link
            to="javascript:void(0);"
            onClick={() => {
              FilterProduct(moreFilter);
            }}
          >
            More Filters
          </Link>
        </div>
      </div>

      <div className="main-diamond-filter">
        <div
          className={`shape-diamond-filter ${
            diamondFilter === "shape" ? "active" : ""
          }`}
        >
          <div className="lab-grown-shape-icons">
            <span>Diamond Shape</span>
            <div className="shape-icons">
              <SlickSlider {...diamondShape}>
                {shapeData.map((styleItem) => {
                  return (
                    <>
                      <Link
                        to="javascript:void(0)"
                        onClick={() => handleShapeClick(styleItem?.shape)}
                        className={`style-active-common ${
                          shapeDataSlider.includes(styleItem?.shape) ||
                          menuShapeNames === styleItem?.shape ||
                          menuShapeName === styleItem?.shape
                            ? "active"
                            : ""
                        }`}
                        key={styleItem.slug} // Add a unique key for each item in the map function
                      >
                        <div className="shop-style-img">
                          <img
                            className={`shop-style-image-full`}
                            src={styleItem.icon}
                            alt=""
                          />
                        </div>

                        <div className="shop-style-text">
                          <span>{styleItem.shape}</span>
                          {/* <span>{capitalizeFirstLetter(styleItem.shape)}</span> */}
                        </div>
                      </Link>
                    </>
                  );
                })}
              </SlickSlider>
            </div>

            <div className="Diamond-Original-main">
              <span>Diamond Origin:</span>
              <div className="Diamond-Original">
                <Link
                  to="javascript:void(0)"
                  className={type === "" ? "nature-active" : ""}
                  onClick={() => handleTypeChange("")}
                >
                  Nature
                </Link>
                <Link
                  to="javascript:void(0)"
                  className={type === "lab" ? "nature-active" : ""}
                  onClick={() => handleTypeChange("lab")}
                >
                  Lab Grown
                </Link>
              </div>
            </div>
          </div>
          <div className="shape-slider">
            <div className="shape-slider-1">
              <span>Carat</span>
              <Slider
                className="slider"
                onChange={caratHandleChange}
                value={caratRange}
                min={minCaratRange}
                max={maxCaratRange}
                step={0.01}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div className="range-slider-show"> {caratRange[0]}</div>
                <div className="range-slider-show"> {caratRange[1]}</div>
              </div>
            </div>

            <div className="shape-slider-2">
              <span>Diamond Price</span>
              <Slider
                className="slider"
                onChange={diamondPriceHandleChange}
                value={diamondPriceRange}
                min={minDiamondPriceRange}
                max={maxDiamondPriceRange}
                step={10}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div className="range-slider-show">${diamondPriceRange[0]}</div>
                <div className="range-slider-show">${diamondPriceRange[1]}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`shape-diamond-more-filter ${
            diamondFilter === "moreFilter" ? "active" : ""
          }`}
        >
          <div className="slider-1">
            <div className="shape-color">
              <span>Color</span>
              <Slider
                className="slider"
                onChange={colorHandleChange}
                value={colorRange}
                // min={minColorRange}
                // max={maxColorRange}
                marks={15}
                step={14.5}
                trackStyle={{ backgroundColor: "red" }}
              />
              <div className="color-text">
                <ul>
                  <li>E</li>
                  <li>F</li>
                  <li>G</li>
                  <li>H</li>
                  <li>I</li>
                  <li>J</li>
                  <li>K</li>
                </ul>
              </div>
            </div>

            <div className="shape-cut">
              <span>Cut</span>
              <Slider
                min={0}
                max={101}
                value={cutRange}
                onChange={cutHandleChange}
                step={17}
                marks={17}
              ></Slider>

              <div className="cut-list-diamonds">
                <ul>
                  <li>Ideal</li>
                  <li>Excellent</li>
                  <li>Very Good</li>
                  <li>Good</li>
                  <li>Fair</li>
                  <li>Poor</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="more-filter">
            <div className="more-filter-clarity">
              <span>Clarity</span>
              <Slider
                className="slider"
                onChange={clarityHandleChange}
                value={clarityRange}
                marks={13}
                step={12.6}
                trackStyle={{ backgroundColor: "red" }}
              />
              <div className="color-text">
                <ul className="clarity">
                  <li>VVS1</li>
                  <li>VVS2</li>
                  <li>VS1</li>
                  <li>VS2</li>
                  <li>SI1</li>
                  <li>SI2</li>
                  <li>FL</li>
                  <li>IF</li>
                </ul>
              </div>
            </div>

            <div className="center diamond-table-sort">
              <form>
                <select name="sort-price" id="sort">
                  <option value="best_seller">What Matters Most To You?</option>
                  <option value="Newest">Best Balance</option>
                  <option value="low_to_high">Most Sparkle</option>
                  <option value="high_to_low">Premium Quality</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="data-table-responsive-main-parent">
        <h2 className="center">ChooseDiamonds</h2>
        <div className="data-table-responsive-main">
          <div className="data-table-responsive">
            <div className="diamonds-table">
              <div className="data-tabs">
                <ul>
                  <li className="active">
                    All Diamonds (<span>{totalDiamond}</span>)
                  </li>
                  {/* <li>
                    Truly Brilliant
                    <span className="tooltipp">
                      <HiMiniInformationCircle />
                      <span>
                        Discover <i>Truly Brilliant</i> <sup>TM</sup>- a premium
                        collection of expertly curated diamonds chosen for their
                        balance of traceability, sustainability, cut, color, and
                        clarity in a variety of carat weights.
                        <div className="arrow"></div>
                      </span>
                    </span>
                    (412)
                  </li>
                  <li>
                    Most Popular
                    <span>(20)</span>
                  </li>
                  <li>
                    Compare
                    <span>
                      {clickedCheckboxes.length !== 0
                        ? `(${clickedCheckboxes.length})`
                        : null}
                    </span>
                  </li> */}
                </ul>
                {(shapeDataSlider.length > 0 ||
                  caratRange[0] > minCaratRange ||
                  caratRange[1] < maxCaratRange ||
                  diamondPriceRange[0] > minDiamondPriceRange ||
                  diamondPriceRange[1] < maxDiamondPriceRange ||
                  colorRange[0] > minColorRange ||
                  colorRange[1] < maxColorRange ||
                  clarityRange[0] > minClarityRange ||
                  clarityRange[1] < maxClarityRange ||
                  cutRange[0] > minCutRange ||
                  cutRange[1] < maxCutRange) && (
                  <div className="breadCram">
                    <Link to="#" onClick={() => handleResetAll()}>
                      Reset Filters <span>X</span>
                    </Link>
                  </div>
                )}
              </div>
              <div className="applying-breadCrum">
                {/* <div className="toggale-data-function">
                  <label className="switch delivery">
                    <div className="toggle-datta">
                      <p>
                        <Switch
                          onChange={() => handleChange()}
                          checked={checked}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#232323"
                        />
                        Quick Ship
                      </p>
                      <div className="toggle-icon-img">{<PiVanFill />}</div>
                    </div>
                  </label>
                  <label className="switch">
                    <div className="toggle-datta">
                      <p>
                        <Switch
                          onChange={() => handleChanges()}
                          checked={checkedSecond}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#232323"
                        />
                        Real View
                      </p>
                      <div className="toggle-icon-img">
                        <FaCamera />
                      </div>
                    </div>
                  </label>
                </div> */}
                <div className="bredCramStyleFilter">
                  {shapeDataSlider.map((item) => (
                    <div className="breadCram" key={item}>
                      <Link to="#" onClick={() => handleRemoveShape(item)}>
                        {item} <span>X</span>
                      </Link>
                    </div>
                  ))}
                  {(caratRange[0] > minCaratRange ||
                    caratRange[1] < maxCaratRange) && (
                    <div className="breadCram">
                      <Link to="#" onClick={() => handleRemoveCarat()}>
                        {`${caratRange[0]} - ${caratRange[1]}`} <span>X</span>
                      </Link>
                    </div>
                  )}
                  {(diamondPriceRange[0] > minDiamondPriceRange ||
                    diamondPriceRange[1] < maxDiamondPriceRange) && (
                    <div className="breadCram">
                      <Link to="#" onClick={() => handleRemovePrice()}>
                        {`${diamondPriceRange[0]} - ${diamondPriceRange[1]}`}{" "}
                        <span>X</span>
                      </Link>
                    </div>
                  )}
                  {(sliderValue[0] > "" || sliderValue[1] < "") && (
                    <div className="breadCram">
                      <Link to="#" onClick={() => handleRemoveColor()}>
                        {`${sliderValue[0]} - ${
                          sliderValue[sliderValue.length - 1]
                        }`}{" "}
                        <span>X</span>
                      </Link>
                    </div>
                  )}
                  {(claritySliderValue[0] > "" ||
                    claritySliderValue[1] < "") && (
                    <div className="breadCram">
                      <Link to="#" onClick={() => handleRemoveClarity()}>
                        {`${claritySliderValue[0]} - ${
                          claritySliderValue[claritySliderValue.length - 1]
                        }`}{" "}
                        <span>X</span>
                      </Link>
                    </div>
                  )}
                  {(cutSliderValue[0] > "" || cutSliderValue[1] < "") && (
                    <div className="breadCram">
                      <Link to="#" onClick={() => handleRemoveCut()}>
                        {`${cutSliderValue[0]} - ${
                          cutSliderValue[cutSliderValue.length - 1]
                        }`}{" "}
                        <span>X</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <table id="customers">
                <tr>
                  <th>
                    Shape
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Price
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Carat
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Cut
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Color
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Clarity
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                  <th>
                    Compare
                    <span>
                      <FaAngleDown />
                    </span>
                  </th>
                </tr>
              </table>
            </div>
            {loader ? (
              <LoaderSpinner />
            ) : (
              data.map((item, key) => {
                return (
                  <>
                    <ul
                      className="prodcut-data"
                      onClick={() => handleClick(key)}
                    >
                      <li className="heading-data-categery">
                        <div className="main-wrapper">
                          <div className="item-shape-image">
                            <img src={item.image_url} alt="round shape" />
                          </div>
                          <p>{item.shape}</p>
                        </div>
                      </li>
                      <li className="heading-data-categery">
                        <p>{item.total_sales_price}</p>
                      </li>
                      <li className="heading-data-categery">
                        <p>{item.size}</p>
                      </li>
                      <li className="heading-data-categery">
                        <p>{item.cut}</p>
                      </li>
                      <li className="heading-data-categery">
                        <p>{item.color}</p>
                      </li>
                      <li className="heading-data-categery">
                        <p>{item.clarity}</p>
                      </li>
                      {/* <li className="heading-data-categery">
                  <p>
                    $1,650
                  </p>
                </li> */}
                      {/* <li className="heading-data-categery">
                  <p>
                    $1,650
                  </p>
                </li> */}

                      {/* <li className="heading-data-categery blank-bar">

                </li> */}

                      <li className="heading-data-categery campare boder-rt">
                        <form action="">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id={`html${key}`}
                              onClick={() => trackClick(key)}
                            />
                            <label htmlFor={`html${key}`}></label>
                          </div>
                        </form>
                      </li>
                    </ul>
                    <div className={activeUL === key ? "" : "hide-data"}>
                      <div class="inner-dimond-data-stucture">
                        <div class="prodcut-img">
                          <iframe
                            src={item.video_url}
                            frameborder="0"
                            title="video"
                          ></iframe>
                        </div>
                        <div class="pro-cart-data">
                          <div class="pro-data-cart head">
                            <Link to="javascript:void(0);">
                              <p>
                                {item.size} Carat {item.shape} Diamond
                              </p>
                            </Link>
                          </div>
                          <div class="pro-data-cart border-btm">
                            <p>Price: {item.total_sales_price}</p>
                          </div>
                          <div class="pro-data-cart border-btm">
                            <p>Carat: {item.size}</p>
                          </div>
                          <div class="pro-data-cart border-btm">
                            <p>Cut: {item.cut}</p>
                          </div>
                          <div class="pro-data-cart border-btm">
                            <p>Color: {item.color}</p>
                          </div>
                          <div class="pro-data-cart border-btm">
                            <p>Clarity: {item.clarity}</p>
                          </div>
                          {/* <div class="pro-data-cart border-btm">
                    <p>1.00 Carat Oval Diamond</p>
                  </div> */}
                          {/* <div class="pro-data-cart border-btm">
                    <p>1.00 Carat Oval Diamond</p>
                  </div> */}
                        </div>
                        <div class="pro-cart-btn">
                          <div class="slect-dimond">
                            {productSlug ? (
                              <Link
                                to={`/final_ring/?slug=${filterData.product?.slug}&color=${productColor}&stock_num=${item.stock_num}&diamond_original=${labGrownDetails?.diamond_type}`}
                              >
                                select diamond
                              </Link>
                            ) : (
                              <Link
                                to={`/engagement-rings/start-with-a-setting?stock_num=${item.stock_num}`}
                              >
                                select diamond
                              </Link>
                            )}
                          </div>
                          <div class="view-dmd">
                            {productSlug ? (
                              <Link
                                to={`/view_diamond?stock_num=${item.stock_num}&slug=${filterData.product?.slug}&color=${productColor}`}
                              >
                                view diamond detail
                              </Link>
                            ) : (
                              <Link
                                to={`/view_diamond?stock_num=${item.stock_num}`}
                              >
                                view diamond detail
                              </Link>
                            )}
                          </div>
                          <div class="other-btn-bar">
                            <Link to="javascript:void(0);">quick ship</Link>
                            <Link to="javascript:void(0);">
                              in another user bag
                            </Link>
                            <Link to="javascript:void(0);">
                              only one available
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{loading && <LoaderSpinner />}</div>
                  </>
                );
              })
            )}

            {/* <div className="table-text">
        {getTableData.map((itemData) => {
          return (
            <>
              <button>+</button>
              <div>Shape: {itemData.shape}</div>
              <div>Price: {itemData.price}</div>
              <div>Carat: {itemData.carat}</div>
              <div>Color: {itemData.color}</div>
              <div>Clarity: {itemData.color}</div>
              <div>
                <Link to="#">
                  <button>Select diamond</button>
                </Link>
              </div>
            </>
          );
        })}
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
