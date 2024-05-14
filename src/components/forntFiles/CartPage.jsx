import React, { useContext, useEffect, useState } from "react";
import { IoIosClose, IoIosStar, IoMdHeart } from "react-icons/io";
import { RiTruckFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { IoCallOutline, IoPricetagOutline } from "react-icons/io5";
import { CiGift, CiHeart } from "react-icons/ci";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi2";
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeToCart,
  removeToWishlist,
  setCartDetails,
  setWishlistDetails,
} from "../../redux/action";
import cartData from "../../redux/reducer";
import { v4 as uuidv4 } from "uuid";
import { FaExclamationCircle } from "react-icons/fa";
import { UserContext } from "../../App";
import { GiBigDiamondRing } from "react-icons/gi";
import LoaderSpinner from "../LoaderSpinner";
import Select from "react-select";
import { productList, productListCart } from "../../redux/productAction";

export const CartPage = () => {
  const dispatch = useDispatch();
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const listColor = queryParams.get("color");
  const diamond_original = queryParams.get("diamond_original");
  const [labGrownDetails, setLabGrownDetails] = useState();
  const [down, setDown] = useState(false);
  const [againDown, setAgainDown] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [tax, setTax] = useState("TBD");
  const [count, setCount] = useState(1);
  const [removeCartItem, setRemoveCartItem] = useState();
  const [shapeData, setShapeData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => setMessage(event.target.value);
  const cartData = useSelector((state) => state.cartData);
  const cartDetails = useSelector((state) => state.productDataCart);
  const wishListDataBase = useSelector((state) => state.wishlistReducer);
  const user_id = localStorage.getItem("formData");
  console.log(cartData);
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
  // =============
  const [metalColor, setMetalColor] = useState([]);
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

  const removeProduct = (item) => {
    dispatch(removeToCart(item));
  };
  const calculateTotalPrice = () => {
    let total = 0;

    cartData.forEach((item) => {
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
    savedWishlist.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("ring-diamond")) || [];
    setDiamondRingLocal(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist.forEach((item) => {
      console.log(item);
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
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove-cartitem/${removeCartItem}`
      )
      .then((res) => {
        console.log("=====", res.data);
        dispatch(productListCart());
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, [removeCartItem]);
  // ==================
  // =======================
  const userId = localStorage.getItem("formData");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (userId) {
  //         const response = await axios.get(
  //           `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/getcart-items?user_id=${userId}`,

  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": shapeData,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log(
  //             "=================get card item details",
  //             response.data
  //           );
  //           dispatch(setCartDetails(response.data));
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

  //   fetchData();
  // }, [setCartDetails, cartData]);
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
    cartDetails.forEach((item) => {
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
    diamond_price,
    ring_type,
    ring_size,
  ) => {
    try {
      // Construct URL for API call
      const apiUrl = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${user_id}&gemstone_price=${gemstone_price}&gemstone_id=${gemstone_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${img_sku}&ring_price=${ring_price}&diamond_id=${diamond_id}&diamond_price=${diamond_price}&ring_type=${ring_type}&ring_size=${ring_size}`;
      // Make API call
      console.log(apiUrl);
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": shapeData,
        },
      });

      if (response.status === 200) {
        console.log("Wishlist item added successfully:", response.data.res);
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

  const handleRemoveItem = (itemId, ring_id) => {
    const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
    // setCartDetails(updatedItems);
    // dispatch(setCartDetails(updatedItems));
    setRemoveCartItem(itemId);

    cartData.map((item) => {
      console.log(item.ring_data?.id, "dkljslf", ring_id);
      if ((item.item?.id || item.ring_data?.id) === ring_id) {
        dispatch(removeToCart(item));
      }
    });
  };
  const handleRemoveItemCart = (itemId, ring_id) => {
    const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
    console.warn(updatedItems);
    // dispatch(setCartDetails(updatedItems));
    const removedItem = cartDetails.find((item) => item?.id === itemId);

    // If the removed item exists, add it to the wishlist

    // dispatch(setWishlistDetails([...wishListDataBase, removedItem]));
    dispatch(productList());
    setRemoveCartItem(itemId);

    cartData.map((item) => {
      console.log(item, "dkljslf", ring_id);
      if (
        (item.item?.id || item.diamonds?.id || item?.ring_data?.id) ===
        parseInt(ring_id)
      ) {
        dispatch(removeToCart(item));
        dispatch(addToWishList(item));

        if (item.diamond) {
          setDiamondRingToggle((prevState) => ({
            ...prevState,
            [item.diamond?.id]: true,
          }));
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

  // ============ price  lab_grown =======================//
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/get_product_price?product_sku=${
  //         filterData.product?.sku
  //       }&metalType=${
  //         listColor === "Platinum" ? "Platinum" : "18kt"
  //       }&metalColor=${
  //         filterData.product?.metalColor
  //       }&diamond_type=${diamond_original}`
  //     )

  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log(response.data.data.price);
  //         setLabGrownDetails(response.data.data);
  //       } else {
  //         console.error("Error Status:", response.status);
  //       }
  //     })

  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [
  //   filterData.product?.sku,
  //   listColor,
  //   filterData.product?.metalColor,
  //   diamond_original,
  // ]);

  return (
    <>
      {userId ? (
        <div className="shoping-car-page data-base-cart">
          <div className="container">
            <div className="shop-bag">
              {/* <h1>shopping bag</h1> */}
              <p className="mb-20 mb-xs-30">
                <Link to="/login" className="td-u">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link to="/login" className="td-u">
                  create an account
                </Link>{" "}
                to save the items in your bag or track your order.
              </p>
            </div>

            <div className="shoping-card-main-wrap">
              <div className="shoping-card">
                {loader ? (
                  <LoaderSpinner />
                ) : (
                  cartDetails?.map((item, index) => {
                    console.log(item);
                    const selectedMetalColor = metalColor.find(
                      (colorItem) => colorItem.value === item?.active_color
                    );
                    // show error if the same diamond is selected
                    isDuplicate = cartDetails?.some((cartItem, i) => {
                      if (i !== index) {
                        const cartItemIds = cartItem.diamond.map(
                          (diamond) => diamond?.id
                        );
                        const itemIds = item.diamond.map(
                          (diamond) => diamond?.id
                        );
                        return (
                          cartItemIds.every((id) => itemIds.includes(id)) &&
                          cartItemIds.length === itemIds.length
                        );
                      }
                      return false;
                    });
                    //Hide checkout if duplicate diamonds is present
                    item.diamond.length > 0 &&
                      (hasDuplicates = cartDetails?.some((cartItem, i) => {
                        if (i !== index) {
                          const itemIds = item.diamond.map((items) => items.id);
                          const cartItemIds = cartItem.diamond.map(
                            (cart) => cart.id
                          );
                          return itemIds.every((id) =>
                            cartItemIds.includes(id)
                          );
                        }
                        return false;
                      }));

                    return (
                      <>
                        {/* ===========only gemstone */}
                        {item.gemstone_id &&
                        item.ring?.id == null &&
                        item?.diamond_id == null ? (
                          <div className="shop-card-inner gemstone">
                            <div className="product-info gemstone-only">
                              {item.gemstone?.map((gemstoneItem) => {
                                return (
                                  <>
                                    <div className="gemstone-cart">
                                      <div className="gemstone-img-text">
                                        <img
                                          src={gemstoneItem?.image_url}
                                          alt=""
                                        />
                                        <div className="remove-option">
                                          <Link
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              handleRemoveItemCart(
                                                item.id,
                                                gemstoneItem?.id
                                              );

                                              handleWishlist(
                                                "gemstone",
                                                userId,
                                                gemstoneItem?.stock_num,
                                                gemstoneItem?.total_sales_price,

                                                item.item?.ring.id
                                                  ? item.item?.ring.id
                                                  : "",
                                                item.item?.active_color
                                                  ? item.item?.active_color
                                                  : "",
                                                item.item?.img_sku
                                                  ? item.item?.img_sku
                                                  : "",
                                                item.item?.ring_price
                                                  ? item.item?.ring_price
                                                  : "",
                                                item.diamondItem?.stock_num
                                                  ? item.diamondItem?.stock_num
                                                  : "",
                                                item.diamondItem
                                                  ?.total_sales_price
                                                  ? item.diamondItem
                                                      ?.total_sales_price
                                                  : "",
                                                item.ring_type
                                                  ? item.ring_type
                                                  : "",
                                                item.ring_size
                                                  ? item.ring_size
                                                  : ""
                                              );
                                            }}
                                          >
                                            <span className="txt-mtw">
                                              <CiHeart />
                                              Move to Wish List
                                            </span>
                                          </Link>
                                          <br />
                                          <Link
                                            to="javascript:void(0);"
                                            onClick={() =>
                                              handleRemoveItem(
                                                item?.id,
                                                gemstoneItem?.id
                                              )
                                            }
                                          >
                                            <IoIosClose />
                                            Remove
                                          </Link>
                                        </div>
                                      </div>

                                      <div className="gemstone-name">
                                        <p>{gemstoneItem.short_title}</p>
                                        <p className="small-text">
                                          <span>
                                            <GiBigDiamondRing />
                                          </span>
                                          Add this gem to
                                          <Link
                                            to={`/engagement-rings/start-with-a-setting?stock_num=${gemstoneItem?.stock_num}`}
                                          >
                                            ring
                                          </Link>
                                        </p>
                                      </div>
                                      <div className="gemstone-price">
                                        <p>${item.gemstone_price}</p>
                                      </div>
                                    </div>
                                    {/* {isDuplicate && (
                                    <div className="available-list">
                                      <p className="exclamation-symbol-red">
                                        <span>
                                          <FaExclamationCircle />
                                        </span>
                                        This unique diamond exists in multiple
                                        places in your Shopping Cart. Please
                                        remove one of the items or{" "}
                                        <Link to="/engagement-rings/start-with-a-diamond">
                                          choose a new diamond
                                        </Link>{" "}
                                        before submitting your order.
                                      </p>
                                    </div>
                                  )} */}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                        {/* ===========only gemstone end*/}

                        {/* ========== ring + diamond*/}
                        {item.ring?.id &&
                        item?.diamond_id &&
                        !item?.gemstone_id ? (
                          <div className="shop-card-inner diamond-ring">
                            <div className="product-pic ring-only">
                              <div className="diamond-ring-img-text">
                                <Link to="#">
                                  <ul className="product-list">
                                    <li
                                      className={
                                        item.active_color === white
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === yellow
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === rose
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === platinum
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                  </ul>
                                </Link>
                              </div>
                              <div className="product-info-inner">
                                <div className="product-info-left">
                                  <h2>
                                    <Link
                                      to={`/detail-ring-product?slug=${item.ring?.slug}&color=${item?.active_color}`}
                                      className="td-n2"
                                    >
                                      {selectedMetalColor?.value}
                                      {item.ring?.name}
                                    </Link>
                                  </h2>

                                  <div className="ir245-muted">
                                    <div className="code">BE3D20-18KY</div>
                                    {/* <div className="code">
                                  Qty:
                                  <span
                                    className="qty"
                                    style={{ color: "#807a7a" }}
                                  >
                                    <span onClick={() => setCount(count + 1)}>
                                      <FaPlus />
                                    </span>
                                    <span>{count}</span>
                                    <span onClick={() => handleIncrement()}>
                                      <FaMinus />
                                    </span>
                                  </span>
                                  <input
                                    name="cartitem_id"
                                    type="hidden"
                                    value="17566554"
                                  />
                                  <span
                                    className="iconfont iconfont-plus"
                                    onclick="increase_numbers(this);"
                                  ></span>
                                </div> */}
                                  </div>
                                </div>

                                {/* <div className="select-custom-size">
                                  <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="Select Size"
                                  />
                                  <p
                                    id="error-message"
                                    className="error"
                                    style={{ color: "red" }}
                                  ></p>
                                </div> */}
                                <div className="ring-size">
                                  <span>Ring Size : </span>{" "}
                                  <span>{item?.ring_size}</span>
                                </div>
                              </div>
                              <div className="product-ring-price">
                                <span
                                  style={{ whiteSpace: "nowrap" }}
                                  id="prodcut_price_17566554"
                                >
                                  ${item?.ring_price}
                                </span>
                              </div>
                            </div>

                            <div className="product-info diamond-only">
                              {item.diamond?.slice(0, 1).map((diamondItem) => {
                                console.log(diamondItem);
                                return (
                                  <>
                                    <div className="checkout-name-description">
                                      <div className="diamond-text-img">
                                        <img
                                          src={diamondItem?.image_url}
                                          alt=""
                                        />

                                        <div className="remove-option">
                                          <Link
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              handleRemoveItemCart(
                                                item.id,
                                                item.ring_id
                                              );

                                              handleWishlist(
                                                "ring_diamond",
                                                userId,
                                                item.gemstoneItem?.stock_num
                                                  ? item.gemstoneItem?.stock_num
                                                  : "",
                                                item.gemstoneItem
                                                  ?.total_sales_price
                                                  ? item.gemstoneItem
                                                      ?.total_sales_price
                                                  : "",

                                                item?.ring.id,
                                                item?.active_color,
                                                item?.img_sku,
                                                item?.ring_price,
                                                diamondItem?.stock_num,
                                                diamondItem?.total_sales_price,
                                                item.ring_type,
                                                item.ring_size
                                              );
                                            }}
                                          >
                                            <span className="txt-mtw">
                                              <CiHeart />
                                              Move to Wish List
                                            </span>
                                          </Link>
                                          <br />
                                          <Link
                                            to="javascript:void(0);"
                                            onClick={() =>
                                              handleRemoveItem(
                                                item.id,
                                                item.ring_id
                                              )
                                            }
                                          >
                                            <IoIosClose />
                                            Remove
                                          </Link>
                                        </div>
                                      </div>
                                      <div className="checkout-left-des diamond-name">
                                        <p>
                                          <Link to="#">
                                            {diamondItem?.size} Carat{" "}
                                            {diamondItem?.shape} Diamond
                                          </Link>
                                        </p>
                                        <p className="small-text">
                                          {diamondItem?.cut} Cut,{" "}
                                          {diamondItem?.color} Color,{" "}
                                          {diamondItem?.clarity} Clarity
                                        </p>
                                        <p className="small-text">5587475AB</p>
                                        <div className="available-list">
                                          <p>
                                            <span>
                                              <IoIosStar />
                                            </span>
                                            Only {diamondItem?.available}{" "}
                                            Available
                                          </p>
                                        </div>
                                      </div>
                                      <div className="checkout-right-price diamond-price">
                                        <p>${diamondItem?.total_sales_price}</p>
                                      </div>
                                    </div>

                                    {item.diamond && isDuplicate && (
                                      <div className="available-list">
                                        <p className="exclamation-symbol-red">
                                          <span>
                                            <FaExclamationCircle />
                                          </span>
                                          This unique diamond exists in multiple
                                          places in your Shopping Cart. Please
                                          remove one of the items or{" "}
                                          <Link to="/engagement-rings/start-with-a-diamond">
                                            choose a new diamond
                                          </Link>{" "}
                                          before submitting your order.
                                        </p>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                        {/* ============ */}

                        {/* ===========only diamond */}
                        {item.diamond_id &&
                        item.ring?.id == null &&
                        item?.gemstone_id == null ? (
                          <div className="shop-card-inner diamond-ring">
                            <div className="product-info diamond-only">
                              {item.diamond?.map((diamondItem) => {
                                return (
                                  <>
                                    <div className="checkout-name-description">
                                      <div className="diamond-text-img">
                                        <img
                                          src={diamondItem?.image_url}
                                          alt=""
                                        />

                                        <div className="remove-option">
                                          <Link
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              handleRemoveItemCart(
                                                item.id,
                                                item?.diamond_stock_no
                                              );

                                              handleWishlist(
                                                "diamond",
                                                userId,
                                                item.gemstoneItem?.stock_num
                                                  ? item.gemstoneItem?.stock_num
                                                  : "",
                                                item.gemstoneItem
                                                  ?.total_sales_price
                                                  ? item.gemstoneItem
                                                      ?.total_sales_price
                                                  : "",

                                                item.item?.ring.id
                                                  ? item.item?.ring.id
                                                  : "",
                                                item.item?.active_color
                                                  ? item.item?.ring.id
                                                  : "",
                                                item.item?.img_sku
                                                  ? item.item?.ring.id
                                                  : "",
                                                item.item?.ring_price
                                                  ? item.item?.ring_price
                                                  : "",

                                                diamondItem?.stock_num,
                                                diamondItem?.total_sales_price,
                                                item.ring_type
                                                  ? item.ring_type
                                                  : "",
                                                item.ring_size
                                                  ? item.ring_size
                                                  : ""
                                              );
                                            }}
                                          >
                                            <span className="txt-mtw">
                                              <CiHeart />
                                              Move to Wish List
                                            </span>
                                          </Link>
                                          <br />
                                          <Link
                                            to="javascript:void(0);"
                                            onClick={() =>
                                              handleRemoveItem(
                                                item.id,
                                                item?.diamond_stock_no
                                              )
                                            }
                                          >
                                            <IoIosClose />
                                            Remove
                                          </Link>
                                        </div>
                                      </div>
                                      <div className="checkout-left-des diamond-name">
                                        <p>
                                          <Link to="#">
                                            {diamondItem?.size} Carat{" "}
                                            {diamondItem?.shape} Diamond
                                          </Link>
                                        </p>
                                        <p className="small-text">
                                          {diamondItem?.cut} Cut,{" "}
                                          {diamondItem?.color} Color,{" "}
                                          {diamondItem?.clarity} Clarity
                                        </p>
                                        <p className="small-text">5587475AB</p>
                                        <div className="available-list">
                                          <p>
                                            <span>
                                              <IoIosStar />
                                            </span>
                                            Only {diamondItem?.available}{" "}
                                            Available
                                          </p>
                                          <p>
                                            <span>
                                              <GiBigDiamondRing />
                                            </span>
                                            Add this diamond to{" "}
                                            <Link
                                              to={`/engagement-rings/start-with-a-setting?stock_num=${diamondItem?.stock_num}`}
                                            >
                                              {" "}
                                              ring
                                            </Link>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="checkout-right-price diamond-price">
                                        <p>${diamondItem?.total_sales_price}</p>
                                      </div>
                                    </div>

                                    {item.diamond && isDuplicate && (
                                      <div className="available-list">
                                        <p className="exclamation-symbol-red">
                                          <span>
                                            <FaExclamationCircle />
                                          </span>
                                          This unique diamond exists in multiple
                                          places in your Shopping Cart. Please
                                          remove one of the items or{" "}
                                          <Link to="/engagement-rings/start-with-a-diamond">
                                            choose a new diamond
                                          </Link>{" "}
                                          before submitting your order.
                                        </p>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                        {/* ===========only diamond end*/}

                        {/* ============= ring + gemstone*/}
                        {item.ring?.id && item?.gemstone_id ? (
                          <div className="shop-card-inner gemstone">
                            <div className="product-pic ring-only">
                              <div className="diamond-ring-img-text">
                                <Link to="#">
                                  <ul className="product-list">
                                    <li
                                      className={
                                        item.active_color === white
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === yellow
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === rose
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.active_color === platinum
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                  </ul>
                                </Link>
                              </div>
                              <div className="product-info-inner">
                                <div className="product-info-left">
                                  <h2>
                                    <Link to="#" className="td-n2">
                                      {/* {selectedMetalColor.value}{" "} */}
                                      {item.ring?.name}
                                    </Link>
                                  </h2>
                                  <div className="ir245-muted">
                                    <div className="code">BE3D20-18KY</div>
                                    {/* <div className="code">
                                  Qty:
                                  <span
                                    className="qty"
                                    style={{ color: "#807a7a" }}
                                  >
                                    <span onClick={() => setCount(count + 1)}>
                                      <FaPlus />
                                    </span>
                                    <span>{count}</span>
                                    <span onClick={() => handleIncrement()}>
                                      <FaMinus />
                                    </span>
                                  </span>
                                  <input
                                    name="cartitem_id"
                                    type="hidden"
                                    value="17566554"
                                  />
                                  <span
                                    className="iconfont iconfont-plus"
                                    onclick="increase_numbers(this);"
                                  ></span>
                                </div> */}
                                  </div>
                                </div>

                                {/* <div className="select-custom-size">
                                  <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="Select Size"
                                  />
                                  <p
                                    id="error-message"
                                    className="error"
                                    style={{ color: "red" }}
                                  ></p>
                                </div> */}
                                <div className="ring-size">
                                  <span>Ring Size : </span>{" "}
                                  <span>{item?.ring_size}</span>
                                </div>
                              </div>
                              <div className="product-ring-price">
                                <span
                                  style={{ whiteSpace: "nowrap" }}
                                  id="prodcut_price_17566554"
                                >
                                  ${item?.ring_price}
                                </span>
                              </div>
                            </div>

                            <div className="product-info gemstone-only">
                              {item.gemstone?.map((gemstoneItem) => {
                                return (
                                  <>
                                    <div className="gemstone-cart">
                                      <div className="gemstone-img-text">
                                        <img
                                          src={gemstoneItem?.image_url}
                                          alt=""
                                        />
                                        <div className="remove-option">
                                          <Link
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              handleRemoveItemCart(
                                                item.id,
                                                item.ring_id
                                              );
                                              handleWishlist(
                                                "ring_gemstone",
                                                userId,
                                                gemstoneItem?.stock_num,
                                                gemstoneItem?.total_sales_price,

                                                item?.ring.id,
                                                item?.active_color,
                                                item?.img_sku,
                                                item?.ring_price,

                                                item.diamondItem?.stock_num
                                                  ? item.diamondItem?.stock_num
                                                  : "",
                                                item.diamondItem
                                                  ?.total_sales_price
                                                  ? item.diamondItem
                                                      ?.total_sales_price
                                                  : "",
                                                item.ring_type,
                                                item.ring_size
                                              );
                                            }}
                                          >
                                            <span className="txt-mtw">
                                              <CiHeart />
                                              Move to Wish List
                                            </span>
                                          </Link>
                                          <br />
                                          <Link
                                            to="javascript:void(0);"
                                            onClick={() =>
                                              handleRemoveItem(
                                                item.id,
                                                item.ring_id
                                              )
                                            }
                                          >
                                            <IoIosClose />
                                            Remove
                                          </Link>
                                        </div>
                                      </div>

                                      <div className="gemstone-name">
                                        <p>${gemstoneItem.short_title}</p>
                                      </div>
                                      <div className="gemstone-price">
                                        <p>${item.gemstone_price}</p>
                                      </div>
                                    </div>
                                    {/* {isDuplicate && (
                                    <div className="available-list">
                                      <p className="exclamation-symbol-red">
                                        <span>
                                          <FaExclamationCircle />
                                        </span>
                                        This unique diamond exists in multiple
                                        places in your Shopping Cart. Please
                                        remove one of the items or{" "}
                                        <Link to="/engagement-rings/start-with-a-diamond">
                                          choose a new diamond
                                        </Link>{" "}
                                        before submitting your order.
                                      </p>
                                    </div>
                                  )} */}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                        {/* =================== */}
                      </>
                    );
                  })
                )}
                <div className="home-banner-promo__box">
                  <div className="home-banner-promo__img">
                    <img
                      src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Diamonds.jpg"
                      alt="Lab Diamond Studs"
                      className="img-responsive"
                    />
                  </div>
                  <div className="home-banner-promo__body middle">
                    <div>
                      <div className="home-banner-promo__header">
                        ENDS SOON!
                      </div>
                      <div className="home-banner-promo__subheader">
                        <span>Lab Diamond Studs </span>with purchase over
                        $1,000.
                        <br />
                        <span>Surprise Earrings </span>with all other purchases.
                      </div>
                    </div>
                  </div>
                  <Link to="#" className="see-details-link">
                    <u>See Terms</u>
                  </Link>
                </div>
              </div>

              <div className="card-right-side">
                <p className="text-center mt-xs-20 ass">
                  Need Assistance? <Link to="#">Chat now</Link> or
                  call800.691.0952
                </p>
                <div className="order-box">
                  <h3>order summary</h3>
                  {cartDetails?.slice(0, 1).map((item) => {
                    return (
                      <>
                        <div className="table-count">
                          <div className="row">
                            <div className="subtotal">Subtotal</div>
                            <div className="price-right">
                              ${calculateTotalPriceDatabase().toFixed(2)}
                            </div>
                          </div>
                          <div className="row">
                            <div className="subtotal">FedEx Shipping</div>
                            <div className="price-right">Free</div>
                          </div>
                          <div className="row">
                            <div className="subtotal">
                              <Link onClick={() => setShowTax(!showTax)}>
                                Sales Tax Estimate
                                <HiInformationCircle />
                              </Link>
                            </div>
                            <div className="price-right">{tax}</div>
                            {showTax && (
                              <div className="estimated-taxess">
                                <form>
                                  <div className="estimates-tax-main">
                                    <div className="estimate-tax-left">
                                      <select>
                                        <option value="United States">
                                          United States
                                        </option>
                                        <option value="Puerto Rico">
                                          Puerto Rico
                                        </option>
                                        <option value="Virgin Islands (U.S.)">
                                          Virgin Islands (U.S.)
                                        </option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">
                                          Australia
                                        </option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                    <div className="estimate-tax-right">
                                      <input
                                        type="text"
                                        className="ship_sub"
                                        placeholder="zip code"
                                      />
                                    </div>
                                  </div>
                                  <div className="texs-estimated">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        setShowTax(false) || setTax("$0.00")
                                      }
                                    >
                                      estimate tax
                                    </Link>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>

                          <div className="row total">
                            <div className="subtotal">
                              <b>Total</b>
                            </div>
                            <div className="price-right">
                              <b>${calculateTotalPriceDatabase().toFixed(2)}</b>
                            </div>
                          </div>
                          {!hasDuplicates ? (
                            <div className="button-card">
                              <Link
                                className="check-btn"
                                to={user_id ? "/check_out" : "#"}
                                onClick={() => {
                                  if (!user_id) {
                                    toast.info(
                                      "Please log in to proceed to checkout. ",
                                      {
                                        position: "top-right",
                                        className: "foo-bar",
                                      }
                                    );
                                  }
                                }}
                              >
                                checkout
                              </Link>
                              {/* <span>Or</span>
                              <Link className="pay-btn" to="#">
                                <img
                                  src="https://css.brilliantearth.com/static/img/icon/paypal.png"
                                  alt=""
                                />
                              </Link> */}
                            </div>
                          ) : null}
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="shipping-info">
                  <h4>shipping info</h4>

                  <div className="ship-card">
                    <div className="ship-icon">
                      <RiTruckFill />
                    </div>

                    <div className="ship-content">
                      <p>
                        Estimated ship date if ordered by 9 PM PT today:{" "}
                        <b>Wednesday, February 14th</b>
                      </p>
                    </div>
                  </div>

                  <div className="ship-card">
                    <div className="ship-icon">
                      <IoCallOutline />
                    </div>

                    <div className="ship-content">
                      <p>
                        <Link to="/contact">Contact us</Link> to schedule
                        Saturday delivery, hold at a FedEx location, or to
                        inquire about available delivery options.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="add-form-gift">
                  <div className="add-per-info" onClick={() => setDown(!down)}>
                    <CiGift />
                    <h3>Add a Personalized Gift Message</h3>
                    {down ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </div>

                  {down && (
                    <div className="add-form">
                      <form>
                        <textarea
                          value={message}
                          onChange={handleChange}
                        ></textarea>
                        <label>
                          <input type="checkbox" checked />
                          Include price on receipt
                        </label>
                      </form>

                      <div className="save-buttons">
                        <p>
                          <Link
                            to="#"
                            className="td-u"
                            onClick={() => setDown(false)}
                          >
                            Cancel
                          </Link>{" "}
                          |{" "}
                          <Link
                            to="#"
                            className="td-u"
                            onClick={handleSaveMessage}
                          >
                            Save Message
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {showMessage && (
                    <div className="saved-message">
                      <p>{message}</p>
                      <label className="add-form">
                        <input type="checkbox" checked />
                        Include price on receipt
                      </label>
                      <div className="edit-delete-buttons">
                        <Link onClick={handleEditMessage}>Edit</Link> |{" "}
                        <Link onClick={handleDeleteMessage}>Delete</Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="add-form-gift">
                  <div
                    className="add-per-info"
                    onClick={() => setAgainDown(!againDown)}
                  >
                    <IoPricetagOutline />
                    <h3>Enter a Gift Card or Promo Code</h3>
                    {againDown ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </div>
                  {againDown && (
                    <div className="add-form">
                      <form>
                        <input type="text" placeholder="" />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shoping-car-page">
          <div className="container">
            <div className="shop-bag">
              {/* <h1>shopping bag</h1> */}
              <p className="mb-20 mb-xs-30">
                <Link to="/login" className="td-u">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link to="/login" className="td-u">
                  create an account
                </Link>{" "}
                to save the items in your bag or track your order.
              </p>
            </div>

            <div className="shoping-card-main-wrap">
              <div className="shoping-card">
                {cartData.map((item, index) => {
                  console.log(item);
                  const selectedMetalColor = metalColor.find(
                    (colorItem) => colorItem?.value === item.ring_color
                  );
                  // show error if the same diamond is selected

                  isDuplicate = cartData.some(
                    (cartItem, i) =>
                      i !== index &&
                      (cartItem.diamonds?.id || cartItem.diamondItem?.id) ===
                        (item.diamonds?.id || item.diamondItem?.id)
                  );

                  item.diamonds &&
                    item.diamondItem &&
                    (hasDuplicates = cartData.some(
                      (cartItem, i) =>
                        i !== index &&
                        (cartItem.diamonds?.id || cartItem.diamondItem?.id) ===
                          (item.diamonds?.id || item.diamondItem?.id)
                    ));

                  return (
                    <>
                      <div className="shop-card-inner main-cart-inner">
                        {item.gemstoneSingle || item.item ? (
                          <>
                            <div className="main-cart-inner">
                              <div className="cart-left-pic">
                                <Link
                                  to={`/gemstones-detail?stock_num=${
                                    item.gemstoneSingle
                                      ? item?.gemstoneSingle.stock_num
                                      : item.item?.stock_num
                                  }`}
                                >
                                  <img
                                    src={
                                      item.gemstoneSingle?.image_url
                                        ? item.gemstoneSingle?.image_url
                                        : item.item?.image_url
                                    }
                                    alt=""
                                  />
                                </Link>
                                <div className="remove-option">
                                  <Link
                                    to="#"
                                    onClick={() => handleWishlistGemstone(item)}
                                  >
                                    <span className="txt-mtw">
                                      <CiHeart />
                                      Move to Wish List
                                    </span>
                                  </Link>
                                  <br />
                                  <Link
                                    to="javascript:void(0);"
                                    onClick={() => removeProduct(item)}
                                  >
                                    <IoIosClose />
                                    Remove
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="product-info-inner cart-middle-discription">
                              <div className="cart-middle-discription-text">
                                <Link
                                  to={`/gemstones-detail?stock_num=${
                                    item.gemstoneSingle
                                      ? item?.gemstoneSingle.stock_num
                                      : item.item?.stock_num
                                  }`}
                                >
                                  <span>
                                    {item.gemstoneSingle?.short_title
                                      ? item.gemstoneSingle?.short_title
                                      : item.item?.short_title}
                                  </span>
                                </Link>
                                <p className="small-text">
                                  <span>
                                    <GiBigDiamondRing />
                                  </span>
                                  Add this gem to
                                  <Link
                                    to={`/engagement-rings/start-with-a-setting?stock_num=${
                                      item.gemstoneSingle?.stock_num
                                        ? item.gemstoneSingle?.stock_num
                                        : item.item?.stock_num
                                    }`}
                                  >
                                    ring
                                  </Link>
                                </p>
                              </div>
                              <div className="cart-right-price">
                                <p>
                                  {item.gemstoneSingle?.total_sales_price
                                    ? item.gemstoneSingle?.total_sales_price
                                    : item.item?.total_sales_price}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : item.ring_data ? (
                          <>
                            <div className="main-cart-inner">
                              <div className="cart-left-pic">
                                <Link
                                  to={
                                    item.diamondItem
                                      ? `/final_ring?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.diamondItem?.stock_num}`
                                      : `/final_ring_gemstone?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.gemstone?.stock_num}`
                                  }
                                >
                                  <ul className="product-list">
                                    <li
                                      className={
                                        item.ring_color === white
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.ring_img}/${item.ring_img}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.ring_color === yellow
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.ring_img}/${item.ring_img}.alt.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.ring_color === rose
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.ring_img}/${item.ring_img}.alt1.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                    <li
                                      className={
                                        item.ring_color === platinum
                                          ? "active"
                                          : "displayed"
                                      }
                                    >
                                      <img
                                        src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.ring_img}/${item.ring_img}.jpg`}
                                        alt="Gold Ring"
                                        className="img-responsive center-block"
                                      />
                                    </li>
                                  </ul>
                                </Link>

                                {item.diamondItem ? (
                                  <div className="cart-left-pic">
                                    <Link
                                      to={
                                        item.diamondItem
                                          ? `/final_ring?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.diamondItem?.stock_num}`
                                          : `/final_ring_gemstone?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.gemstone?.stock_num}`
                                      }
                                    >
                                      <img
                                        src={item.diamondItem?.image_url}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="cart-left-pic">
                                    <Link
                                      to={
                                        item.diamondItem
                                          ? `/final_ring?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.diamondItem?.stock_num}`
                                          : `/final_ring_gemstone?slug=${item.ring_data?.slug}&color=${item?.ring_color}&stock_num=${item.gemstone?.stock_num}`
                                      }
                                    >
                                      <img
                                        src={item.gemstone?.image_url}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                )}
                                <div className="remove-option">
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      handleWishlistItem(
                                        item.ring_data,
                                        item.diamondItem
                                          ? item.diamondItem
                                          : item.gemstone,
                                        item,
                                        item.diamondItem
                                          ? "ring_diamond"
                                          : "ring_gemstone"
                                      )
                                    }
                                  >
                                    <span className="txt-mtw">
                                      <CiHeart />
                                      Move to Wish List
                                    </span>
                                  </Link>
                                  <br />
                                  <Link
                                    to="javascript:void(0);"
                                    onClick={() => removeProduct(item)}
                                  >
                                    <IoIosClose />
                                    Remove
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="product-info cart-middle-discription">
                              <div className="product-info-inner">
                                <div className="cart-middle-discription-text">
                                  <div>
                                    {selectedMetalColor && (
                                      <h2>
                                        <Link
                                          to={`/detail-ring-product?slug=${item.ring_data?.slug}&color=${item?.ring_color}`}
                                          className="td-n2"
                                        >
                                          {selectedMetalColor.value}{" "}
                                          {item.ring_data?.name}
                                        </Link>
                                      </h2>
                                    )}

                                    <div className="ir245-muted">
                                      <div className="code">BE3D20-18KY</div>
                                      <div className="code">
                                        <input
                                          name="cartitem_id"
                                          type="hidden"
                                          value="17566554"
                                        />
                                        <span
                                          className="iconfont iconfont-plus"
                                          onclick="increase_numbers(this);"
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cart-right-price">
                                  <span
                                    style={{ whiteSpace: "nowrap" }}
                                    id="prodcut_price_17566554"
                                  >
                                    {item.ring_price}
                                  </span>
                                </div>
                              </div>

                              <div className="ring-size-cart-checkout">
                                <div className="ring-size">
                                  <span>Ring Size : </span>{" "}
                                  <span>{item?.ring_size}</span>
                                </div>

                                {item.diamondItem ? (
                                  <>
                                    {" "}
                                    <div className="checkout-name-description">
                                      <div className="checkout-left-des">
                                        <p>
                                          <Link
                                            to={`/view_diamond?stock_num=${item.diamondItem?.stock_num}`}
                                          >
                                            {item.diamondItem?.size} Carat{" "}
                                            {item.diamondItem?.shape} Diamond
                                          </Link>
                                        </p>
                                        <p className="small-text">
                                          {item.diamondItem?.cut} Cut,{" "}
                                          {item.diamondItem?.color} Color,{" "}
                                          {item.diamondItem?.clarity} Clarity
                                        </p>
                                        <p className="small-text">5587475AB</p>
                                      </div>
                                      <div className="cart-right-price">
                                        <p>
                                          {item.diamondItem?.total_sales_price}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="checkout-name-description">
                                    <div className="cart-left-pic">
                                      <p>
                                        <Link
                                          to={`/gemstones-detail?stock_num=${item.gemstone?.stock_num}`}
                                        >
                                          {item.gemstone?.short_title}
                                        </Link>
                                      </p>
                                    </div>
                                    <div className="checkout-right-price">
                                      <p>{item.gemstone?.total_sales_price}</p>
                                    </div>
                                  </div>
                                )}
                                {item.diamond ? (
                                  <div className="available-list">
                                    <p>
                                      <span>
                                        <IoIosStar />
                                      </span>
                                      Only {item.diamondItem?.available}{" "}
                                      Available
                                    </p>
                                  </div>
                                ) : null}
                                {item.diamondItem && isDuplicate && (
                                  <div className="available-list">
                                    <p className="exclamation-symbol-red">
                                      <span>
                                        <FaExclamationCircle />
                                      </span>
                                      This unique diamond exists in multiple
                                      places in your Shopping Cart. Please
                                      remove one of the items or{" "}
                                      <Link to="/engagement-rings/start-with-a-diamond">
                                        choose a new diamond
                                      </Link>{" "}
                                      before submitting your order.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="main-cart-inner">
                              <div className="cart-left-pic">
                                <Link
                                  to={`/view_diamond?stock_num=${item.diamonds?.stock_num}`}
                                >
                                  <img src={item.diamonds?.image_url} alt="" />
                                </Link>
                                <div className="remove-option">
                                  <Link
                                    to="#"
                                    onClick={() => handleWishDataDiamonds(item)}
                                  >
                                    <span className="txt-mtw">
                                      <CiHeart />
                                      Move to Wish List
                                    </span>
                                  </Link>
                                  <br />
                                  <Link
                                    to="javascript:void(0);"
                                    onClick={() => removeProduct(item)}
                                  >
                                    <IoIosClose />
                                    Remove
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="product-info-inner cart-middle-discription">
                              <div className="cart-middle-discription-text">
                                <Link
                                  to={`/view_diamond?stock_num=${item.diamonds?.stock_num}`}
                                >
                                  <span>
                                    {item.diamonds?.size} Carat{" "}
                                    {item.diamonds?.shape} Diamond
                                  </span>
                                </Link>
                                <p className="small-text">
                                  {item.diamonds?.cut} Cut{" "}
                                  {item.diamonds?.color} Color
                                  {item.clarity} Clarity
                                </p>
                                <p className="small-text">
                                  <span>
                                    <GiBigDiamondRing />
                                  </span>
                                  Add this diamond to{" "}
                                  <Link
                                    to={`/engagement-rings/start-with-a-setting?stock_num=${item.diamonds?.stock_num}`}
                                  >
                                    {" "}
                                    ring
                                  </Link>
                                </p>
                              </div>
                              <div className="cart-right-price">
                                <p>{item.diamonds?.total_sales_price}</p>
                              </div>
                            </div>
                            {item.diamonds && isDuplicate && (
                              <div className="available-list">
                                <p className="exclamation-symbol-red">
                                  <span>
                                    <FaExclamationCircle />
                                  </span>
                                  This unique diamond exists in multiple places
                                  in your Shopping Cart. Please remove one of
                                  the items or{" "}
                                  <Link to="/engagement-rings/start-with-a-diamond">
                                    choose a new diamond
                                  </Link>{" "}
                                  before submitting your order.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  );
                })}

                <div className="home-banner-promo__box">
                  <div className="home-banner-promo__img">
                    <img
                      src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Diamonds.jpg"
                      alt="Lab Diamond Studs"
                      className="img-responsive"
                    />
                  </div>
                  <div className="home-banner-promo__body middle">
                    <div>
                      <div className="home-banner-promo__header">
                        ENDS SOON!
                      </div>
                      <div className="home-banner-promo__subheader">
                        <span>Lab Diamond Studs </span>with purchase over
                        $1,000.
                        <br />
                        <span>Surprise Earrings </span>with all other purchases.
                      </div>
                    </div>
                  </div>
                  <Link to="#" className="see-details-link">
                    <u>See Terms</u>
                  </Link>
                </div>
              </div>

              <div className="card-right-side">
                <p className="text-center mt-xs-20 ass">
                  Need Assistance? <Link to="#">Chat now</Link> or
                  call800.691.0952
                </p>
                <div className="order-box">
                  <h3>order summary</h3>
                  {cartData.slice(0, 1).map((item) => {
                    return (
                      <>
                        <div className="table-count">
                          <div className="row">
                            <div className="subtotal">Subtotal</div>
                            <div className="price-right">
                              {calculateTotalPrice().toFixed(2)}
                            </div>
                          </div>
                          <div className="row">
                            <div className="subtotal">FedEx Shipping</div>
                            <div className="price-right">Free</div>
                          </div>
                          <div className="row">
                            <div className="subtotal">
                              <Link onClick={() => setShowTax(!showTax)}>
                                Sales Tax Estimate
                                <HiInformationCircle />
                              </Link>
                            </div>
                            <div className="price-right">{tax}</div>
                            {showTax && (
                              <div className="estimated-taxess">
                                <form>
                                  <div className="estimates-tax-main">
                                    <div className="estimate-tax-left">
                                      <select>
                                        <option value="United States">
                                          United States
                                        </option>
                                        <option value="Puerto Rico">
                                          Puerto Rico
                                        </option>
                                        <option value="Virgin Islands (U.S.)">
                                          Virgin Islands (U.S.)
                                        </option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">
                                          Australia
                                        </option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                    <div className="estimate-tax-right">
                                      <input
                                        type="text"
                                        className="ship_sub"
                                        placeholder="zip code"
                                      />
                                    </div>
                                  </div>
                                  <div className="texs-estimated">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        setShowTax(false) || setTax("$0.00")
                                      }
                                    >
                                      estimate tax
                                    </Link>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>

                          <div className="row total">
                            <div className="subtotal">
                              <b>Total</b>
                            </div>
                            <div className="price-right">
                              <b>{calculateTotalPrice().toFixed(2)}</b>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {!isDuplicate && (
                    <div className="button-card">
                      <Link
                        className="check-btn"
                        to={user_id ? "/check_out" : "#"}
                        onClick={() => {
                          if (!user_id) {
                            toast.info(
                              "Please log in to proceed to checkout.",
                              {
                                position: "top-right",
                                className: "foo-bar",
                              }
                            );
                          }
                        }}
                      >
                        checkout
                      </Link>
                      <span>Or</span>
                      <Link className="pay-btn" to="#">
                        <img
                          src="https://css.brilliantearth.com/static/img/icon/paypal.png"
                          alt=""
                        />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="shipping-info">
                  <h4>shipping info</h4>

                  <div className="ship-card">
                    <div className="ship-icon">
                      <RiTruckFill />
                    </div>

                    <div className="ship-content">
                      <p>
                        Estimated ship date if ordered by 9 PM PT today:{" "}
                        <b>Wednesday, February 14th</b>
                      </p>
                    </div>
                  </div>

                  <div className="ship-card">
                    <div className="ship-icon">
                      <IoCallOutline />
                    </div>

                    <div className="ship-content">
                      <p>
                        <Link to="/contact">Contact us</Link> to schedule
                        Saturday delivery, hold at a FedEx location, or to
                        inquire about available delivery options.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="add-form-gift">
                  <div className="add-per-info" onClick={() => setDown(!down)}>
                    <CiGift />
                    <h3>Add a Personalized Gift Message</h3>
                    {down ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </div>

                  {down && (
                    <div className="add-form">
                      <form>
                        <textarea
                          value={message}
                          onChange={handleChange}
                        ></textarea>
                        <label>
                          <input type="checkbox" checked />
                          Include price on receipt
                        </label>
                      </form>

                      <div className="save-buttons">
                        <p>
                          <Link
                            to="#"
                            className="td-u"
                            onClick={() => setDown(false)}
                          >
                            Cancel
                          </Link>{" "}
                          |{" "}
                          <Link
                            to="#"
                            className="td-u"
                            onClick={handleSaveMessage}
                          >
                            Save Message
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {showMessage && (
                    <div className="saved-message">
                      <p>{message}</p>
                      <label className="add-form">
                        <input type="checkbox" checked />
                        Include price on receipt
                      </label>
                      <div className="edit-delete-buttons">
                        <Link onClick={handleEditMessage}>Edit</Link> |{" "}
                        <Link onClick={handleDeleteMessage}>Delete</Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="add-form-gift">
                  <div
                    className="add-per-info"
                    onClick={() => setAgainDown(!againDown)}
                  >
                    <IoPricetagOutline />
                    <h3>Enter a Gift Card or Promo Code</h3>
                    {againDown ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </div>
                  {againDown && (
                    <div className="add-form">
                      <form>
                        <input type="text" placeholder="" />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};