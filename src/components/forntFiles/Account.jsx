import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { toast } from "react-toastify";
import { validateEmail, validatePass } from "./ValidationFunctions";
import { UserContext } from "../../App";

export const Account = () => {
  const {baseUrl} = useContext(UserContext)
  const history = useHistory();
  const [shapeData, setShapeData] = useState([]);
  const cartData = useSelector((state) => state.cartData);

  const wishlistData = useSelector((state) => state.wishlistData);

  const handleValidationsSignIn = (event) => {
    event.preventDefault();
    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("pass").value,
      // newsletter: document.querySelector('input[name="newsletter"]').checked,
    };
    if (formData.email == "" && formData.password == "") {
      validateEmail(
        document.getElementById("email").value,
        "email",
        "Email Address"
      );
      validatePass(document.getElementById("pass").value, "pass", "Password");
    } else {
      axios
        .get(
          `${baseUrl}/login?email=${formData.email}&password=${formData.password}`
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
              var URL = `${baseUrl}/cart?user_id=${user_id}&ring_price=${
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
              var wishListURL = `${baseUrl}/add_to_wishlist?user_id=${user_id}&ring_price=${
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
          document.querySelector("#email + .error_1").textContent =
            "Email/Password not match";
        });
    }
  };

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
  return (
    <>
      <div id="user-log" className="login">
        <div className="login-inner">
          <p>Don't have an Account?</p>
          <Link className="btn" to="/login">
            Create An Account
          </Link>
          <p>Sign In to Your Account</p>
          <form enctype="multipart/form-data" method="post" action="">
            <input
              type="text"
              placeholder="Email Address"
              id="email"
              onChange={(e) =>
                validateEmail(e.target.value, "email", "Email Address")
              }
            />
            <div className="error_1"></div>
            <input
              type="password"
              placeholder="Password"
              id="pass"
              maxLength={8}
              onChange={(e) => validatePass(e.target.value, "pass", "Password")}
            />
            <div className="error_1"></div>
          </form>
          <p>
            <Link className="forgot" to="/password_reset">
              Forgot Your Password?
            </Link>
          </p>

          <button
            type="submit"
            className="submit"
            onClick={handleValidationsSignIn}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </>
  );
};
