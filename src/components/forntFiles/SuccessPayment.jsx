import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../App";
import {
  addToWishList,
  removeToCart,
  setCartDetails,
  setWishlistDetails,
} from "../../redux/action";
import { validateEmail } from "./ValidationFunctions";
import LoaderSpinner from "../LoaderSpinner";

export const SuccessPayment = () => {
  const dispatch = useDispatch();
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");
  // const cartDetails = useSelector((state) => state.cartReducer);

  console.log(order_id);
  const [down, setDown] = useState(false);
  const [againDown, setAgainDown] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [tax, setTax] = useState("TBD");
  const [count, setCount] = useState(1);
  const [removeWishList, setRemoveWishList] = useState();
  const [shapeData, setShapeData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => setMessage(event.target.value);
  const cartData = useSelector((state) => state.cartData);
  const cartDetails = useSelector((state) => state.cartReducer);
  const wishListDataBase = useSelector((state) => state.wishlistReducer);
  const [orderId, setOrderId] = useState();
  const [metalColor, setMetalColor] = useState([]);
  console.log(orderId);
  const handleSaveMessage = () => {
    if (message.trim() !== "") {
      setShowMessage(true);
      setDown(false);
    } else {
      setDown(false);
    }
  };

  const handleEditMessage = () => {
    setDown(true);
    setShowMessage(false);
  };

  const handleDeleteMessage = () => {
    setMessage("");
    setShowMessage(false);
  };

  function handleIncrement() {
    if (count > 1) {
      setCount(count - 1);
    } else {
      return 1;
    }
  }

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

  const removeProduct = (item) => {
    dispatch(removeToCart(item));
  };
  const calculateTotalPrice = () => {
    let total = 0;

    cartData?.forEach((item) => {
      total +=
        parseFloat(item.ringPrice || 0) +
        parseFloat(item.diamondItem?.total_sales_price || 0) +
        parseFloat(item.gemstone?.total_sales_price || 0) +
        parseFloat(item.gemstoneSingle?.total_sales_price || 0) +
        parseFloat(item.diamonds?.total_sales_price || 0) +
        parseFloat(item.item?.total_sales_price || 0);
    });
    return total;
  };
  let isDuplicate;
  let hasDuplicates;

  const wishlist = useSelector((state) => state.wishlistData);
  const {
    setDiamondRingToggle,
    diamondRingLocal,
    setDiamondRingLocal,
    setToggledProducts,
    localWishlist,
    setLocalWishlist,
  } = useContext(UserContext);

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
    const savedWishlist =
      JSON.parse(localStorage.getItem("ring-diamond")) || [];
    setDiamondRingLocal(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist?.forEach((item) => {
      initialToggledProducts[item.diamond?.id] = true;
    });
    setDiamondRingToggle(initialToggledProducts);
  }, [setDiamondRingToggle]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);
  useEffect(() => {
    localStorage.setItem("ring-diamond", JSON.stringify(diamondRingLocal));
  }, [diamondRingLocal]);

  function handleWishlistItem(item, diamond, removingItem, product_type) {
    const newItem = {
      item,
      diamond,
      uniqueId: uuidv4(),
      product_type: product_type,
      removingItem,
    };
    dispatch(removeToCart(removingItem));
    dispatch(addToWishList(newItem));
    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [diamond?.id]: true,
    }));
    setDiamondRingLocal([...diamondRingLocal, newItem]);
  }

  function handleWishlistGemstone(item) {
    dispatch(addToWishList(item));
    dispatch(removeToCart(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    setLocalWishlist([...localWishlist, item]);
  }

  function handleWishDataDiamonds(item) {
    dispatch(addToWishList(item));
    dispatch(removeToCart(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.diamonds?.id]: true,
    }));

    setLocalWishlist([...localWishlist, item]);
  }

  // =======remove to card
  useEffect(() => {
    axios
      .get(
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove-cartitem/${removeWishList}`
      )
      .then((res) => {
        console.log("=====", res.data);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, [removeWishList]);
  // ==================
  // =======================
  const userId = localStorage.getItem("formData");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/getcart-items?user_id=${userId}`,

            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": shapeData,
              },
            }
          );

          if (response.status === 200) {
            console.log(
              "=================get card item details",
              response.data
            );
            dispatch(setCartDetails(response.data));
          } else {
            console.error("Error Status:", response.status);
          }
        } else {
          console.log(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [setCartDetails, cartData]);
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
  // ========================end
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
  // =============
  // =============
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/metalcolor"
      )
      .then((res) => {
        setMetalColor(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  const calculateTotalPriceDatabase = () => {
    let total = 0;
    cartDetails?.forEach((item) => {
      total +=
        parseFloat(item?.ring_price || 0) +
        parseFloat(item?.diamond_price || 0) +
        parseFloat(item.gemstone_price || 0);
    });
    return total;
  };
  // const calculateTotalPrice = () => {
  //   let total = 0;
  //   cartDetails.forEach((item) => {
  //     total += parseFloat(item?.ring_price) + parseFloat(item?.diamond_price) + parseFloat(item?.gemstone_price);
  //   });
  //   return total;
  // };

  const handleWishlist = async (
    product_type,
    user_id,
    gemstone_id,
    gemstone_price,
    ring_id,
    ring_color,
    img_sku,
    ring_price,
    diamond_id,
    diamond_price
  ) => {
    try {
      // Construct URL for API call
      const apiUrl = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${user_id}&gemstone_price=${gemstone_price}&gemstone_id=${gemstone_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${img_sku}&ring_price=${ring_price}&diamond_id=${diamond_id}&diamond_price=${diamond_price}`;
      // Make API call
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": shapeData,
        },
      });

      if (response.status === 200) {
        console.log("Wishlist item added successfully:", response.data.res);
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

  const handleRemoveItem = (itemId, ring_id) => {
    const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
    // setCartDetails(updatedItems);
    dispatch(setCartDetails(updatedItems));
    setRemoveWishList(itemId);

    cartData?.map((item) => {
      if ((item.item?.id || item.ring_data?.id) === ring_id) {
        dispatch(removeToCart(item));
      }
    });
  };
  const handleRemoveItemCart = (itemId, ring_id) => {
    const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
    console.warn(updatedItems);
    dispatch(setCartDetails(updatedItems));
    const removedItem = cartDetails.find((item) => item?.id === itemId);

    // If the removed item exists, add it to the wishlist
    if (removedItem) {
      dispatch(setWishlistDetails([...wishListDataBase, removedItem]));
      setRemoveWishList(itemId);
    }

    cartData?.map((item) => {
      if ((item.item?.id || item.diamonds?.id) === parseInt(ring_id)) {
        dispatch(removeToCart(item));
        dispatch(addToWishList(item));

        if (item.diamond) {
          setDiamondRingToggle((prevState) => ({
            ...prevState,
            [item.diamond?.id]: true,
          }));
          setDiamondRingLocal([...diamondRingLocal, item]);
          setDiamondRingLocal([...diamondRingLocal, item]);
        } else {
          setToggledProducts((prevState) => ({
            ...prevState,
            [item.diamonds?.id || item.item?.id]: true,
          }));

          setLocalWishlist([...localWishlist, item]);
        }
      }
    });
  };
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, []);
  function validateWhishList() {
    validateEmail(
      document.getElementById("order-email").value,
      "order-email",
      "Email Address"
    );
  }
  useEffect(() => {
    axios
      .get(
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/order-detail?order_id=${order_id}`
      )
      .then((res) => {
        setOrderId(res.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  const productCartId = [];
  cartDetails?.forEach((item) => {
    productCartId.push(item?.id);
  });
  const jsonObject = {};
  productCartId?.forEach((value, index) => {
    jsonObject[index.toString()] = value;
  });

  const jsonString = JSON.stringify(jsonObject);

  let jsonStringNew = JSON.parse(jsonString);

  const itemIdsArray = Object.values(jsonStringNew);
  console.log(itemIdsArray.join(","));

  // =============
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/metalcolor"
      )
      .then((res) => {
        setMetalColor(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  return (
    <>
      {userId ? (
        <div className="shoping-car-page data-base-cart success-page-order">
          <div className="container">
            <div className="success-order">
              <div className="success-order-left">
                <div className="order-confirmed">
                  <h3 className="confirmation">Your Order Is Confirmed</h3>
                  <h5 className="orderId-confirm">Order #: {order_id}</h5>
                  <p className="order-para-confirmed">
                    Thank you for choosing Brilliant Earth. A representative
                    will contact you within 24 hours to assist you with
                    completing your purchase. Your order details will be emailed
                    to you at abc@gmail.com. Please note that your order will be
                    processed only after payment has been made. If you have any
                    questions, please call us at 800-691-0952.
                  </p>
                </div>
                <hr />
                {
                  loader ? (
                    <LoaderSpinner/>
                  ):(
                    orderId?.order_details?.address?.map((item) => {
                      console.log(item);
                      let addressType;
                      if (item?.address_type === "billing_address") {
                        addressType = "billing address";
                        console.log("billing address");
                      } else if (item?.address_type === "shipping_address") {
                        addressType = "shipping address";
                        console.log("shipping address");
                      } else {
                        addressType = "shipping address";
                        console.log("both");
                      }
    
                      return (
                        <div className="shipping-address-payment" key={item?.id}>
                          <div className="shipping-address-left">
                            <h2>{addressType}</h2>
                            {item?.address_type == "both" && (
                              <h4>billing address same as shipping address</h4>
                            )}
                            <p className="user-information-order">
                              {item?.first_name} {item?.last_name} <br />
                              {item?.city} {item?.country} <br />
                              {item?.email} <br />
                              {item?.phone}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )
                }
                

                <hr />
                <div className="payment-order-details">
                  <h3 className="order-details-heading">Order Details</h3>
                  <p className="order-details-ship">
                    Ships by Wednesday, May 15 via FedEx. <br />
                    Delivery date may vary based on receipt of payment. <br />
                    Shipping and customs processing times vary based on
                    location.
                  </p>
                </div>
{
  loader ? (
    <LoaderSpinner/>
  ) : (
    orderId?.data?.length > 0 &&
      orderId?.data?.map((item) => {
        let ring_details;
        let diamond_details;
        let gemstone_details;

        if (item?.ring_detail) {
          try {
            ring_details = JSON.parse(item.ring_detail);
            // Further processing of the parsed JSON data
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error(
            "The ring_detail property is empty or undefined."
          );
        }
        if (item?.diamond_detail) {
          try {
            diamond_details = JSON.parse(item.diamond_detail);
            // Further processing of the parsed JSON data
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error(
            "The ring_detail property is empty or undefined."
          );
        }
        if (item?.gemstone_detail) {
          try {
            gemstone_details = JSON.parse(item.gemstone_detail);
            // Further processing of the parsed JSON data
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error(
            "The ring_detail property is empty or undefined."
          );
        }
        // Ring and diamond
        if (ring_details != null && diamond_details != null) {
          return (
            <>
              <div className="shop-card-inner diamond-ring ">
                <div className="product-pic ring-only">
                  <div className="diamond-ring-img-text">
                    <Link to="#">
                      <ul className="product-list">
                        <img
                          src={ring_details?.ring_image}
                          alt=""
                        />
                      </ul>
                    </Link>
                  </div>
                  <div className="product-info-inner">
                    <div className="product-info-left">
                      <h2>
                        <Link
                          to="javascript:void(0)"
                          className="td-n2"
                        >
                          {ring_details?.ring_name}
                        </Link>
                      </h2>

                      <div className="ir245-muted">
                        <div className="code">
                          {ring_details?.ring_style}
                        </div>
                      </div>
                    </div>

                    <div className="ring-size">
                      <span>Ring Size : </span>{" "}
                      <span>{ring_details?.ring_size}</span>
                    </div>
                  </div>
                  <div className="product-ring-price">
                    <span
                      style={{ whiteSpace: "nowrap" }}
                      id="prodcut_price_17566554"
                    >
                      ${ring_details?.ring_price}
                    </span>
                  </div>
                </div>

                <div className="product-info diamond-only">
                  <div className="checkout-name-description">
                    <div className="diamond-text-img">
                      <img
                        src={diamond_details?.diamond_image}
                        alt=""
                      />
                    </div>
                    <div className="checkout-left-des diamond-name">
                      <p>
                        <Link to="#">
                          {diamond_details?.diamond_size} Carat{" "}
                          {diamond_details?.diamond_shape} Diamond
                        </Link>
                      </p>
                      <p className="small-text">
                        {diamond_details?.diamond_cut} Cut,{" "}
                        {diamond_details?.diamond_color} Color,{" "}
                        {diamond_details?.diamond_clarity} Clarity
                      </p>
                      <p className="small-text">5587475AB</p>
                      <div className="available-list">
                        <p>
                          <span>
                            <IoIosStar />
                          </span>
                          Only {diamond_details?.available}{" "}
                          Available
                        </p>
                      </div>
                    </div>
                    <div className="checkout-right-price diamond-price">
                      <p>${diamond_details?.diamond_price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
        // Ring and gemstone
        if (ring_details != null && gemstone_details != null) {
          return (
            <>
              <div className="ring-gemstone-description shop-card-inner gemstone">
                <div className="product-pic ring-only">
                  <div className="diamond-ring-img-text">
                    <Link to="#">
                      <ul className="product-list">
                        <img
                          src={ring_details?.ring_image}
                          alt=""
                        />
                      </ul>
                    </Link>
                  </div>
                  <div className="product-info-inner">
                    <div className="product-info-left">
                      <h2>
                        <Link
                          to="javascript:void(0)"
                          className="td-n2"
                        >
                          {ring_details?.ring_name}
                        </Link>
                      </h2>

                      <div className="ir245-muted">
                        <div className="code">
                          {ring_details?.ring_style}
                        </div>
                      </div>
                    </div>

                    <div className="ring-size">
                      <span>Ring Size : </span>{" "}
                      <span>{ring_details?.ring_size}</span>
                    </div>
                  </div>
                  <div className="product-ring-price">
                    <span
                      style={{ whiteSpace: "nowrap" }}
                      id="prodcut_price_17566554"
                    >
                      ${ring_details?.ring_price}
                    </span>
                  </div>
                </div>
                <div className="product-info gemstone-only">
                  <div className="gemstone-cart">
                    <div className="gemstone-img-text">
                      <img
                        src={gemstone_details?.gemstone_image}
                        alt=""
                      />
                    </div>

                    <div className="gemstone-name">
                      <p>{gemstone_details.gemstone_name}</p>
                    </div>
                    <div className="gemstone-price">
                      <p>${gemstone_details.gemstone_price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
        // Only diamond
        if (
          diamond_details != null &&
          ring_details == null &&
          gemstone_details == null
        ) {
          console.log(diamond_details);
          return (
            <div className="product-info diamond-only">
              <div className="checkout-name-description">
                <div className="diamond-text-img">
                  <img
                    src={diamond_details?.diamond_image}
                    alt=""
                  />
                </div>
                <div className="checkout-left-des diamond-name">
                  <p>
                    <Link to="#">
                      {diamond_details?.diamond_size} Carat{" "}
                      {diamond_details?.diamond_shape} Diamond
                    </Link>
                  </p>
                  <p className="small-text">
                    {diamond_details?.diamond_cut} Cut,{" "}
                    {diamond_details?.diamond_color} Color,{" "}
                    {diamond_details?.diamond_clarity} Clarity
                  </p>
                  <p className="small-text">5587475AB</p>
                  <div className="available-list">
                    <p>
                      <span>
                        <IoIosStar />
                      </span>
                      Only {diamond_details?.available} Available
                    </p>
                  </div>
                </div>
                <div className="checkout-right-price diamond-price">
                  <p>${diamond_details?.diamond_price}</p>
                </div>
              </div>
            </div>
          );
        }
        // Only gemstone
        if (
          gemstone_details != null &&
          ring_details == null &&
          diamond_details == null
        ) {
          return (
            <div className="product-info gemstone-only">
              <div className="gemstone-cart">
                <div className="gemstone-img-text single-gemstone">
                  <img
                    src={gemstone_details?.gemstone_image}
                    alt=""
                  />
                </div>

                <div className="gemstone-name">
                  <p>{gemstone_details.gemstone_name}</p>
                </div>
                <div className="gemstone-price">
                  <p>${gemstone_details.gemstone_price}</p>
                </div>
              </div>
            </div>
          );
        }
      })
  )
}
                

                <div className="sign-up-email-order">
                  <h3 className="order-details-heading">Sign Up For Email</h3>
                  <div className="emai-news-order">
                    <div className="brilliant-news">
                      <p>Send me Brilliant Earth news, updates and offers.</p>
                    </div>
                    <div className="reset-forms wishlist-acct">
                      <form action="" className="form-inline">
                        <div className="input-group">
                          <input
                            type="text"
                            className="zip-code"
                            placeholder="your Email Address"
                            name="email"
                            id="order-email"
                            onChange={(e) =>
                              validateEmail(
                                e.target.value,
                                "order-email",
                                "Email Address"
                              )
                            }
                          />
                          <div className="error_1"></div>
                          <span className="input-group-btn">
                            <button
                              type="button"
                              className="view-menu"
                              onClick={validateWhishList}
                            ></button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="refer-friend-box">
                  <h5>Give $100, Get $100</h5>
                  <p className="refer-friend-para">
                    Treat your friends to $100 and receive $100 towards your
                    next purchase when they spend $1,000 or more.
                  </p>
                  <Link to="#">Refer a Friend</Link>
                </div>
              </div>
              <div className="success-order-right">
                <Link to="#">Print Receipt</Link>
              </div>
            </div>

            {/* =========== */}

            <div className="wishlist-shopping">
              <div className="category-tiles">
                <h3>Continue Shopping</h3>
              </div>
              <div className="wishlist-shoping-inner">
                <div className="category-tiles-box">
                  <div className="wisher-imager">
                    <img src="/images/diamond.jpg" alt="" />
                  </div>
                  <div className="category-title">
                    <h4>Engagement Rings</h4>
                  </div>
                </div>
                <div className="category-tiles-box">
                  <div className="wisher-imager">
                    <img src="/images/ring.jpg" alt="" />
                  </div>
                  <div className="category-title">
                    <h4>Wedding Rings</h4>
                  </div>
                </div>
                <div className="category-tiles-box">
                  <div className="wisher-imager">
                    <img src="/images/rings.jpg" alt="" />
                  </div>
                  <div className="category-title">
                    <h4>Gemstone Rings</h4>
                  </div>
                </div>
                <div className="category-tiles-box">
                  <div className="wisher-imager">
                    <img src="/images/chain.jpg" alt="" />
                  </div>
                  <div className="category-title">
                    <h4>Fine Jewelry</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
