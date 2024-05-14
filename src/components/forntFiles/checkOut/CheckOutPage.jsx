import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";

import axios from "axios";
import {
  validateAddress,
  validateCpass,
  validateEmail,
  validateName,
  validatePass,
  validatePostCode,
  validateTelephone,
} from "../ValidationFunctions";
import { Pickup } from "./Pickup";

export const CheckOutPage = () => {
  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";

  const cartData = useSelector((state) => state.cartData);
  const cartDetails = useSelector((state) => state.productDataCart);
  const history = useHistory();
  console.log("============", cartDetails);
  const user_id = localStorage.getItem("formData");

  const [toggle, setToggle] = useState(1);
  const [checked, setChecked] = useState(true);
  console.log(checked);

  function handleChange() {
    setChecked(!checked);
  }

  const handleShipData = () => {
    const formData = {
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,

      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postcode: document.getElementById("postcode").value,
      email: document.getElementById("create-email").value,
      telephone: document.getElementById("telephone").value,
      selectCity: document.getElementById("selectCity").value,
      selectState: document.getElementById("selectState").value,
    };

    const addressId = [];

    const URL = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/save-users-address?user_id=${user_id}&address_type=${
      checked ? "both" : "shipping_address"
    }&first_name=${formData.first_name}&last_name=${
      formData.last_name
    }&address_line1=${formData.address}&address_line2&city=${
      formData.selectCity
    }&state=${formData.selectState}&zipcode=${
      formData.postcode
    }&country=India&email=${formData.email}&phone=${
      formData.telephone
    }&send_me_updates=true`;
    console.log(URL);
    axios
      .get(
        URL,

        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": shapeData,
            // Add other headers if needed
          },
        }
      )

      .then((response) => {
        if (response.status === 200) {
          console.log("=================cart data user id", response.data.data);
          addressId.push(response.data.data?.id);
          const indexString = addressId.join(",");
          history.push(`/payment?address_id=${indexString}`);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
    if (!checked) {
      const formData_1 = {
        first_name: document.getElementById("billingfirstName").value,
        last_name: document.getElementById("billinglastName").value,

        address: document.getElementById("billingaddress").value,
        city: document.getElementById("billingcity").value,
        postcode: document.getElementById("billingpostcode").value,
        telephone: document.getElementById("billingtelephone").value,
        selectCity: document.getElementById("billingselectCity").value,
        selectState: document.getElementById("billingselectState").value,
      };

      const URL_1 = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/save-users-address?user_id=${user_id}&address_type=billing_address&first_name=${formData_1.first_name}&last_name=${formData_1.last_name}&address_line1=${formData_1.address}&address_line2&city=${formData_1.selectCity}&state=${formData_1.selectState}&zipcode=${formData_1?.postcode}&country=India&email=${formData?.email}.com&phone=${formData_1.telephone}&send_me_updates=true`;
      console.log(URL_1);
      axios
        .get(
          URL_1

          // {
          //   headers: {
          //     "Content-Type": "application/json",
          //     "X-CSRF-TOKEN": shapeData,
          //   },
          // }
        )

        .then((response) => {
          if (response.status === 200) {
            console.log(
              "=================cart data user id",
              response.data.data
            );
            addressId.push(response.data.data?.id);
          } else {
            console.error("Error Status:", response.status);
          }
        })

        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(formData_1);
    }
  };

  const handleValidations = (event) => {
    event?.preventDefault();

    // ====================
    validateName(
      document.getElementById("firstName").value,
      "firstName",
      "First Name"
    );
    validateName(
      document.getElementById("lastName").value,
      "lastName",
      "Last Name"
    );
    validateAddress(
      document.getElementById("address").value,
      "address",
      "Address"
    );
    validateName(document.getElementById("city").value, "city", "City/Town");
    validatePostCode(
      document.getElementById("postcode").value,
      "postcode",
      "Zip Code"
    );

    validateEmail(
      document.getElementById("create-email").value,
      "create-email",
      "Email Address"
    );
    validateTelephone(
      document.getElementById("telephone").value,
      "telephone",
      "Telephone"
    );
    validateAddress(
      document.getElementById("selectCity").value,
      "selectCity",
      "City"
    );
    validateAddress(
      document.getElementById("selectState").value,
      "selectState",
      "State"
    );
    !user_id &&
      validatePass(document.getElementById("pass").value, "pass", "Password");
    !user_id &&
      validateCpass(
        document.getElementById("cpass").value,
        "cpass",
        "Confirm Password"
      );

    console.log("Checked:", checked);
    if (!checked) {
      validateName(
        document.getElementById("billingfirstName").value,
        "billingfirstName",
        "First Name"
      );
      validateName(
        document.getElementById("billinglastName").value,
        "billinglastName",
        "Last Name"
      );
      validateAddress(
        document.getElementById("billingaddress").value,
        "billingaddress",
        "Address"
      );
      validateName(
        document.getElementById("billingcity").value,
        "billingcity",
        "City/Town"
      );
      validatePostCode(
        document.getElementById("billingpostcode").value,
        "billingpostcode",
        "Zip Code"
      );
      validateTelephone(
        document.getElementById("billingtelephone").value,
        "billingtelephone",
        "Telephone"
      );
      validateAddress(
        document.getElementById("billingselectCity").value,
        "billingselectCity",
        "City"
      );
      validateAddress(
        document.getElementById("billingselectState").value,
        "billingselectState",
        "State"
      );
    }
  };
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
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/metalcolor"
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
  return (
    <>
      <div className="checkout-info">
        <div className="container">
          <div className="checkout-info">
            <h3>Ship</h3>
            {/* <div className="checkout-pickup">
              <Link
                to="#"
                onClick={() => setToggle(1)}
                className={toggle === 1 ? "click-active" : ""}
              >
                Ship
              </Link>
              <Link
                to="#"
                onClick={() => setToggle(2)}
                className={toggle === 2 ? "click-active" : ""}
              >
                Pick Up
              </Link>
            </div> */}
            {toggle === 1 ? (
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
                              "firstName",
                              "First Name"
                            )
                          }
                          id="firstName"
                        />
                        <div className="error_1"></div>
                      </div>
                      <div className="inputs">
                        <input
                          type="text"
                          placeholder="Last Name"
                          id="lastName"
                          onChange={(e) =>
                            validateName(
                              e.target.value,
                              "lastName",
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
                          id="address"
                          onChange={(e) =>
                            validateAddress(
                              e.target.value,
                              "address",
                              "Address"
                            )
                          }
                        />
                        <div className="error_1"></div>
                      </div>
                      <div className="full-width">
                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                        />
                      </div>
                    </div>
                    <div className="group-fields two-fields">
                      <div className="inputs">
                        <input
                          type="text"
                          placeholder="City"
                          onChange={(e) =>
                            validateName(e.target.value, "city", "City/Town")
                          }
                          id="city"
                        />
                        <div className="error_1"></div>
                      </div>
                      <div className="inputs">
                        <select
                          name=""
                          id="selectState"
                          onChange={(e) =>
                            validateAddress(
                              e.target.value,
                              "selectState",
                              "State"
                            )
                          }
                        >
                          <option value="">Select State / Province</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Jammu & Kashmir">
                            Jammu & Kashmir
                          </option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Punjab">Punjab</option>
                        </select>
                        <div className="error_1"></div>
                      </div>
                    </div>
                    <div className="group-fields two-fields">
                      <div className="inputs">
                        <input
                          type="text"
                          placeholder="Zip Code"
                          id="postcode"
                          onChange={(e) =>
                            validatePostCode(
                              e.target.value,
                              "postcode",
                              "Zip Code"
                            )
                          }
                        />
                        <div className="error_1"></div>
                      </div>
                      <div className="inputs">
                        <select
                          name=""
                          id="selectCity"
                          onChange={(e) =>
                            validateAddress(
                              e.target.value,
                              "selectCity",
                              "City"
                            )
                          }
                        >
                          <option value="">Select Country</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Jammu & Kashmir">
                            Jammu & Kashmir
                          </option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Punjab">Punjab</option>
                        </select>
                        <div className="error_1"></div>
                      </div>
                    </div>
                    <div className="group-fields two-fields">
                      <div className="inputs">
                        <input
                          type="email"
                          className="form-control"
                          maxLength="75"
                          name="email"
                          placeholder="Email Address"
                          id="create-email"
                          onChange={(e) =>
                            validateEmail(
                              e.target.value,
                              "create-email",
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
                          id="telephone"
                          maxLength={10}
                          onChange={(e) =>
                            validateTelephone(
                              e.target.value,
                              "telephone",
                              "Telephone Number"
                            )
                          }
                        />
                        <div className="error_1"></div>
                      </div>
                    </div>

                    <div className="checkboxes">
                      <p>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleChange()}
                        />
                        Use this address for billing
                      </p>
                      {!checked ? (
                        <div>
                          <div className="group-fields two-fields">
                            <div className="inputs">
                              <input
                                type="text"
                                placeholder="First Name"
                                maxLength={30}
                                onChange={(e) =>
                                  validateName(
                                    e.target.value,
                                    "billingfirstName",
                                    "First Name"
                                  )
                                }
                                id="billingfirstName"
                              />
                              <div className="error_1"></div>
                            </div>
                            <div className="inputs">
                              <input
                                type="text"
                                placeholder="Last Name"
                                id="billinglastName"
                                onChange={(e) =>
                                  validateName(
                                    e.target.value,
                                    "billinglastName",
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
                                id="billingaddress"
                                onChange={(e) =>
                                  validateAddress(
                                    e.target.value,
                                    "billingaddress",
                                    "Address"
                                  )
                                }
                              />
                              <div className="error_1"></div>
                            </div>
                            <div className="full-width">
                              <input
                                type="text"
                                placeholder="Address Line 2 (Optional)"
                              />
                            </div>
                          </div>
                          <div className="group-fields two-fields">
                            <div className="inputs">
                              <input
                                type="text"
                                placeholder="City"
                                onChange={(e) =>
                                  validateName(
                                    e.target.value,
                                    "billingcity",
                                    "City/Town"
                                  )
                                }
                                id="billingcity"
                              />
                              <div className="error_1"></div>
                            </div>
                            <div className="inputs">
                              <select name=""
                                id="billingselectState"
                                onChange={(e) =>
                                  validateAddress(
                                    e.target.value,
                                    "billingselectState",
                                    "State"
                                  )
                                }>
                                <option value="">
                                  Select State / Province
                                </option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu & Kashmir">
                                  Jammu & Kashmir
                                </option>
                                <option value="Uttar Pradesh">
                                  Uttar Pradesh
                                </option>
                                <option value="Punjab">Punjab</option>
                              </select>
                              <div className="error_1"></div>
                            </div>
                          </div>
                          <div className="group-fields two-fields">
                            <div className="inputs">
                              <input
                                type="text"
                                placeholder="Postcode"
                                id="billingpostcode"
                                maxLength={6}
                                onChange={(e) =>
                                  validatePostCode(
                                    e.target.value,
                                    "billingpostcode",
                                    "Zip Code"
                                  )
                                }
                              />
                              <div className="error_1"></div>
                            </div>
                            <div className="inputs">
                              <select
                                name=""
                                id="billingselectCity"
                                onChange={(e) =>
                                  validateAddress(
                                    e.target.value,
                                    "billingselectCity",
                                    "City"
                                  )
                                }
                              >
                                <option value="">Select Country</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu & Kashmir">
                                  Jammu & Kashmir
                                </option>
                                <option value="Uttar Pradesh">
                                  Uttar Pradesh
                                </option>
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
                                id="billingtelephone"
                                maxLength={10}
                                onChange={(e) =>
                                  validateTelephone(
                                    e.target.value,
                                    "billingtelephone",
                                    "Telephone Number"
                                  )
                                }
                              />
                              <div className="error_1"></div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <p>
                        <input type="checkbox" />
                        Send me News, updates & offers
                      </p>
                    </div>
                    <p className="account">Save Your Account (Optional)</p>
                    <p className="save-account">
                      Create an account to easily track your order and request a
                      ring resize online.
                    </p>

                    {!user_id && (
                      <div className="group-fields two-fields">
                        <div className="inputs">
                          <input
                            type="password"
                            placeholder="Password"
                            id="pass"
                            onChange={(e) =>
                              validatePass(e.target.value, "pass", "Password")
                            }
                            maxLength={8}
                          />
                          <div className="error_1"></div>
                        </div>

                        <div className="inputs">
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            id="cpass"
                            maxLength={8}
                            onChange={(e) =>
                              validateCpass(e.target.value, "cpass", "Password")
                            }
                          />
                          <div className="error_1"></div>
                        </div>
                      </div>
                    )}

                    <div className="move-pages">
                      <div className="move-cart">
                        <Link to="/cart">
                          <MdKeyboardArrowLeft />
                          Return To Shopping Bag
                        </Link>
                      </div>
                      <div className="continue-payment">
                        <Link
                          // to="/payment"
                          onClick={(e) => {
                            if (
                              document.getElementById("firstName").value ===
                                "" &&
                              document.getElementById("lastName").value ===
                                "" &&
                              document.getElementById("address").value === "" &&
                              document.getElementById("city").value === "" &&
                              document.getElementById("postcode").value ===
                                "" &&
                              document.getElementById("create-email").value ===
                                "" &&
                              document.getElementById("telephone").value ===
                                "" &&
                              document.getElementById("selectCity").value ===
                                "" &&
                              document.getElementById("selectState").value ===
                                ""
                            ) {
                              e.preventDefault();
                              handleValidations();
                            } else {
                              handleShipData();
                            }
                          }}
                        >
                          Continue To Payment
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="checkout-right">
                  {user_id ? (
                    <div className="checkout-right-scroll">
                      <h3>Order Summary</h3>
                      {cartDetails?.map((item) => {
                        const selectedMetalColor = metalColor.find(
                          (colorItem) => colorItem?.value === item?.active_color
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
            ) : (
              <Pickup />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
