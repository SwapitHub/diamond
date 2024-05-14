import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { IoCloseSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  validateAddress,
  validateCpass,
  validateEmail,
  validateName,
  validatePass,
  validatePostCode,
  validateTelephone,
} from "../ValidationFunctions";
import axios from "axios";

export const Pickup = () => {
  const [open, setOpen] = useState(false);
  const [clicked, setCliked] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);

  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";

  const cartData = useSelector((state) => state.cartData);
  const cartDetails = useSelector((state) => state.cartReducer);
  const user_id = localStorage.getItem("formData");

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
  const handleClose = () => {
    setOpen(false);
    console.log(open);
    setCliked(false);
  };

  const handleSelectShowroom = (showroom) => {
    setSelectedShowroom(showroom);
    setOpen(false);
  };

  function handleValidations() {
    var cpass = document.getElementById("pickup_cpass").value;

    validateName(
      document.getElementById("pickup_firstName").value,
      "pickup_firstName",
      "First Name"
    );
    validateName(
      document.getElementById("pickup_billingfirstName").value,
      "pickup_billingfirstName",
      "First Name"
    );
    validateName(
      document.getElementById("pickup_lastName").value,
      "pickup_lastName",
      "Last Name"
    );
    validateName(
      document.getElementById("pickup_billinglastName").value,
      "pickup_billinglastName",
      "Last Name"
    );
    validateAddress(
      document.getElementById("pickup_address").value,
      "pickup_address",
      "Address"
    );
    validateName(
      document.getElementById("pickup_city").value,
      "pickup_city",
      "City/Town"
    );
    validatePostCode(
      document.getElementById("pickup_postcode").value,
      "pickup_postcode",
      "Zip Code"
    );
    validateEmail(
      document.getElementById("pickup_email").value,
      "pickup_email",
      "Email Address"
    );
    validateTelephone(
      document.getElementById("pickup_telephone").value,
      "pickup_telephone",
      "Telephone"
    );
    validateTelephone(
      document.getElementById("pickup_billingtelephone").value,
      "pickup_billingtelephone",
      "Telephone"
    );
    validateAddress(
      document.getElementById("pickup_selectCity").value,
      "pickup_selectCity",
      "City"
    );
    validatePass(
      document.getElementById("pickup_pass").value,
      "pickup_pass",
      "Password"
    );
    validatePickupCpass(cpass, "pickup_cpass", "Confirm Password");
  }

  function validatePickupCpass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    const passwordValue = document.getElementById("pickup_pass").value;

    if (value.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else if (value !== passwordValue) {
      element.textContent = `${error} do not match`;
    } else {
      element.textContent = "";
    }
  }

  const calculateTotalPrice = () => {
    let total = 0;
    cartData.forEach((item) => {
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
    cartDetails.forEach((item) => {
      total +=
        parseFloat(item?.ring_price || 0) +
        parseFloat(item?.diamond_price || 0) +
        parseFloat(item.gemstone_price || 0);
    });
    return total;
  };
  return (
    <>
      <div className="product-pickup">
        <div className="select-showroom">
          {
            <>
              {selectedShowroom && (
                <div className="selected-showroom">
                  <h4>{selectedShowroom.name}</h4>
                  <p>{selectedShowroom.address}</p>
                </div>
              )}
              {selectedShowroom ? (
                <Link to="#" onClick={() => setOpen(true)}>
                  Change Showroom
                </Link>
              ) : (
                <Link to="#" onClick={() => setOpen(true)}>
                  Select Showroom
                </Link>
              )}
              <Popup
                trigger={null}
                position={"right center"}
                open={open}
                onClose={() => setOpen(false)}
              >
                <div className="popup-contents">
                  <div className="popup-heading">
                    <p>Find a Location</p>
                    <p>
                      <Link to="#" onClick={() => handleClose()}>
                        <IoCloseSharp />
                      </Link>
                    </p>
                  </div>

                  <div className="locations">
                    <input
                      type="search"
                      placeholder="Search by City or Zip Code"
                    />
                    <span className="search">
                      <CiSearch />
                    </span>
                    {selectedShowroom && (
                      <div className="selected-showroom">
                        <h3>Selected ShowRoom</h3>

                        <h4>{selectedShowroom.name}</h4>
                        <p>{selectedShowroom.address}</p>
                      </div>
                    )}
                    <div className="location-1">
                      <div className="loc-desc">
                        <p className="loc-heading">
                          San Francisco - Union Square
                        </p>
                        <p className="loc-address">
                          300 Grant Ave. Fl 3 San Francisco, CA 94108 Entrance
                          at 99 Harlan Place
                        </p>
                      </div>
                      <div
                        className="select-btn"
                        onClick={() =>
                          handleSelectShowroom({
                            name: "San Francisco - Union Square",
                            address:
                              "300 Grant Ave. Fl 3 San Francisco, CA 94108 Entrance at 99 Harlan Place",
                          })
                        }
                      >
                        <Link to="#">Select Showroom</Link>
                      </div>
                    </div>
                    <hr />
                    <div className="location-1">
                      <div className="loc-desc">
                        <p className="loc-heading">Chicago - Gold Coast</p>
                        <p className="loc-address">
                          34 E Oak St. Fl 2 Chicago, IL 60611
                        </p>
                      </div>
                      <div
                        className="select-btn"
                        onClick={() =>
                          handleSelectShowroom({
                            name: "Chicago - Gold Coast",
                            address: "34 E Oak St. Fl 2 Chicago, IL 60611",
                          })
                        }
                      >
                        <Link to="#">Select Showroom</Link>
                      </div>
                    </div>
                    <hr />
                    <div className="location-1">
                      <div className="loc-desc">
                        <p className="loc-heading">New York - Flatiron</p>
                        <p className="loc-address">
                          135 Fifth Avenue, Floor 2 NY, NY 10010
                        </p>
                      </div>
                      <div
                        className="select-btn"
                        onClick={() =>
                          handleSelectShowroom({
                            name: "New York - Flatiron",
                            address: "135 Fifth Avenue, Floor 2 NY, NY 10010",
                          })
                        }
                      >
                        <Link to="#">Select Showroom</Link>
                      </div>
                    </div>
                    <hr />
                    {!clicked && (
                      <div className="load-btn">
                        <Link to="#" onClick={() => setCliked(true)}>
                          Load More
                        </Link>
                      </div>
                    )}
                    {clicked ? (
                      <>
                        <div className="location-1">
                          <div className="loc-desc">
                            <p className="loc-heading">
                              San Francisco - Union Square
                            </p>
                            <p className="loc-address">
                              300 Grant Ave. Fl 3 San Francisco, CA 94108
                              Entrance at 99 Harlan Place
                            </p>
                          </div>
                          <div className="select-btn">
                            <Link to="#">Select Showroom</Link>
                          </div>
                        </div>
                        <hr />
                        <div className="location-1">
                          <div className="loc-desc">
                            <p className="loc-heading">Chicago - Gold Coast</p>
                            <p className="loc-address">
                              34 E Oak St. Fl 2 Chicago, IL 60611
                            </p>
                          </div>
                          <div className="select-btn">
                            <Link to="#">Select Showroom</Link>
                          </div>
                        </div>
                        <hr />
                        <div className="location-1">
                          <div className="loc-desc">
                            <p className="loc-heading">New York - Flatiron</p>
                            <p className="loc-address">
                              135 Fifth Avenue, Floor 2 NY, NY 10010
                            </p>
                          </div>
                          <div className="select-btn">
                            <Link to="#">Select Showroom</Link>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </Popup>
            </>
          }
        </div>
        <div className="checkout">
          <div className="checkout-left">
            <form action="">
              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    maxLength={30}
                    onChange={(e) =>
                      validateName(
                        e.target.value,
                        "pickup_firstName",
                        "First Name"
                      )
                    }
                    id="pickup_firstName"
                  />
                  <div className="error_1"></div>
                </div>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="Last Name"
                    id="pickup_lastName"
                    onChange={(e) =>
                      validateName(
                        e.target.value,
                        "pickup_lastName",
                        "Last Name"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
              </div>
              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="Email Address"
                    id="pickup_email"
                    onChange={(e) =>
                      validateEmail(
                        e.target.value,
                        "pickup_email",
                        "Email Address"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
                <div className="inputs">
                  <input
                    type="tel"
                    placeholder="Telephone"
                    id="pickup_telephone"
                    maxLength={10}
                    onChange={(e) =>
                      validateTelephone(
                        e.target.value,
                        "pickup_telephone",
                        "Telephone Number"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
              </div>

              <p className="billing">Billing Address</p>
              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    maxLength={30}
                    onChange={(e) =>
                      validateName(
                        e.target.value,
                        "pickup_billingfirstName",
                        "First Name"
                      )
                    }
                    id="pickup_billingfirstName"
                  />
                  <div className="error_1"></div>
                </div>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="Last Name"
                    id="pickup_billinglastName"
                    onChange={(e) =>
                      validateName(
                        e.target.value,
                        "pickup_billinglastName",
                        "Last Name"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
              </div>
              <div className="group-fields">
                <div className="full-width">
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    id="pickup_address"
                    onChange={(e) =>
                      validateAddress(
                        e.target.value,
                        "pickup_address",
                        "Address"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
                <div className="full-width">
                  <input type="text" placeholder="Address Line 2 (Optional)" />
                </div>
              </div>
              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="City"
                    onChange={(e) =>
                      validateName(e.target.value, "pickup_city", "City/Town")
                    }
                    id="pickup_city"
                  />
                  <div className="error_1"></div>
                </div>
                <select name="" id="">
                  <option value="">Select State / Province</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>
              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="Postcode"
                    id="pickup_postcode"
                    onChange={(e) =>
                      validatePostCode(
                        e.target.value,
                        "pickup_postcode",
                        "Zip Code"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
                <div className="inputs">
                  <select
                    name=""
                    id="pickup_selectCity"
                    onChange={(e) =>
                      validateAddress(
                        e.target.value,
                        "pickup_selectCity",
                        "City"
                      )
                    }
                  >
                    <option value="">Select Country</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Punjab">Punjab</option>
                  </select>
                  <div className="error_1"></div>
                </div>
              </div>
              <div className="group-fields">
                <div className="inputs">
                  <input
                    type="tel"
                    placeholder="Telephone"
                    id="pickup_billingtelephone"
                    maxLength={10}
                    onChange={(e) =>
                      validateTelephone(
                        e.target.value,
                        "pickup_billingtelephone",
                        "Telephone Number"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
              </div>

              <div className="checkboxes">
                <p>
                  <input type="checkbox" />
                  Send me Brilliant Earth news, updates & offers.
                </p>
              </div>
              <p className="account">Save Your Account (Optional)</p>
              <p className="save-account">
                Create an account to easily track your order and request a ring
                resize online.
              </p>

              <div className="group-fields two-fields">
                <div className="inputs">
                  <input
                    type="password"
                    placeholder="Password"
                    id="pickup_pass"
                    onChange={(e) =>
                      validatePass(e.target.value, "pickup_pass", "Password")
                    }
                    maxLength={8}
                  />
                  <div className="error_1"></div>
                </div>
                <div className="inputs">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="pickup_cpass"
                    maxLength={8}
                    onChange={(e) =>
                      validatePickupCpass(
                        e.target.value,
                        "pickup_cpass",
                        " Confirm Password"
                      )
                    }
                  />
                  <div className="error_1"></div>
                </div>
              </div>

              <div className="move-pages">
                <div className="move-cart">
                  <Link to="/cart">
                    <MdKeyboardArrowLeft />
                    Return To Shopping Bag
                  </Link>
                </div>
                <div className="continue-payment">
                  <button onClick={handleValidations}>
                    Continue To Payment
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="checkout-right">
                  {user_id ? (
                    <div className="checkout-right-scroll">
                      <h3>Order Summary</h3>
                      {cartDetails.map((item) => {
                        console.log(item);
                        const selectedMetalColor = metalColor.find(
                          (colorItem) => colorItem.value === item.active_color
                        );
                        return (
                          <>
                            <div className="order-summary">
                              {item.gemstone_id &&
                              item.ring?.id == null &&
                              item?.diamond_id == null ? (
                                item.gemstone?.map((gemstoneItem) => {
                                  return (
                                    <>
                                      <div className="main-cart-inner">
                                        <div className="cart-left-pic">
                                          <img
                                            src={gemstoneItem?.image_url}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="product-info-inner cart-middle-discription">
                                        <div className="cart-middle-discription-text">
                                          <span>
                                            {gemstoneItem?.short_title}
                                          </span>
                                        </div>
                                        <div className="cart-right-price">
                                          <p>
                                            {gemstoneItem?.total_sales_price}
                                          </p>
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
                                                      src={
                                                        diamondItem?.image_url
                                                      }
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
                                                    src={
                                                      gemstoneItem?.image_url
                                                    }
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
                                                          {diamondItem?.size}{" "}
                                                          Carat{" "}
                                                          {diamondItem?.shape}{" "}
                                                          Diamond
                                                        </Link>
                                                      </p>
                                                      <p className="small-text">
                                                        {diamondItem?.cut} Cut,{" "}
                                                        {diamondItem?.color}{" "}
                                                        Color,{" "}
                                                        {diamondItem?.clarity}{" "}
                                                        Clarity
                                                      </p>
                                                      <p className="small-text">
                                                        5587475AB
                                                      </p>
                                                    </div>
                                                    <div className="cart-right-price">
                                                      <p>
                                                        {
                                                          diamondItem
                                                            ?.total_sales_price
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                </>
                                              );
                                            })
                                        : item.gemstone.map((gemstoneItem) => {
                                            return (
                                              <>
                                                <div className="checkout-name-description">
                                                  <div className="checkout-left-des cart-right-price">
                                                    <p>
                                                      <Link to="#">
                                                        {
                                                          gemstoneItem?.short_title
                                                        }
                                                      </Link>
                                                    </p>
                                                    <p className="small-text">
                                                      {
                                                        gemstoneItem?.total_sales_price
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </>
                                            );
                                          })}

                                      {/* {item.diamond ? (
                                        <div className="available-list">
                                          <p>
                                            Only {item.diamondItem?.available}{" "}
                                            Available
                                          </p>
                                        </div>
                                      ) : null} */}
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
                                          <p>
                                            {diamondItem?.total_sales_price}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="checkout-right-scroll">
                      <h3>Order Summary</h3>
                      {cartData.map((item) => {
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
                                        {item.gemstoneSingle?.total_sales_price
                                          ? item.gemstoneSingle
                                              ?.total_sales_price
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
                                                  {item.diamondItem?.shape}{" "}
                                                  Diamond
                                                </Link>
                                              </p>
                                              <p className="small-text">
                                                {item.diamondItem?.cut} Cut,{" "}
                                                {item.diamondItem?.color} Color,{" "}
                                                {item.diamondItem?.clarity}{" "}
                                                Clarity
                                              </p>
                                              <p className="small-text">
                                                5587475AB
                                              </p>
                                            </div>
                                            <div className="cart-right-price">
                                              <p>
                                                {
                                                  item.diamondItem
                                                    ?.total_sales_price
                                                }
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
                                            <p>
                                              {item.gemstone?.total_sales_price}
                                            </p>
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
                                      <img
                                        src={item.diamonds?.image_url}
                                        alt=""
                                      />
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
                                      <p>{item.diamonds?.total_sales_price}</p>
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
    </>
  );
};
