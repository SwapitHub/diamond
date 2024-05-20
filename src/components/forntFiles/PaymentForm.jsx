import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import  {useHistory}   from "react-router-use-history";
import LoaderSpinner from "../LoaderSpinner";
import { productListCart } from "../../redux/productAction";
import { UserContext } from "../../App";
 
export const PaymentForm = () => {
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
const history = useHistory()
const location = useLocation();
const dispatch = useDispatch();
const {baseUrl} = useContext(UserContext)
  const queryParams = new URLSearchParams(location.search);
const address_id = queryParams.get("address_id");

  const cartData = useSelector((state) => state.cartData);
  const cartDetails = useSelector((state) => state.productDataCart);
  // cartDetails.length < 0 && 
  console.log("============", cartDetails);
  const user_id = localStorage.getItem("formData");
  const [orderId, setOrderId] = useState("");
  console.log("==================my data user=========", orderId);
  const [toggle, setToggle] = useState(1);
  const [shapeData, setShapeData] = useState([]);
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
  const [metalColor, setMetalColor] = useState([]);
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

  const calculateTotalPrice = () => {
    let total = 0;
    cartData?.forEach((item) => {
      total +=
        parseFloat(item.ringPrice || 0) +
        parseFloat(item.diamondItem?.total_sales_price || 0) +
        parseFloat(item.gemstone?.total_sales_price || 0) +
        parseFloat(item.gemstoneSingle?.total_sales_price || 0) +
        parseFloat(item.item?.total_sales_price || 0) +
        parseFloat(item.diamonds?.total_sales_price || 0);
    });
    return total;
  };

  const calculateTotalPriceLogin = () => {
    let total = 0;
    cartDetails?.forEach((item) => {
      total +=
        parseFloat(item?.ring_price || 0) +
        parseFloat(item?.diamond_price || 0) +
        parseFloat(item.gemstone_price || 0);
    });
    return total;
  };

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
  
  const handleOrderProduct = () => {
    if (cartDetails?.length > 0) {
    axios
   
      .get(
        `${baseUrl}/checkout?user_id=${user_id}&order_data=${jsonString}&address=${address_id}`
      )
      .then((res) => {
        console.log(res.data.data.order_id);
        // setOrderId(res.data.data?.order_id);

        if (res.data.res === "success") {
          itemIdsArray?.forEach((itemId) => {
            axios
              .get(
                `${baseUrl}/remove-cartitem/${itemId}`
              )
              .then((res2) => {
                console.log(
                  `Success with ID ${itemId} removed from cart:`,
                  res2
                );
                dispatch(productListCart())

              })
              .catch((error) => {
                console.log(
                  `Error removing item with ID ${itemId} from cart:`,
                  error
                );
              });
          });

          history.push(`/success?order_id=${res.data.data?.order_id}`)
        }


      })
      .catch((error) => {
        console.log("API call failed:", error);
      });
    }
  };
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="payment-form">
      <div className="container">
        <div className="checkout">
          <div className="checkout-left">
            <form>
              <div className="card-number">
                <label>Card Number</label>
                <input type="text" />
              </div>
              <div className="expiration">
                <label>Expiration</label>
                <span className="inputs">
                  <select name="" id="selectCity">
                    <option value="">1</option>
                    <option value="Chandigarh">1</option>
                    <option value="Delhi">2</option>
                    <option value="Jammu & Kashmir">3</option>
                    <option value="Uttar Pradesh">4</option>
                    <option value="Punjab">5</option>
                    <option value="Punjab">6</option>
                    <option value="Punjab">7</option>
                    <option value="Punjab">8</option>
                    <option value="Punjab">9</option>
                    <option value="Punjab">10</option>
                    <option value="Punjab">11</option>
                    <option value="Punjab">12</option>
                  </select>
                  <div className="error_1"></div>
                </span>
                <span className="inputs">
                  <select name="" id="selectCity">
                    <option value="">2024</option>
                    <option value="Chandigarh">2024</option>
                    <option value="Delhi">2025</option>
                    <option value="Jammu & Kashmir">2026</option>
                    <option value="Uttar Pradesh">2027</option>
                    <option value="Punjab">2028</option>
                    <option value="Punjab">2029</option>
                    <option value="Punjab">2029</option>
                    <option value="Punjab">2030</option>
                    <option value="Punjab">2031</option>
                    <option value="Punjab">2032</option>
                  </select>
                  <div className="error_1"></div>
                </span>
              </div>

              <div className="cvv">
                <label>CVV</label>
                <input type="text" />
              </div>
            </form>

            <div className="Return-to-Shipping">
              <div className="move-cart">
                <Link to="/check_out">
                  <MdKeyboardArrowLeft />
                  Return To Shopping Bag
                </Link>
              </div>
              <div className="continue-payment">
                <Link
                // to={orderId!=undefined &&`/success?order_id=${orderId}`}  
                
                
                  onClick={(event) =>{
                    handleOrderProduct()                                 
                  
                  }}

                >
                  Continue To Order
                </Link>
              </div>
            </div>
          </div>
          <div className="checkout-right">
            {user_id ? (
              <div className="checkout-right-scroll">
                <h3>Order Summary</h3>
                {
                  loader ? (
                    <LoaderSpinner/>
                  ) : (
                    cartDetails?.map((item) => {
                      const selectedMetalColor = metalColor.find(
                        (colorItem) => colorItem?.value === item?.active_color
                      );
                      return (
                        <>
                        {
                          cartDetails?.length > 0 ?(
                            <div className="order-summary">
                            {item.gemstone_id &&
                            item.ring?.id == null &&
                            item?.diamond_id == null ? (
                              item.gemstone?.map((gemstoneItem) => {
                                return (
                                  <>
                                    <div className="main-cart-inner">
                                      <div className="cart-left-pic">
                                        <img src={gemstoneItem?.image_url} alt="" />
                                      </div>
                                    </div>
                                    <div className="product-info-inner cart-middle-discription">
                                      <div className="cart-middle-discription-text">
                                        <span>{gemstoneItem?.short_title}</span>
                                      </div>
    
                                      <div className="cart-right-price">
                                        <p>${gemstoneItem?.total_sales_price}</p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                            ) : item.ring?.id ? (
                              <>
                                <div className="main-cart-inner">
                                  <div className="cart-left-pic">
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
                                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.img_sku}/${item.img_sku}.jpg`}
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
                                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.img_sku}/${item.img_sku}.alt.jpg`}
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
                                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.img_sku}/${item.img_sku}.alt1.jpg`}
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
                                            src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item.img_sku}/${item.img_sku}.jpg`}
                                            alt="Gold Ring"
                                            className="img-responsive center-block"
                                          />
                                        </li>
                                      </ul>
                                    </Link>
                                    {item.diamond_id
                                      ? item.diamond
                                          ?.slice(0, 1)
                                          .map((diamondItem) => {
                                            console.log(diamondItem);
                                            return (
                                              <>
                                                <div className="cart-left-pic">
                                                  <img
                                                    src={diamondItem?.image_url}
                                                    alt=""
                                                  />
                                                </div>
                                              </>
                                            );
                                          })
                                      : item.gemstone?.map((gemstoneItem) => {
                                          return (
                                            <>
                                              <div className="cart-left-pic">
                                                <img
                                                  src={gemstoneItem?.image_url}
                                                  alt=""
                                                />
                                              </div>
                                            </>
                                          );
                                        })}
                                  </div>
                                </div>
                                <div className="product-info cart-middle-discription">
                                  <div className="product-info-inner">
                                    <div className="cart-middle-discription-text">
                                      <div>
                                        {selectedMetalColor && (
                                          <h2>
                                            <Link to="#" className="td-n2">
                                              {selectedMetalColor.value}{" "}
                                              {item.ring?.name}
                                              <div className="ring-size">
                                                <span>Ring Size : </span>{" "}
                                                <span>{item?.ring_size}</span>
                                              </div>
                                            </Link>
                                          </h2>
                                        )}
                                      </div>
                                    </div>
                                    <div className="cart-right-price">
                                      <span
                                        style={{ whiteSpace: "nowrap" }}
                                        id="prodcut_price_17566554"
                                      >
                                        {item?.ring_price}
                                      </span>
                                    </div>
                                  </div>
    
                                  <div className="ring-size-cart-checkout">
                                    {item.diamond_id
                                      ? item.diamond
                                          ?.slice(0, 1)
                                          .map((diamondItem) => {
                                            return (
                                              <>
                                                <div className="checkout-name-description">
                                                  <div className="checkout-left-des">
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
                                                    <p className="small-text">
                                                      5587475AB
                                                    </p>
                                                  </div>
                                                  <div className="cart-right-price">
                                                    <p>
                                                      ${
                                                        diamondItem?.total_sales_price
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            );
                                          })
                                      : item.gemstone?.map((gemstoneItem) => {
                                          return (
                                            <>
                                              <div className="checkout-name-description">
                                                <div className="checkout-left-des cart-right-price">
                                                  <p>
                                                    <Link to="#">
                                                      {gemstoneItem?.short_title}
                                                    </Link>
                                                  </p>
                                                  <p className="small-text">
                                                    ${
                                                      gemstoneItem?.total_sales_price
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                  </div>
                                </div>
                              </>
                            ) : (
                              item.diamond?.map((diamondItem) => {
                                return (
                                  <>
                                    <div className="main-cart-inner">
                                      <div className="cart-left-pic">
                                        <img
                                          src={diamondItem?.image_url}
                                          alt={diamondItem.name}
                                        />
                                      </div>
                                    </div>
                                    <div className="product-info-inner cart-middle-discription">
                                      <div className="cart-middle-discription-text">
                                        <span>
                                          {diamondItem?.size} Carat{" "}
                                          {diamondItem?.shape} Diamond
                                        </span>
                                      </div>
                                      <div className="cart-right-price">
                                        <p>${diamondItem?.total_sales_price}</p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                            )}
                          </div>
                          ) : null
                        }
                         
                        </>
                      );
                    })
                  )
                }
                
              </div>
            ) : (
              <div className="checkout-right-scroll">
                <h3>Order Summary</h3>
                {cartData?.map((item) => {
                  console.log(item);
                  const selectedMetalColor = metalColor.find(
                    (colorItem) => colorItem.value === item.ring_color
                  );
                  return (
                    <>
                      <div className="order-summary">
                        {item.gemstoneSingle || item.item ? (
                          <>
                            <div className="main-cart-inner">
                              <div className="cart-left-pic">
                                <img
                                  src={
                                    item.gemstoneSingle?.image_url
                                      ? item.gemstoneSingle?.image_url
                                      : item.item?.image_url
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="product-info-inner cart-middle-discription">
                              <div className="cart-middle-discription-text">
                                <span>
                                  {item.gemstoneSingle?.short_title
                                    ? item.gemstoneSingle?.short_title
                                    : item.item?.short_title}
                                </span>
                              </div>
                              <div className="cart-right-price">
                                <p>
                                  ${item.gemstoneSingle?.total_sales_price
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
                                <Link to="#">
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
                                    <img
                                      src={item.diamondItem?.image_url}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  <div className="cart-left-pic">
                                    <img
                                      src={item.gemstone?.image_url}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="product-info cart-middle-discription">
                              <div className="product-info-inner">
                                <div className="cart-middle-discription-text">
                                  <div>
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
                                  </div>
                                </div>
                                <div className="cart-right-price">
                                  <span
                                    style={{ whiteSpace: "nowrap" }}
                                    id="prodcut_price_17566554"
                                  >
                                    {item.ringPrice}
                                  </span>
                                </div>
                              </div>

                              <div className="ring-size-cart-checkout">
                                {item.diamondItem ? (
                                  <>
                                    {" "}
                                    <div className="checkout-name-description">
                                      <div className="checkout-left-des">
                                        <p>
                                          <Link to="#">
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
                                          ${item.diamondItem?.total_sales_price}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="checkout-name-description">
                                    <div className="cart-left-pic">
                                      <p>
                                        <Link to="#">
                                          {item.gemstone?.short_title}
                                        </Link>
                                      </p>
                                    </div>
                                    <div className="checkout-right-price">
                                      <p>${item.gemstone?.total_sales_price}</p>
                                    </div>
                                  </div>
                                )}
                                {item.diamond ? (
                                  <div className="available-list">
                                    <p>
                                      Only {item.diamondItem?.available}{" "}
                                      Available
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="main-cart-inner">
                              <div className="cart-left-pic">
                                <img src={item.diamonds?.image_url} alt="" />
                              </div>
                            </div>
                            <div className="product-info-inner cart-middle-discription">
                              <div className="cart-middle-discription-text">
                                <span>
                                  {item.diamonds?.size} Carat{" "}
                                  {item.diamonds?.shape} Diamond
                                </span>
                              </div>
                              <div className="cart-right-price">
                                <p>${item.diamonds?.total_sales_price}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            )}

            {/* {cartData.slice(0, 1).map} */}
            <div className="table-count">
              <div className="row">
                <div className="subtotal">Subtotal</div>
                <div className="price-right">
                  {user_id
                    ? calculateTotalPriceLogin().toFixed(2)
                    : calculateTotalPrice().toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="subtotal">FedEx Shipping</div>
                <div className="price-right">Free</div>
              </div>
              <div className="row">
                <div className="subtotals">
                  <Link to="#">Sales Tax Estimate</Link>
                </div>
                <div className="price-right">TBD</div>
              </div>

              <div className="row total">
                <div className="subtotal">
                  <b>Total</b>
                </div>
                <div className="price-right">
                  <b>
                    {user_id
                      ? calculateTotalPriceLogin().toFixed(2)
                      : calculateTotalPrice().toFixed(2)}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
