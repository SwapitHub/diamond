import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { toast } from "react-toastify";
import {
  validateEmail,
  validateName,
  validatePass,
} from "./ValidationFunctions";

import { useSelector } from "react-redux";
export const LoginSignup = () => {
  const history = useHistory();
  const cartData = useSelector((state) => state.cartData);
  console.log(cartData);
  const wishlistData = useSelector((state) => state.wishlistData);
  console.log(wishlistData);
  function validatedCpass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    const passwordValue = document.getElementById("create-pass").value;

    if (value.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else if (value !== passwordValue) {
      element.textContent = `${error} do not match`;
    } else {
      element.textContent = "";
    }
  }

  const handleValidationsSignIn = (event) => {
    event.preventDefault();
    const formData = {
      email: document.getElementById("sign-email").value,
      password: document.getElementById("sign-pass").value,
      newsletter: document.querySelector('input[name="newsletter"]').checked,
    };

    if (formData.email == "" && formData.password == "") {
      validateEmail(
        document.getElementById("sign-email").value,
        "sign-email",
        "Email Address"
      );
      validatePass(
        document.getElementById("sign-pass").value,
        "sign-pass",
        "Password"
      );
    } else {
      axios
        .get(
          `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/login?email=${formData.email}&password=${formData.password}`
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("=================", response.data.data);
            const user_id = response.data.data.user_id;
            localStorage.setItem(
              "formData",
              JSON.stringify(response.data.data.user_id)
            );
            const formData = localStorage.getItem("formData");

            const cartLocalData =
              JSON.parse(localStorage.getItem("cart_data")) || [];
            cartData.forEach((item) => {
              console.log(item);
              // ===========
              var URL = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cart?user_id=${user_id}&ring_price=${
                item?.ring_price !== undefined ? item?.ring_price : ""
              }&ring_id=${
                item.ring_data?.id !== undefined ? item.ring_data?.id : ""
              }&ring_color=${
                item?.ring_color !== undefined ? item?.ring_color : ""
              }&diamond_id=${
                item.diamonds
                  ? item.diamonds?.stock_num !== undefined
                    ? item.diamonds?.stock_num
                    : ""
                  : item.diamondItem?.stock_num !== undefined
                  ? item.diamondItem?.stock_num
                  : ""
              }&diamond_price=${
                item.diamonds
                  ? item.diamonds?.total_sales_price !== undefined
                    ? item.diamonds?.total_sales_price
                    : ""
                  : item.diamondItem?.total_sales_price !== undefined
                  ? item.diamondItem?.total_sales_price
                  : ""
              }&img_sku=${
                item?.ring_img !== undefined ? item?.ring_img : ""
              }         

            &gemstone_price=${
              item.gemstone
                ? item.gemstone?.total_sales_price !== undefined
                  ? item.gemstone?.total_sales_price
                  : ""
                : item.item?.total_sales_price !== undefined
                ? item.item?.total_sales_price
                : ""
            }&gemstone_id=${
                item.gemstone
                  ? item.gemstone?.stock_num !== undefined
                    ? item.gemstone?.stock_num
                    : ""
                  : item.item?.stock_num !== undefined
                  ? item.item?.stock_num
                  : ""
              }&ring_type="natural"&ring_size=${item?.ring_size}`;

              console.log("cart URL==========", URL);
              axios
                .get(
                  URL,

                  {
                    headers: {
                      "Content-Type": "application/json",
                      "X-CSRF-TOKEN": shapeData,
                    },
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    console.log(
                      "=================cart data user id",
                      response.data.data
                    );
                  } else {
                    console.error("Error Status:", response.status);
                  }
                })

                .catch((error) => {
                  console.error("Error:", error);
                });
              // ============
            });

            toast.success("Login Successfully !", {
              position: "top-right",
            });

            setTimeout(() => {
              history.push("/accounts");
              window.location.reload(true);
            }, 3000);

            wishlistData.forEach((item) => {
              var wishListURL = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${user_id}&ring_price=${
                item.product_type === "ring"
                  ? item.item?.white_gold_price
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_data.white_gold_price
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_data.white_gold_price
                  : ""
              }&ring_id=${
                item.product_type === "ring"
                  ? item.item?.id
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_data.id
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_data.id
                  : ""
              }&ring_color=${
                item.product_type === "ring" && item?.ring_color !== undefined
                  ? item?.ring_color
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_color
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_color
                  : ""
              }
            &img_sku=${
              item.product_type === "ring" && item.item?.images !== undefined
                ? item.item?.images
                : item.product_type === "ring_diamond"
                ? item.removingItem.ring_img
                : item.product_type === "ring_gemstone"
                ? item.removingItem.ring_img
                : ""
            } 
           
            &diamond_id=${
              item.product_type === "diamond"
                ? item.diamonds?.stock_num
                : item.product_type === "ring_diamond"
                ? item.diamond?.stock_num
                : ""
            }&diamond_price=${
                item.product_type === "diamond"
                  ? item.diamonds?.total_sales_price
                  : item.product_type === "ring_diamond"
                  ? item.diamond?.total_sales_price
                  : ""
              }      
           
            &gemstone_price=${
              item.product_type === "gemstone" ||
              item.product_type === "ghemstone"
                ? item.item?.total_sales_price
                : item.product_type === "ring_gemstone"
                ? item.diamond?.total_sales_price
                : ""
            }&gemstone_id=${
                item.product_type === "gemstone" ||
                item.product_type === "ghemstone"
                  ? item.item.stock_num
                  : item.product_type === "ring_gemstone"
                  ? item.diamond.stock_num
                  : ""
              }
            &product_type=${
              item.product_type === "gemstone"
                ? "gemstone"
                : item.product_type === "ring"
                ? "ring"
                : item.product_type === "diamond"
                ? "diamond"
                : item.product_type === "ring_diamond"
                ? "ring_diamond"
                : item.product_type === "ring_gemstone"
                ? "ring_gemstone"
                : ""
            }
            &ring_type="natural"
            `;

              console.log("wishlist URL==========", wishListURL);
              axios
                .get(wishListURL, {
                  headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": shapeData,
                  },
                })
                .then((response) => {
                  if (response.status === 200) {
                    console.log(
                      "=================cart data user id",
                      response.data.data
                    );
                  } else {
                    console.error("Error Status:", response.status);
                  }
                })

                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          } else {
            console.error("Error Status:", response.status);
          }
        })

        .catch((error) => {
          document.querySelector("#sign-email + .error_1").textContent =
            "Email/Password not match";
        });
    }
  };

  const handleCreateAccount = async (event) => {
    // sighup form code start here
    event.preventDefault();
    try {
      const formData = {
        first_name: document.getElementById("fname").value,
        last_name: document.getElementById("lname").value,
        email: document.getElementById("create-email").value,
        password: document.getElementById("create-pass").value,
        c_password: document.getElementById("create-cpass").value,
        newsletter: document.querySelector('input[name="newsletter"]').checked,
      };
      console.log(formData);
      const response = await axios.post(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/user-registration",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": shapeData,
            // Add other headers if needed
          },
        }
      );

      if (response.status === 200) {
        console.log("Success:", response.data);
        toast.success(response.data?.msg, {
          position: "top-right",
        });
      } else {
        console.error("Error:", response.statusText);
        toast.error("this email already exist", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // sighup form code end here

    // ========================================
    validateName(document.getElementById("fname").value, "fname", "First Name");
    validateName(document.getElementById("lname").value, "lname", "Last Name");
    validateEmail(
      document.getElementById("create-email").value,
      "create-email",
      "Email Address"
    );
    validatePass(
      document.getElementById("create-pass").value,
      "create-pass",
      "Password"
    );
    validatedCpass(
      document.getElementById("create-cpass").value,
      "create-cpass",
      "Confirm Password"
    );

    // history.push("/");
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

  // The rest of your component code...

  // The rest of your component code...

  return (
    <>
      <div className="my-accout-section">
        <div className="container">
          <div className="breadcrums">
            <ul>
              <li>
                <Link to="/">Home /</Link>
              </li>
              <li>
                <Link to="/customer-care">Customer Service /</Link>
              </li>
              <li>
                <Link to="/login">Account /</Link>
              </li>
              <li>
                <Link to="/password_reset">Password Reset </Link>
              </li>
            </ul>
          </div>
          <div className="title">
            <h2>My Account</h2>
          </div>

          <div className="accout-inner">
            <div className="sign-in-accout form-layout">
              <h3>Sign In</h3>
              <p>If you have a Sama customer account, please sign in.</p>

              <form
                enctype="multipart/form-data"
                // method="post"
                action=""
                className="form-search"
              >
                <input
                  type="text"
                  name="first_name"
                  placeholder="Email Address"
                  id="sign-email"
                  onChange={(e) =>
                    validateEmail(e.target.value, "sign-email", "Email Address")
                  }
                />
                <div className="error_1"></div>

                <input
                  type="password"
                  placeholder="Password"
                  id="sign-pass"
                  maxLength={8}
                  onChange={(e) =>
                    validatePass(e.target.value, "sign-pass", "Password")
                  }
                />
                <div className="error_1"></div>

                <p>
                  <Link className="forget" to="/password_reset">
                    Forgot your password?
                  </Link>
                </p>

                <button
                  type="submit"
                  className="btn"
                  onClick={handleValidationsSignIn}
                >
                  sign in
                </button>
              </form>
            </div>

            <div className="create-accout form-layout">
              <h3>Create an Account</h3>
              <p>Enjoy the benefits of a Sama account:</p>
              <ul className="acc-list">
                <li>Save items to Wish List and Shopping Cart</li>
                <li>Request a ring resize online</li>
                <li>Faster check out</li>
                <li>Exclusive offers</li>
                <li>View Order History</li>
              </ul>

              <form
                className="form-search"
                enctype="multipart/form-data"
                method="post"
                action=""
              >
                <input
                  className="form-control"
                  type="text"
                  maxLength="30"
                  name="first_name"
                  placeholder="First Name"
                  id="fname"
                  onChange={(e) =>
                    validateName(e.target.value, "fname", "First Name")
                  }
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="text"
                  maxLength="30"
                  name="last_name"
                  placeholder="Last Name"
                  id="lname"
                  onChange={(e) =>
                    validateName(e.target.value, "lname", "Last Name")
                  }
                />
                <div className="error_1"></div>

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

                <input
                  className="form-control"
                  type="password"
                  maxLength="8"
                  name="password"
                  placeholder="Password"
                  id="create-pass"
                  onChange={(e) =>
                    validatePass(e.target.value, "create-pass", "Password")
                  }
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="password"
                  maxLength="8"
                  name="c_password"
                  placeholder="Confirm Password"
                  id="create-cpass"
                  onChange={(e) =>
                    validatedCpass(e.target.value, "create-cpass", "Password")
                  }
                />
                <div className="error_1"></div>

                <p>
                  Passwords are case sensitive and must be at least 6 characters
                  long.
                </p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" name="newsletter" />
                    Email me Sama news, updates and offers.
                  </label>
                </div>
                <p className="pt-10">
                  <button
                    className="btn btn-success btn-lg btn-block"
                    type="submit"
                    onClick={handleCreateAccount}
                  >
                    create account
                  </button>
                </p>
                <p className="mt-30 fs-12">
                  Your privacy is important to us. By Clicking “Create Account”,
                  you agree to our
                  <Link className="td-u" to="/terms">
                    Terms
                  </Link>
                  and
                  <Link className="td-u" to="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
