import axios from "axios";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import {
  IoCallOutline,
  IoChatbubbleOutline,
  IoInformationCircleOutline
} from "react-icons/io5";
import { MdFamilyRestroom, MdMarkEmailRead } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../App";
import {
  addToCart,
  addToWishList,
  removeToWishlist
} from "../../../redux/action";
import { productList, productListCart } from "../../../redux/productAction";
import { DropHint } from "../../forntFiles/DropHint";
import { AverageDimensionsPopup } from "../popups/AverageDimensionsPopup";

export const GemstonesDetail = () => {
  const dispatch = useDispatch();
  const [diamondDetails, setDiamondDetails] = useState({});
  const [banner, setBanner] = useState({});
  const [open, setOpen] = useState(false);
  const [averagePopup, setAveragePopup] = useState(false);
  const [hiddenContent, setHiddencontent] = useState(false);
  const [data, setData] = useState([]);
  const {
    toggledProducts,
    setToggledProducts,
    localWishlist,
    setLocalWishlist,
  } = useContext(UserContext);

  const [removeWishList, setRemoveWishList] = useState();
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  const toggleDiamond = () => {
    setDiamondDetails(!diamondDetails);
  };

  const toggleBanner = (index) => {
    setBanner((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    if (averagePopup) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [averagePopup]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stock_num = queryParams.get("stock_num");
  console.log(stock_num);

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
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentDay = currentDate.getDate();
  const wishlist = useSelector((state) => state.wishlistData);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLocalWishlist(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist?.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

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

    console.log(gemstone_stock);
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
    console.log("data ring ", formData);
    const urlNew = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${formData.user_id}&product_type=${formData.product_type}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&gemstone_stock_no=${formData.gemstone_stock_no}`;
    console.log(urlNew);
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

  useEffect(() => {
    const fetchData = () => {
      const removeWish = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${removeWishList}`;
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

    debouncedFetchData();

    return () => debouncedFetchData.cancel(); // Cleanup
  }, [removeWishList]);

  function handleWishlistRemove(belowItem) {
    wishlist.forEach((item) => {
      console.log(item.item?.id, "=========", belowItem?.id);
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

    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      console.log(item, belowItem);
      if (belowItem?.stock_num === item?.gemstone_id) {
        setRemoveWishList(item?.id);
      }
    });
  }
  const user_id = localStorage.getItem("formData");
  const ring_data = "gemstone";

  const handleCreateAccount = async (
    userId,
    gemstone_id,
    gemstone_price,
    item,
    gemstone_stock_no,
    ony_gemstone
  ) => {
    dispatch(
      addToCart({
        item,
        product_type: ring_data,
        uniqueId: uuidv4(),
      })
    );

    const formData = {
      user_id: userId,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      gemstone_stock_no: gemstone_stock_no,
      product_type: ony_gemstone,
    };

    localStorage.setItem("cart_data", JSON.stringify(formData));
    const savedWishlist = JSON.parse(localStorage.getItem("cart_data")) || [];

    console.log("============================", savedWishlist);
    var newApi = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cart?user_id=${formData.user_id}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&gemstone_stock_no=${formData.gemstone_stock_no}&product_type=${formData.product_type}`;
    console.log(newApi);

    axios
      .get(newApi, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": tokenData,
        },
      })
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

  // ===================get wishList all data
  // useEffect(() => {
  //   const fetchData = debounce(async () => {
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
  return (
    <>
      <div className="sticky-right-column final-ring">
        <div className="container">
          {/* ====================create your ring start */}
          <div className="main-btn-setting">
            <div className="ring Create-Your-Ring">
              <span>Design Your Ring</span>
              <div className="arrow-shape">{/* arrow design */}</div>
            </div>

            <div className="ring Choose-Setting">
              <Link to="javascript:void(0);">
                <span className="step-counting">1</span>
                {data.map((item) => {
                  return (
                    <>
                      <div className="image-of-gemstone">
                        <img src={item.image_url} alt="" />
                      </div>
                      <div className="gemstone-detail-banner">
                        <div className="setting step-heading">Gemstone</div>
                        <div className="name-of-gemstone">
                          {item.shape} - ${item.total_sales_price}
                        </div>
                        <div className="change">
                          <Link to="/engagement-rings/start-with-a-gemstone">
                            Change
                          </Link>
                        </div>
                      </div>

                      <div className="arrow-shape">{/* arrow design */}</div>
                    </>
                  );
                })}
              </Link>
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
                  <Link
                    to={`/engagement-rings/start-with-a-setting/?stock_num=${stock_num}`}
                  >
                    Browse Setting
                  </Link>
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
          <div className="sticky-right-column">
            <div className="sticky-inner-main">
              {data.map((item) => {
                return (
                  <>
                    <div className="left-product-images left-product-details">
                      <ul className="product-list-thumbnail">
                        <li>
                          <img src={item.image_url} alt="" />
                        </li>
                        <li>
                          <img src={item.image_url} alt="" />
                        </li>
                        <li>
                          <img
                            src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/DiamondHand.png"
                            alt=""
                          />
                        </li>
                      </ul>
                      <div className="main-zoom-iamge">
                        <img src={item.image_url} alt="" />
                      </div>
                    </div>
                    <h1>shamsher </h1>
                    <div className="right-product-content ">
                      <h4 className="heading-four">
                        9x7mm {item.color} {item.shape} Lab Grown Sapphire
                      </h4>
                      <div className="seleted-items-purchage">
                        <div className="setting-price-main">
                          <p className="setting-only-price">
                            <span id="title_price">
                              ${item.total_sales_price}
                            </span>
                          </p>
                          <p>
                            <span>Only {item.available} Available</span>
                          </p>
                          <p className="right-product-content-gemstones">
                            This 9.0 x 7.0 mm {item.color} {item.shape} Lab
                            Grown Sapphire has been hand selected by our{" "}
                            {item.lab}-certified gemologists for its exceptional
                            characteristics and rarity.
                          </p>
                        </div>
                        <div className="selected-inner-pair caret-rounded">
                          <div className="left-icon-image">
                            <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/BlackRing.png" />
                          </div>
                          <div className="right-purchage-icon-content">
                            <h4 className="media-heading">LAST DAY!</h4>
                            <p className="media-text">
                              Free Diamond Jewellery <br />
                              With Purchase Over $1,000
                            </p>
                          </div>
                        </div>
                        <div className="purchage-select-box">
                          <div className="add-to-ring-bag">
                            <Link
                              to={`/engagement-rings/start-with-a-setting?stock_num=${item.stock_num}`}
                            >
                              Add To Ring
                            </Link>
                            <Link
                              to={"/cart"}
                              onClick={() =>
                                handleCreateAccount(
                                  user_id ? user_id : null,
                                  item.stock_num,
                                  item.total_sales_price,
                                  item,
                                  item.id,
                                  "ony_gemstone"
                                )
                              }
                            >
                              Add To Bag
                            </Link>

                            <span>
                              <Link to="#">
                                {toggledProducts[item?.id] ? (
                                  <IoMdHeart
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleWishlistRemove(item);
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
                                        "gemstone",
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
                              Order now and your order ships by {currentDay},{" "}
                              {currentMonth} {currentDay}
                            </p>
                          </div>
                        </div>

                        <div className="drop-down-dimaond-details">
                          <ul>
                            <li>
                              <Link
                                to="javascript:void(0);"
                                onClick={() => toggleDiamond()}
                              >
                                <span> Gemstone Details</span>
                                <span>
                                  {diamondDetails ? (
                                    <IoIosArrowDown />
                                  ) : (
                                    <IoIosArrowUp />
                                  )}
                                </span>
                              </Link>
                              {diamondDetails && (
                                <ul className="dimaond-details-sub-list">
                                  <li>Stock Number: {item.stock_num}</li>
                                  <li>Gemstone: Sapphire</li>
                                  <li>Origin: Lab Grown</li>
                                  <li>Shape: {item.shape}</li>
                                  <li>
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() =>
                                        setAveragePopup(!averagePopup)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    {averagePopup && (
                                      <div className="new-popups">
                                        <AverageDimensionsPopup
                                          setAveragePopup={setAveragePopup}
                                        />
                                      </div>
                                    )}
                                    Average Dimensions: 9.0 x 7.0 mm
                                  </li>
                                  <li>Color: Intense {item.color}</li>
                                  <li>Clarity: Eye Clean</li>
                                </ul>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="luxury-conscience-wrapper">
              <div className="inner-wrapper">
                <div className="gemstone-luxury-content">
                  <h4 className="gemstone-heading-luxy">
                    Responsible Gemstone Origins
                  </h4>
                  <p>A Better Standard</p>
                  <div className="gemstone-detail-image-contents">
                    <p>
                      Lab grown gemstones are made of the same chemical crystal
                      as mined gemstones and exhibit the same sparkle and
                      beauty. Because they are grown in controlled environments
                      using advanced technology, they require no mining to
                      produce. Their origins are therefore traceable and
                      responsible.
                      <Link
                        to="javascript:void(0);"
                        onClick={() => setHiddencontent(true)}
                      >
                        {hiddenContent ? null : <span>...Read More</span>}
                      </Link>{" "}
                      {hiddenContent && (
                        <p>
                          {" "}
                          Compared with mined gemstones, lab grown gemstones
                          have a smaller carbon footprint and result in less
                          environmental impact. Fine jewelry made with lab grown
                          gemstones and recycled precious metals provides a
                          responsible choice.
                        </p>
                      )}
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
                                  <MdFamilyRestroom />
                                </span>
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>Giving Back</h5>
                                </span>
                                <span>
                                  Comparison at our core since day one
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
                            From mines to Main Street, we care about building
                            better communities by compassionately giving back.
                            In 2021, we started the Brilliant Earth Foundation
                            to focus and amplify our impact. Since then, we’ve
                            donated $2 million towards leaving communities
                            better than we found them – from the areas where
                            precious materials are mined to the communities
                            where our team and customers live.
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
                                <SlLocationPin />
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>Responsible Gemstone Origin</h5>
                                </span>
                                <span>A Better Standard</span>
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
                            We strive to offer gemstones sourced in alignment
                            with safe working conditions and environmentally
                            responsible principles. By continually working with
                            our colored gemstone suppliers to improve standards
                            and traceability, we work to promote higher
                            standards for gemstone sourcing to transform
                            dangerous mining conditions and encourage
                            responsible practices.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="browse-similar-gemstones">
              <p>Browse Similar Gemstones</p>
              <div className="similar-gemstones">
                <div className="gemstone-inner-main">
                  <Link to="/gemstones-detail">
                    <div className="diamoond-gems">
                      <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Alexandrite.png" />
                      <div className="dia-gems">
                        <CiHeart />
                      </div>
                    </div>
                    <div className="gems-limit">
                      <Link to="javascript:void(0);">
                        <div className="limit">
                          <p>9x7mm Super Premium Oval Moissanite</p>
                        </div>
                        <p className="">$1,350</p>
                      </Link>
                    </div>
                  </Link>
                </div>
                <div className="gemstone-inner-main">
                  <Link to="/gemstones-detail">
                    <div className="diamoond-gems">
                      <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Aquamrine.png" />
                      <div className="dia-gems">
                        <CiHeart />
                      </div>
                    </div>
                    <div className="gems-limit">
                      <Link to="javascript:void(0);">
                        <div className="limit">
                          <p>9x7mm Super Premium Oval Moissanite</p>
                        </div>
                        <p className="">$1,350</p>
                      </Link>
                    </div>
                  </Link>
                </div>
                <div className="gemstone-inner-main">
                  <Link to="/gemstones-detail">
                    <div className="diamoond-gems">
                      <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Emrald.png" />
                      <div className="dia-gems">
                        <CiHeart />
                      </div>
                    </div>
                    <div className="gems-limit">
                      <Link to="javascript:void(0);">
                        <div className="limit">
                          <p>9x7mm Super Premium Oval Moissanite</p>
                        </div>
                        <p className="">$1,350</p>
                      </Link>
                    </div>
                  </Link>
                </div>
                <div className="gemstone-inner-main">
                  <Link to="/gemstones-detail">
                    <div className="diamoond-gems">
                      <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Lab-colored-diomend.png" />
                      <div className="dia-gems">
                        <CiHeart />
                      </div>
                    </div>
                    <div className="gems-limit">
                      <Link to="javascript:void(0);">
                        <div className="limit">
                          <p>9x7mm Super Premium Oval Moissanite</p>
                        </div>
                        <p className="">$1,350</p>
                      </Link>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
