import React, { useContext, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart, setCartDetails } from "../../redux/action";
import axios from "axios";
import { productListCart } from "../../redux/productAction";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

export const CartHover = () => {
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";

  const {baseUrl} = useContext(UserContext)

  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cartData);
  const user_id = localStorage.getItem("formData");
  function removeFromTheCart(item) {
    dispatch(removeToCart(item));
  }
  const calculateTotalPrice = () => {
    let total = 0;
    cartData.forEach((item) => {
      console.log(item.item);
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

  const calculateTotalPriceDatabase = () => {
    let total = 0;
    cartDetails?.forEach((item) => {
      total +=
        parseFloat(item?.ring_price || 0) +
        parseFloat(item?.diamond_price || 0) +
        parseFloat(item?.gemstone_price || 0);
    });
    return total;
  };
  // =============
  const [metalColor, setMetalColor] = useState([]);
  useEffect(() => {
    axios
      .get(
        "${baseUrl}/metalcolor"
      )
      .then((res) => {
        setMetalColor(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const [removeCart, setRemoveCart] = useState(null);
  const [shapeData, setShapeData] = useState();
  console.log("================remove", removeCart);
  const cartDetails = useSelector((state) => state.productDataCart);
  console.log(cartDetails);

  // =============
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/metalcolor`
      )
      .then((res) => {
        setMetalColor(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const handleRemoveItem = (itemId, ring_id, gem_id, diamond_id) => {
    const updatedItems = cartDetails.filter((item) => item.id !== itemId);
    setRemoveCart(itemId);

    cartData.map((item) => {
      console.log(
        item.diamonds?.id,
        "======",
        item.item?.id,
        "=========",
        ring_id,
        "==========",
        gem_id,
        "=======",
        diamond_id,
        "========",
        item.ring_data?.id
      );
      if (
        (item.item?.id || item.diamonds?.id || item.ring_data?.id) ===
        (ring_id || parseInt(gem_id) || parseInt(diamond_id))
      ) {
        dispatch(removeToCart(item));
      }
    });
  };

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/remove-cartitem/${removeCart}`
      )
      .then((res) => {
        console.log("=====", res.data);
        dispatch(productListCart());
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, [removeCart]);
  // ==================
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
  const userId = localStorage.getItem("formData");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (userId) {
  //         const response = await axios.get(
  //           `${baseUrl}/getcart-items?user_id=${userId}`,

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
  // }, [setCartDetails, wishlist]);
  return (
    <>
      {userId ? (
        <div className="cart-card-main-wrap" id="user-log">
          <div className="cart-card">
            {cartDetails.length > 0 ? (
              cartDetails?.map((item) => {
                console.log(item);
                const selectedMetalColor = metalColor.find(
                  (colorItem) => colorItem.value === item.ring_color
                );
                return (
                  <>
                    <div className="cart-card-inner">
                      {item.gemstone_id &&
                      item.ring?.id == null &&
                      item?.diamond_id == null ? (
                        item.gemstone?.map((gemstoneItem) => {
                          return (
                            <>
                              <div className="cart-left-main">
                                <div className="carts-pic">
                                  <img src={gemstoneItem?.image_url} alt="" />
                                </div>
                              </div>
                              <div className="cart-right-main">
                                <div className="cart-info">
                                  <span>{gemstoneItem.short_title}</span>
                                </div>
                                <div className="product-info-right">
                                  <p>${item.gemstone_price}</p>
                                </div>
                              </div>
                            </>
                          );
                        })
                      ) : item.ring?.id && item?.diamond_id ? (
                        <>
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                            </ul>
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <div className="cart-info-inner">
                                <div className="cart-info-left">
                                  <div>
                                    <h2>
                                      <Link to="#" className="td-n2">
                                        <h2>
                                          <Link to="#" className="td-n2">
                                            {item.ring?.name} (1/2{" "}
                                            <span
                                              style={{
                                                textTransform: "lowercase",
                                              }}
                                            >
                                              ct. tw.
                                            </span>
                                            )
                                          </Link>
                                        </h2>
                                      </Link>
                                    </h2>
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
                                        <br />
                                        <span
                                          style={{ whiteSpace: "nowrap" }}
                                          id="prodcut_price_17566554"
                                        >
                                          ${item?.ring_price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {item.diamond?.slice(0, 1).map((diamondItem) => {
                            return (
                              <>
                                <div className="cart-left-main">
                                  <div className="carts-pic">
                                    <img src={diamondItem?.image_url} alt="" />
                                  </div>
                                </div>
                                <div className="cart-right-main">
                                  <div className="cart-info">
                                    <div className="cart-info-inner">
                                      <div className="cart-info-left">
                                        <div className="td-n2">
                                          <p>
                                            <Link to="#">
                                              <>
                                                {diamondItem?.size} Carat{" "}
                                                {diamondItem?.shape} Diamond
                                                {diamondItem?.cut} Cut,{" "}
                                                {diamondItem?.color} Color,{" "}
                                                {diamondItem?.clarity} Clarity
                                              </>
                                            </Link>
                                          </p>
                                          <p className="small-text">Qty: 1</p>
                                        </div>
                                        <div className="checkout-right-price">
                                          {diamondItem?.total_sales_price}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : item.ring?.id && item?.gemstone_id ? (
                        <>
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                            </ul>
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <span>
                                {item.ring?.name} (1/2{" "}
                                <span style={{ textTransform: "lowercase" }}>
                                  ct. tw.
                                </span>
                                )
                              </span>
                            </div>
                            <div className="product-info-right">
                              <p> {item?.ring_price}</p>
                            </div>
                          </div>

                          {item.gemstone?.map((gemstoneItem) => {
                            return (
                              <>
                                <div className="cart-left-main">
                                  <div className="carts-pic">
                                    <img src={gemstoneItem?.image_url} alt="" />
                                  </div>
                                </div>
                                <div className="cart-right-main">
                                  <div className="cart-info">
                                    <span>{gemstoneItem.short_title}</span>
                                  </div>
                                  <div className="product-info-right">
                                    <p>${item.gemstone_price}</p>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : null}

                      {/* only diamond start*/}
                      {item.diamond_id &&
                      item.ring?.id == null &&
                      item?.gemstone_id == null
                        ? item.diamond?.slice(0, 1).map((diamondItem) => {
                            return (
                              <>
                                <div className="cart-left-main">
                                  <div className="carts-pic">
                                    <img src={diamondItem?.image_url} alt="" />
                                  </div>
                                </div>
                                <div className="cart-right-main">
                                  <div className="cart-info">
                                    <div className="cart-info-inner">
                                      <div className="cart-info-left">
                                        <div className="td-n2">
                                          <p>
                                            <Link to="#">
                                              <>
                                                {diamondItem?.size} Carat{" "}
                                                {diamondItem?.shape} Diamond
                                                {diamondItem?.cut} Cut,{" "}
                                                {diamondItem?.color} Color,{" "}
                                                {diamondItem?.clarity} Clarity
                                              </>
                                            </Link>
                                          </p>
                                          <p className="small-text">Qty: 1</p>
                                        </div>
                                        <div className="checkout-right-price">
                                          {diamondItem?.total_sales_price}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        : null}

                      <div className="cart-checkcross">
                        <IoIosClose
                          onClick={() =>
                            handleRemoveItem(
                              item.id,
                              item.ring_id,
                              item.gemstone_stock_no,
                              item.diamond_stock_no
                            )
                          }
                        />
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="empty-wish-list">No items in your bag.</div>
            )}
          </div>
          <div className="checkout-fixed-bottom">
            <div className="king-shoping-material">
              <ul className="king-shopping-list">
                <li>
                  <div className="media-subtotal">
                    <span className="name pr10">SUBTOTAL:</span>
                    {calculateTotalPriceDatabase().toFixed(2)}
                  </div>
                </li>
              </ul>
            </div>
            <div className="checkout-btn">
              <Link
                className="check-btn"
                to={user_id && cartDetails.length>0 ? "/check_out" : "#"}
                onClick={() => {
                  if (!user_id && cartDetails?.length === 0) {
                    toast.info("Please log in to proceed to checkout.", {
                      position: "top-right",
                      className: "foo-bar",
                    });
                  }
                }}
              >
                checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-card-main-wrap" id="user-log">
          <div className="cart-card">
            {cartData.length > 0 ? (
              cartData.map((item) => {
                const selectedMetalColor = metalColor.find(
                  (colorItem) => colorItem.value === item.ring_color
                );
                console.log(item);
                return (
                  <>
                    <div className="cart-card-inner">
                      {item.product_type === "gemstone" ? (
                        <>
                          <div className="product-pic-diamond-top">
                            <img src={item.item?.image_url} alt="" />
                          </div>
                          <div className="product-info-inner">
                            <div className="product-info-left">
                              <span>{item.item?.short_title}</span>
                            </div>
                            <div className="product-info-right">
                              <p>{item.item?.total_sales_price}</p>
                            </div>
                          </div>
                        </>
                      ) : item.product_type === "diamond" ? (
                        <>
                          <div className="product-pic-diamond-top">
                            <img src={item.diamonds?.image_url} alt="" />
                          </div>
                          <div className="product-info-inner">
                            <div className="product-info-left">
                              {item.diamonds?.size} Carat,
                              {item.diamonds?.shape} Diamond
                            </div>
                            <div className="product-info-right">
                              <p>{item.diamonds?.total_sales_price}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                              <Link to="#">
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
                              </Link>
                            </ul>
                            {item.diamondItem?.sub_title_description ? (
                              <div>
                                <img src={item.diamondItem?.image_url} alt="" />
                              </div>
                            ) : (
                              <div>
                                <img src={item.gemstone?.image_url} alt="" />
                              </div>
                            )}
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <div className="cart-info-inner">
                                <div className="cart-info-left">
                                  <div>
                                    <h2>
                                      <Link to="#" className="td-n2">
                                        {selectedMetalColor && (
                                          <h2>
                                            <Link to="#" className="td-n2">
                                              {selectedMetalColor.value}{" "}
                                              {item.ring_data?.name} (1/2{" "}
                                              <span
                                                style={{
                                                  textTransform: "lowercase",
                                                }}
                                              >
                                                ct. tw.
                                              </span>
                                              )
                                            </Link>
                                          </h2>
                                        )}
                                      </Link>
                                    </h2>
                                    <div className="ir245-muted">
                                      <div className="code">BE3D20-18KY</div>
                                      <div className="code quantity-number">
                                        Qty:
                                        <span
                                          className="qty"
                                          style={{ color: "#807a7a" }}
                                        >
                                          1
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
                                        <br />
                                        <span
                                          style={{ whiteSpace: "nowrap" }}
                                          id="prodcut_price_17566554"
                                        >
                                          {item.ring_price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="checkout-name-description">
                              <div className="td-n2">
                                <p>
                                  <Link to="#">
                                    {item.diamondItem?.sub_title_description ? (
                                      <>
                                        {item.diamondItem?.size} Carat,
                                        {item.diamondItem?.shape} Diamond,
                                        {item.diamondItem?.cut} Cut,{" "}
                                        {item.diamondItem?.color} Color,{" "}
                                        {item.diamondItem?.clarity} Clarity
                                      </>
                                    ) : (
                                      item.gemstone?.short_title
                                    )}
                                  </Link>
                                </p>
                                <p className="small-text">Qty: 1</p>
                              </div>
                              <div className="checkout-right-price">
                                {item.diamondItem?.sub_title_description ? (
                                  <p>{item.diamondItem?.total_sales_price}</p>
                                ) : (
                                  <p>{item.gemstone?.total_sales_price}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="cart-checkcross">
                        <IoIosClose
                          onClick={() => removeFromTheCart(item ? item : item)}
                        />
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="empty-wish-list">No items in your bag.</div>
            )}
          </div>
          <div className="fixed-bottom">
            <div className="king-shoping-material">
              <ul className="king-shopping-list">
                <li>
                  <div className="media-subtotal">
                    <span className="name pr10">SUBTOTAL:</span>
                    {calculateTotalPrice().toFixed(2)}
                  </div>
                </li>
              </ul>
            </div>
            <div className="checkout-btn">
              <Link
                className="check-btn"
                to={user_id && cartDetails?.length>0 ? "/check_out" : "#"}
                onClick={() => {
                  if (!user_id && cartDetails?.length === 0) {
                    toast.info("Please log in to proceed to checkout", {
                      position: "top-right",
                      className: "foo-bar",
                    });
                  }
                }}
              >
                checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
