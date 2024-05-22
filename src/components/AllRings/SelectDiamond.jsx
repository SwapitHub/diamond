import axios from "axios";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { GiMapleLeaf } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import {
  IoCallOutline,
  IoChatbubbleOutline,
  IoDiamond,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../App";
import {
  addToWishList,
  removeToWishlist
} from "../../redux/action";
import { productList } from "../../redux/productAction";
import { DropHint } from "../forntFiles/DropHint";
import { BankPopup } from "./popups/BankPopup";
import { CaratPopup } from "./popups/CaratPopup";
import { ClarityPopup } from "./popups/ClarityPopup";
import { ColorPopup } from "./popups/ColorPopup";
import { CuletPopup } from "./popups/CuletPopup";
import { CutPopup } from "./popups/CutPopup";
import { DepthPopup } from "./popups/DepthPopup";
import { FlourePopup } from "./popups/FlourePopup";
import { GirdlePopup } from "./popups/GirdlePopup";
import { MeasPopup } from "./popups/MeasPopup";
import { PolishPopup } from "./popups/PolishPopup";
import { PricePopup } from "./popups/PricePopup";
import { ShapePopup } from "./popups/ShapePopup";
import { SymmetryPopup } from "./popups/SymmetryPopup";
import { TablePopup } from "./popups/TablePopup";

export const SelectDiamond = () => {
  const [diamondDetails, setDiamondDetails] = useState({});
  const [banner, setBanner] = useState({});
  const [open, setOpen] = useState(false);
  const [measOpen, setMeasOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [cutOpen, setCutOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [depthOpen, setDepthOpen] = useState(false);
  const [symmetryOpen, setSymmetryOpen] = useState(false);
  const [polishOpen, setPolishOpen] = useState(false);
  const [girdleOpen, setGirdleOpen] = useState(false);
  const [culetOpen, setCuletOpen] = useState(false);
  const [floureOpen, setFloureOpen] = useState(false);
  const [shapeOpen, setShapeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [clarityOpen, setClarityOpen] = useState(false);
  const [newData, setNewData] = useState([]);
  const {baseUrl} = useContext(UserContext)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stock_num = queryParams.get("stock_num");
  console.log(newData);
  const productSlug = queryParams.get("slug");
  const productColor = queryParams.get("color");

  const diamond = "diamond";
  const user_id = localStorage.getItem("formData");
  const dispatch = useDispatch();
  const {
    toggledProducts,
    setToggledProducts,
    localWishlist,
    setLocalWishlist,
  } = useContext(UserContext);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  console.log(wishListDataBase);

  const [removeWishList, setRemoveWishList] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://apiservices.vdbapp.com//v2/diamonds?type=Diamond&stock_num=${stock_num}`;
      const params = {
        stock_item_type: "Diamond",
        status: "pending",
        page_number: 1,
        page_size: 1,
      };

      const headers = {
        Authorization:
          "Token token=iltz_Ie1tN0qm-ANqF7X6SRjwyhmMtzZsmqvyWOZ83I, api_key=_eTAh9su9_0cnehpDpqM9xA",
      };

      try {
        const response = await axios.get(url, { params, headers });
        setNewData(response.data.response.body.diamonds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ===============ring details Api==============

  const [filterData, setFilterData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "18K platinum GOLD";
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
  // ring api details Api end
  const toggleDiamond = (index) => {
    setDiamondDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleBanner = (index) => {
    setBanner((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      isOpen ||
      cutOpen ||
      colorOpen ||
      bankOpen ||
      shapeOpen ||
      culetOpen ||
      depthOpen ||
      floureOpen ||
      girdleOpen ||
      measOpen ||
      polishOpen ||
      priceOpen ||
      shapeOpen ||
      symmetryOpen ||
      tableOpen ||
      clarityOpen
    ) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [
    isOpen,
    cutOpen,
    colorOpen,
    bankOpen,
    shapeOpen,
    culetOpen,
    depthOpen,
    floureOpen,
    girdleOpen,
    measOpen,
    polishOpen,
    priceOpen,
    symmetryOpen,
    tableOpen,
    clarityOpen,
  ]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentDay = currentDate.getDate();
  const currentFinalDate = new Date(currentDate);
  currentFinalDate.setDate(
    currentFinalDate.getDate()
    // + parseInt(newData.product?.shippingDay)
  );
  const formattedDate = currentFinalDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const wishlist = useSelector((state) => state.wishlistData);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLocalWishlist(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist.forEach((item) => {
      initialToggledProducts[item.diamonds?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

  // const handleWishlist = async (item) => {
  //   const newItem = { diamonds : item, uniqueId: uuidv4() };
  //   dispatch(addToWishList(newItem));
  //   setToggledProducts((prevState) => ({
  //     ...prevState,
  //     [item.id]: true,
  //   }));
  //   setLocalWishlist([...localWishlist, newItem]);
  // };

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    diamond_id,
    diamond_price,
    diamond_stock_no
  ) => {
    const newItem = {
      diamonds: item,
      product_type: product_type,
      uniqueId: uuidv4(),
    };
    dispatch(addToWishList(newItem));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.id]: true,
    }));
    setLocalWishlist([...localWishlist, newItem]);

    const formData = {
      user_id: user_id,
      product_type: product_type,
      diamond_id: diamond_id,
      diamond_price: diamond_price,
      diamond_stock_no: diamond_stock_no,
    };

    // localStorage.setItem("wish-list-data-base", JSON.stringify(formData))
    // const savedWishlist = JSON.parse(localStorage.getItem("wish-list-data-base")) || [];

    // console.log("============================",savedWishlist);
    console.log("data ring ", formData);
    axios
      .get(
        `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&product_type=${formData.product_type}&diamond_price=${formData.diamond_price}&diamond_id=${formData.diamond_id}&diamond_stock_no=${formData.diamond_stock_no}`

        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "X-CSRF-TOKEN": tokenData,
        //   },
        // }
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
  //           console.log("=================get card item details", response);
  //           dispatch(setWishlistDetails(response.data.data));
  //           console.log(response);
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

  useEffect(() => {
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;
      console.log(removeWishList);
      console.log(removeWish);
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

  function handleWishlistRemove(belowItem, itemId) {
    wishlist.forEach((item) => {
      if (belowItem?.id === (item.item?.id || item.diamonds?.id)) {
        dispatch(removeToWishlist(item));
        setToggledProducts((prevState) => ({
          ...prevState,
          [belowItem.id]: false,
        }));
        const updatedWishlist = localWishlist.filter(
          (wishlistItem) =>
            (wishlistItem.item?.id || wishlistItem.diamonds?.id) !==
            belowItem.id
        );
        setLocalWishlist(updatedWishlist);
      }
    });

    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (belowItem?.stock_num === item?.diamond_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  return (
    <>
      <div className="sticky-right-column  diamond-view">
        <div className="container">
          {/* ====================create your ring start */}
          <div className="main-arrow-heading">
          {/* ====================create your ring start */}
          <div className="ring-choose-setting flex">
            <div className="one-choose-setting">
              <Link to="javascript:void(0)">1. Choose Diamonds</Link>
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
          <div className="sticky-right-column">
            {newData.map((item) => {
              console.log(item);
              return (
                <>
                  <div className="sticky-inner-main">
                    <div className="left-product-images left-product-details">
                      <ul className="product-list-thumbnail">
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/gold-ring.png" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/still.jpg" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/gold-ring.png" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/still.jpg" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/gold-ring.png" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/still.jpg" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/gold-ring.png" />
                        </li>
                        <li>
                          <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/still.jpg" />
                        </li>
                      </ul>
                      <div className="main-zoom-iamge">
                        <iframe src={item.video_url} frameborder="0"></iframe>
                      </div>
                    </div>
                    <div className="right-product-content ">
                      <h5 className="heading-four">
                        {item.size} Carat {item.shape} Diamond
                      </h5>
                      <p>
                        {item.cut} Cut{" "}
                        <span>
                          <RxDotFilled />
                        </span>
                        {item.color} Color
                        <span>
                          <RxDotFilled />
                        </span>{" "}
                        {item.clarity} Clarity{" "}
                        <span>
                          <RxDotFilled />
                        </span>
                        {item.lab}
                      </p>
                      <div className="seleted-items-purchage">
                        <div className="setting-price-main">
                          <p className="setting-only-price">
                            <span id="title_price">${item.base_price}</span>
                          </p>
                          <p>
                            <span>Only {item.available} Available</span>
                          </p>
                        </div>
                        <div className="selected-inner-pair caret-rounded">
                          <div className="left-icon-image">
                            <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png" />
                          </div>
                          <div className="right-purchage-icon-content">
                            <h4 className="media-heading">LAST DAY!</h4>
                            <p className="media-text">
                              Lab Diamond Studs With Purchase Over $1,000.
                              Surprise Earrings With All Other Purchases.
                            </p>
                          </div>
                        </div>
                        <div className="purchage-select-box">
                          <div className="add-to-cart">
                            <Link
                              to={`/engagement-rings/start-with-a-setting?${"stock_num"}=${
                                item.stock_num
                              }`}
                            >
                              Choose this Diamond
                            </Link>
                            <span>
                              <Link to="javascript:void(0);">
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
                                        diamond,
                                        item.stock_num,
                                        item.total_sales_price,
                                        item.id
                                      );
                                    }}
                                  />
                                )}
                              </Link>
                            </span>
                          </div>
                        </div>
                        <div className="social-icons">
                          <ul>
                            <li>
                              <Link to="javascript:void(0);">
                                <Popup
                                  trigger={
                                    <Link to="javascript:void(0);">
                                      {" "}
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
                              <Link to="/contact">
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
                              {" "}
                              Order now and your order ships by {currentDay}
                              {currentMonth} {currentYear}, {formattedDate}{" "}
                              depending on center diamond.
                            </p>
                          </div>
                        </div>

                        <div className="drop-down-dimaond-details">
                          <ul>
                            <li>
                              <Link
                                to="javascript:void(0);"
                                onClick={() => toggleDiamond(1)}
                              >
                                <span> Diamond Details</span>
                                <span>
                                  {diamondDetails[1] ? (
                                    <IoIosArrowDown />
                                  ) : (
                                    <IoIosArrowUp />
                                  )}
                                </span>
                              </Link>
                              {diamondDetails[1] && (
                                <ul className="dimaond-details-sub-list">
                                  <li>Stock Number: {item.stock_num}</li>
                                  <li>Gemstone:Natural, untreated diamond</li>
                                  <li>Origin: {item.country}</li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setPriceOpen(!priceOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {priceOpen && (
                                        <div className="new-popups">
                                          <PricePopup
                                            setPriceOpen={setPriceOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Price: ${item.base_price}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setBankOpen(!bankOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {bankOpen && (
                                        <div className="new-popups">
                                          <BankPopup
                                            setBankOpen={setBankOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Bank Wire Price: $14,345
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setIsOpen(!isOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {isOpen && (
                                        <div className="new-popups">
                                          <CaratPopup setIsOpen={setIsOpen} />
                                        </div>
                                      )}
                                    </Link>
                                    Carat Weight: {item.size}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setCutOpen(!cutOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {cutOpen && (
                                        <div className="new-popups">
                                          <CutPopup setCutOpen={setCutOpen} />
                                        </div>
                                      )}
                                    </Link>
                                    Cut: {item.cut}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setColorOpen(!colorOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {colorOpen && (
                                        <div className="new-popups">
                                          <ColorPopup
                                            setColorOpen={setColorOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Color: {item.color}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() =>
                                        setClarityOpen(!clarityOpen)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                      {clarityOpen && (
                                        <div className="new-popups">
                                          <ClarityPopup
                                            setClarityOpen={setClarityOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Clarity: {item.clarity}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setMeasOpen(!measOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {measOpen && (
                                        <div className="new-popups">
                                          <MeasPopup
                                            setMeasOpen={setMeasOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Measurements: {item.measurement}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setTableOpen(!tableOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {tableOpen && (
                                        <div className="new-popups">
                                          <TablePopup
                                            setTableOpen={setTableOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Table: {item.table_percent}%
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setDepthOpen(!depthOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {depthOpen && (
                                        <div className="new-popups">
                                          <DepthPopup
                                            setDepthOpen={setDepthOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Depth: {item.depth_percent}%
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() =>
                                        setSymmetryOpen(!symmetryOpen)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                      {symmetryOpen && (
                                        <div className="new-popups">
                                          <SymmetryPopup
                                            setSymmetryOpen={setSymmetryOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Symmetry: {item.symmetry}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setPolishOpen(!polishOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {polishOpen && (
                                        <div className="new-popups">
                                          <PolishPopup
                                            setPolishOpen={setPolishOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Polish: {item.polish}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setGirdleOpen(!girdleOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {girdleOpen && (
                                        <div className="new-popups">
                                          <GirdlePopup
                                            setGirdleOpen={setGirdleOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Girdle: {item.girdle_condition}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setCuletOpen(!culetOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {culetOpen && (
                                        <div className="new-popups">
                                          <CuletPopup
                                            setCuletOpen={setCuletOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Culet: {item.culet_size}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setFloureOpen(!floureOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {floureOpen && (
                                        <div className="new-popups">
                                          <FlourePopup
                                            setFloureOpen={setFloureOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Flourescene: {item.flour_intensity}
                                  </li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => setShapeOpen(!shapeOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {shapeOpen && (
                                        <div className="new-popups">
                                          <ShapePopup
                                            setShapeOpen={setShapeOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Shape: {item.shape}
                                  </li>
                                </ul>
                              )}
                            </li>
                            <li>
                              <Link
                                to="javascript:void(0);"
                                onClick={() => toggleDiamond(2)}
                              >
                                <span> Certified By {item.lab}</span>
                                <span>
                                  {diamondDetails[2] ? (
                                    <IoIosArrowDown />
                                  ) : (
                                    <IoIosArrowUp />
                                  )}
                                </span>
                              </Link>
                              {diamondDetails[2] && (
                                <ul className="dimaond-details-sub-list">
                                  <li>
                                    <iframe
                                      src={item.cert_url}
                                      frameborder="0"
                                    ></iframe>
                                  </li>
                                </ul>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="luxury-conscience-wrapper">
              <div className="inner-wrapper">
                <div className="luxury-content">
                  <h4 className="heading-luxy">
                    Your Diamond’s Ethical Origins
                  </h4>
                  <p>Botswana Sort</p>
                  <div className="image-contents">
                    <img
                      src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/botswana-map.jpg"
                      alt=""
                    />
                    <p>
                      A ring that evokes the happiness of love and partnership
                      is even more joyful when you know that it was sustainably
                      sourced and mindfully produced. From our mission to our
                      unique jewelry designs, everything at Brilliant Earth is
                      held to exceptional standards.
                    </p>
                  </div>
                </div>
                <div className="luxury-drop">
                  <div className="order-left-details">
                    <div className="custom-order-faq ">
                      <h4>
                        <Link
                          to="javascript:void(0);"
                          onClick={() => toggleBanner(1)}
                        >
                          <span>
                            <ul className="grop-top-data">
                              <li>
                                <span className="drop-img-ring">
                                  <GiMapleLeaf />
                                </span>
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>
                                    Beyond Conflict Free <sup>TM</sup>
                                  </h5>
                                </span>
                                <span>
                                  Setting the standard in transparency for
                                  nearly two decades
                                </span>
                              </li>
                            </ul>
                          </span>
                          <span>
                            {banner[1] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                          </span>
                        </Link>
                      </h4>
                      {banner[1] && (
                        <div className="show-order-content">
                          <p>
                            Our commitment to transparency began with the Beyond
                            Conflict Free™ standard we pioneered. We select
                            diamonds for their ethical and environmentally
                            responsible origins, besting the industry standard
                            of merely “conflict free” — which is narrowly
                            defined as diamonds that finance wars against
                            legitimate governments. Our diamonds provide miners
                            with fair wages and safe working conditions, empower
                            their communities, and never fund wars.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="custom-order-faq ">
                      <h4>
                        <Link
                          to="javascript:void(0);"
                          onClick={() => toggleBanner(2)}
                        >
                          <span>
                            <ul className="grop-top-data">
                              <li>
                                <IoDiamond />
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>What Sets Us Apart</h5>
                                </span>
                                <span>Traceable diamond origins</span>
                              </li>
                            </ul>
                          </span>
                          <span>
                            {banner[2] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                          </span>
                        </Link>
                      </h4>
                      {banner[2] && (
                        <div className="show-order-content">
                          <p>
                            Brilliant Earth goes above and beyond the current
                            industry standards to offer diamonds that were
                            selected for their responsible origins. To improve
                            transparency and traceability, we have developed
                            chain of custody protocols for our natural diamonds
                            to promote tracking and identification of diamonds
                            from their countries of origin.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-your-mind-sec-main">
              <div className="main-head">
                <h3>The Four C’s of Your Diamond</h3>
              </div>
              <div className="cs-your-mind-sec-inner">
                <div className="cs-your-mind-sec">
                  <h4>Diamond Size: 1.27 Ct</h4>
                  <p>
                    The carat is the unit of weight of a diamond. Carat is often
                    confused with size even though it is actually a measure of
                    weight. One carat equals 200 milligrams or 0.2 grams. The
                    scale below illustrates the typical size relationship
                    between diamonds of increasing carat weights. Remember that
                    while the measurements below are typical, every diamond is
                    unique.
                  </p>
                  <Link to="javascript:void(0);" onClick={togglePopup}>
                    learn more
                  </Link>
                  {isOpen && (
                    <div className="new-popups">
                      <CaratPopup setIsOpen={setIsOpen} />
                    </div>
                  )}
                  <div class="diamond-size-box">
                    <div class="ir312-slider-bar ir312-slider-bar-carat">
                      <div
                        class="data h3 mb10"
                        data-toggle="carat-block"
                        data-carat="1.27"
                        style={{ left: "48.2674%" }}
                      >
                        <div class="nowrap">your diamond</div>
                        <span class="n">1.27 CT</span>
                      </div>
                      <ol>
                        <li class="fore1 fore"></li>
                        <li class="fore2 fore"></li>
                        <li class="fore3 fore"></li>
                        <li class="fore4 fore"></li>
                        <li class="fore5 fore"></li>
                        <li class="fore6 fore"></li>
                        <li class="fore7 fore"></li>
                        <li class="fore8 fore"></li>
                        <li class="fore9 fore"></li>
                      </ol>
                    </div>
                    <img
                      src="//css.brilliantearth.com/static/img/abtest/detail/diamond-size-ir312.jpg"
                      class="img-responsive"
                      alt="diamond size"
                    />
                  </div>
                </div>

                <div className="cs-your-mind-sec">
                  <h4>Cut: Super Ideal</h4>
                  <p>
                    The cut refers to the angles and proportions of a diamond.
                    The cut of a diamond - its form and finish, its depth and
                    width, the uniformity of the facets - determines its beauty.
                    The skill with which a diamond is cut determines how well it
                    reflects and refracts light.
                  </p>
                  <Link
                    to="javascript:void(0);"
                    onClick={() => setCutOpen(!cutOpen)}
                  >
                    learn more
                  </Link>
                  {cutOpen && (
                    <div className="new-popups">
                      <CutPopup setCutOpen={setCutOpen} />
                    </div>
                  )}
                  <div class="ir312-diamond-clarity-box">
                    <div class="pover-data">
                      <div class="item hidden">
                        <div class="data" style={{ left: "20%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "36%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "50%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "auto", right: 0 }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item ">
                        <div class="data" style={{ left: "auto", right: 0 }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="ir312-slider-bar ir312-slider-bar-cut">
                      <ol class="fs-13">
                        <li>
                          <span class="cut-level">
                            Poor
                            <br />{" "}
                            <em class="hidden-sm">
                              (not carried by Brilliant Earth)
                            </em>
                          </span>
                        </li>
                        <li>
                          <span class="cut-level"> Fair</span>
                        </li>
                        <li>
                          <span class="cut-level"> Good</span>
                        </li>
                        <li>
                          <span class="cut-level"> Very Good</span>
                        </li>
                        <li>
                          <span class="cut-level"> Ideal</span>
                        </li>
                        <li>
                          <span class="cut-level"> Super Ideal</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="cs-your-mind-sec">
                  <h4>Color: E</h4>
                  <p>
                    Color is the natural color visible in a diamond and does not
                    change over time. Colorless diamonds allow more light to
                    pass through than a colored diamond, releasing more sparkle
                    and fire. Acting as a prism, a diamond divides light into a
                    spectrum of colors and reflects this light as colorful
                    flashes called fire.
                  </p>
                  <Link
                    to="javascript:void(0);"
                    onClick={() => setColorOpen(!colorOpen)}
                  >
                    learn more
                  </Link>
                  {colorOpen && (
                    <div className="new-popups">
                      <ColorPopup setColorOpen={setColorOpen} />
                    </div>
                  )}
                  <div class="ir312-diamond-color-box ir312-diamond-fc-box">
                    <div class="data">
                      <div class="h4">
                        E: <span class="rank">Colorless</span>
                      </div>
                      <div class="description">
                        Only miniscule traces of color can be detected by an
                        expert gemologist - a rare, high quality diamond.
                      </div>
                    </div>
                    <span class="arrow" style={{ left: "9%" }}></span>
                    <img
                      src="//css.brilliantearth.com/static/img/abtest/detail/diamond-color-box-v2.jpg"
                      class="img-responsive"
                      alt="diamond color"
                    />
                  </div>
                </div>
                <div className="cs-your-mind-sec">
                  <h4>Clarity: IF</h4>
                  <p>
                    A diamond's clarity refers to the presence of impurities on
                    and within the stone. When a rough stone is extracted from
                    carbon deep beneath the earth, tiny traces of natural
                    elements are almost always trapped inside and are called
                    inclusions.
                  </p>
                  <Link
                    to="javascript:void(0);"
                    onClick={() => setClarityOpen(!clarityOpen)}
                  >
                    learn more
                  </Link>
                  {clarityOpen && (
                    <div className="new-popups">
                      <ClarityPopup setClarityOpen={setClarityOpen} />
                    </div>
                  )}
                  <div className="ir312-diamond-clarity-box">
                    <div className="pover-data">
                      <div className="item hidden">
                        <div className="data" style={{ left: "20%" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div className="data" style={{ left: "36%;" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div className="data" style={{ left: "50%;" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item ">
                        <div
                          className="data"
                          style={{ left: "auto", right: 0 }}
                        >
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div
                          className="data"
                          style={{ left: "auto", right: 0 }}
                        >
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                    </div>
                    <ol className="btm-slider-bar">
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">i1, i2, i3</div>
                          <span className="hidden-sm">
                            included
                            <br />{" "}
                            <em className="tt-n">
                              (not carried by Brilliant Earth)
                            </em>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">si1, si2</div>
                          <span className="hidden-sm">slightly included</span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">vs1, vs2</div>
                          <span className="hidden-sm">
                            very slightly included
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">vvs1, vvs2</div>
                          <span className="hidden-sm">
                            very very slightly included
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5"> if</div>
                          <span className="hidden-sm">internally flawless</span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5"> fl</div>
                          <span>Flawless</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="comapare-table">
              <div className="main-head">
                <h3>Compare Similar Diamonds</h3>
              </div>
              <div className="compare-similar-diamonds-wrap">
                <div className="compare-similar-diamonds-scroll">
                  <ul className="compare-similar-diamonds">
                    <li className="similar-item">
                      <ul className="similar-detail-list">
                        <li className="similar-span similar-headline"></li>
                        <li className="similar-span similar-img">
                          <img
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            width="100"
                            height="100"
                            className="img-responsive"
                            style={{ opacity: "0" }}
                            alt=""
                          />
                        </li>
                        <li className="similar-span">
                          Price:
                          <span className="sr-only"></span>
                        </li>

                        <li className="similar-span">
                          Difference:
                          <span className="sr-only"></span>
                        </li>

                        <li className="similar-span">
                          Shape:
                          <Link
                            className="iconfont iconfont-i td-n2"
                            to="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#shape-new"
                            data-mobile-access="ture"
                          >
                            <span className="sr-only">
                              <IoInformationCircleOutline />
                            </span>
                          </Link>
                        </li>
                        <li className="similar-span">
                          Carat:
                          <Link
                            className="iconfont iconfont-i td-n2"
                            to="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#carat-weight"
                            data-mobile-access="ture"
                            data-value="0.81"
                          >
                            <span className="sr-only">
                              <IoInformationCircleOutline
                                onClick={() => setIsOpen(!isOpen)}
                              />
                              {isOpen && (
                                <div className="new-popups">
                                  <CaratPopup setIsOpen={setIsOpen} />
                                </div>
                              )}
                            </span>
                          </Link>
                        </li>
                        <li className="similar-span">
                          Cut:
                          <Link
                            className="iconfont iconfont-i td-n2"
                            to="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#modal_cut"
                            data-mobile-access="ture"
                            data-value="Very Good"
                          >
                            <span className="sr-only">
                              <IoInformationCircleOutline
                                onClick={() => setCutOpen(!cutOpen)}
                              />
                              {cutOpen && (
                                <div className="new-popups">
                                  <CutPopup setCutOpen={setCutOpen} />
                                </div>
                              )}
                            </span>
                          </Link>
                        </li>
                        <li className="similar-span">
                          Color:
                          <Link
                            className="iconfont iconfont-i td-n2"
                            to="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#modal_color"
                            data-mobile-access="ture"
                            data-value="E"
                          >
                            <span className="sr-only">
                              <IoInformationCircleOutline
                                onClick={() => setColorOpen(!colorOpen)}
                              />
                              {colorOpen && (
                                <div className="new-popups">
                                  <ColorPopup setColorOpen={setColorOpen} />
                                </div>
                              )}
                            </span>
                          </Link>
                        </li>
                        <li className="similar-span">
                          Clarity:
                          <Link
                            className="iconfont iconfont-i td-n2"
                            to="javascript:void(0);"
                            data-toggle="modal"
                            data-target="#modal_clarity"
                            data-mobile-access="ture"
                            data-value="VS1"
                          >
                            <span className="sr-only">
                              <IoInformationCircleOutline
                                onClick={() => setClarityOpen(!clarityOpen)}
                              />
                              {clarityOpen && (
                                <div className="new-popups">
                                  <ClarityPopup
                                    setClarityOpen={setClarityOpen}
                                  />
                                </div>
                              )}
                            </span>
                          </Link>
                        </li>
                        <li className="similar-span"></li>
                      </ul>
                    </li>

                    <li className="similar-item">
                      <ul className="similar-detail-list">
                        <li className="similar-span similar-headline">
                          <span className="similar-block-headline">
                            More Sparkle
                          </span>
                        </li>
                        <li className="similar-span similar-img">
                          <img
                            src="//image.brilliantearth.com/media/cache/9b/7e/9b7eb6da2fcbe644c1b825f918b7e832.jpg"
                            width="100"
                            height="100"
                            className="img-responsive"
                            alt=""
                          />
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">$2,960</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">+$10</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Oval</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">0.81</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long up"></i>{" "}
                            Ideal
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">E</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">VS1</span>
                        </li>
                        <li className="similar-span view_detail">
                          <span className="similar-block">
                            <Link
                              to="javascript:void(0);"
                              data-diamond="23541680"
                              className="text-success td-u"
                            >
                              View
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </li>

                    <li className="similar-item">
                      <ul className="similar-detail-list">
                        <li className="similar-span similar-headline">
                          <span className="similar-block-headline">
                            Better Color
                          </span>
                        </li>
                        <li className="similar-span similar-img">
                          <img
                            src="//image.brilliantearth.com/media/cache/21/92/219264a7cd6bed1aa23b2f9913496422.jpg"
                            width="100"
                            height="100"
                            className="img-responsive"
                            alt=""
                          />
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">$3,390</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">+$440</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Oval</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long down"></i>
                            0.8
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Very Good</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long up"></i>{" "}
                            D
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">VS1</span>
                        </li>
                        <li className="similar-span view_detail">
                          <span className="similar-block">
                            <Link
                              to="javascript:void(0);"
                              data-diamond="21321897"
                              className="text-success td-u"
                            >
                              View
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </li>

                    <li className="similar-item">
                      <ul className="similar-detail-list">
                        <li className="similar-span similar-headline">
                          <span className="similar-block-headline">
                            Larger Diamond
                          </span>
                        </li>
                        <li className="similar-span similar-img">
                          <img
                            src="//image.brilliantearth.com/media/cache/79/f1/79f173dc9d971ae581bb95d2de6bc65a.jpg"
                            width="100"
                            height="100"
                            className="img-responsive"
                            alt=""
                          />
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">$3,170</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">+$220</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Oval</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long up"></i>{" "}
                            0.9
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Very Good</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">E</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">VS1</span>
                        </li>
                        <li className="similar-span view_detail">
                          <span className="similar-block">
                            <Link
                              to="javascript:void(0);"
                              data-diamond="14245484"
                              className="text-success td-u"
                            >
                              View
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </li>

                    <li className="similar-item">
                      <ul className="similar-detail-list">
                        <li className="similar-span similar-headline">
                          <span className="similar-block-headline">
                            Smaller with More Sparkle
                          </span>
                        </li>
                        <li className="similar-span similar-img">
                          <img
                            src="//image.brilliantearth.com/media/cache/be/c6/bec6a4a9a43fe2337303a24319ae5aa3.jpg"
                            width="100"
                            height="100"
                            className="img-responsive"
                            alt=""
                          />
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">$2,810</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">-$140</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">Oval</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long down"></i>
                            0.71
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">
                            <i className="iconfont iconfont-arrow-right-long up"></i>{" "}
                            Super Ideal
                          </span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">E</span>
                        </li>
                        <li className="similar-span">
                          <span className="similar-block">VS1</span>
                        </li>
                        <li className="similar-span view_detail">
                          <span className="similar-block">
                            <Link
                              to="javascript:void(0);"
                              data-diamond="24576132"
                              className="text-success td-u"
                            >
                              View
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
