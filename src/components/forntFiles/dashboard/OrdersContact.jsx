import React, { useContext, useEffect, useState } from "react";
import {
  validateCpass,
  validateEmail,
  validateName,
  validatePass,
} from "../ValidationFunctions";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../App";

export const OrdersContact = () => {
  const {baseUrl} = useContext(UserContext)
  function validatedPass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    if (element.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else {
      element.textContent = "";
    }
  }

  function validatedCpass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    const passwordValue = document.getElementById("new_password")?.value;

    if (value.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else if (value !== passwordValue) {
      element.textContent = `${error} do not match`;
    } else {
      element.textContent = "";
    }
  }

  // function handleOrdersValidation() {
  //   var nameValue = document.getElementById("orders-name");
  //   var lastValue = document.getElementById("orders-last");
  //   var emailValue = document.getElementById("orders-email");
  //   var newpass = document.getElementById("orders-new-pass");
  //   var cPass = document.getElementById("orders-cpass");

  //   validateName(nameValue, "orders-name", "First Name");
  //   validateName(lastValue, "orders-last", "Last Name");
  //   validateEmail(emailValue, "orders-email", "Email Address");
  //   validatePass(
  //     document.getElementById("orders-pass"),
  //     "orders-pass",
  //     "Password"
  //   );
  //   validatedPass(newpass, "orders-new-pass", "Pasword");
  //   validatedCpass(cPass, "orders-cpass", "Confirm Pasword");

  // }
  const user_id = localStorage.getItem("formData");
  // =============
  const handleChangePassword = (event) => {
    event.preventDefault();

    const formData = {
      first_name: document.getElementById("fname").value,
      last_name: document.getElementById("lname").value,
      email: document.getElementById("create-email").value,
      current_password: document.getElementById("create-pass").value,
      password: document.getElementById("new_password").value,
      c_password: document.getElementById("create-cpass").value,
      newsletter: document.querySelector('input[name="newsletter"]').checked,
    };
    console.log(formData);
    axios
    .get(
      `${baseUrl}/update_preferences/${user_id}?first_name=${formData.first_name}&last_name=${formData.last_name}&email=${formData.email}&current_password=${formData.current_password}&password=${formData.password}&c_password=${formData.c_password}&send_updates=${formData.send_updates}&newsletter=${formData.newsletter}`
    )
    .then((res)=>{
          console.log(res);
    })
    .catch(()=>{
      console.log("profile api error");
    })

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
    validatePass(
      document.getElementById("new_password").value,
      "new_password",
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
  return (
    <>
      <div class="account-right-data">
        <div class="setting-acc-main">
          <h1 class="h2">My Account</h1>
          <h2 class="h3">Update Account Information </h2>

          <div class="update-acc-form">
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
                  validateEmail(e.target.value, "create-email", "Email Address")
                }
              />
              <div className="error_1"></div>

              <input
                className="form-control"
                type="password"
                maxLength="8"
                name="password"
                placeholder="Current Password"
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
                placeholder="New Password"
                id="new_password"
                onChange={(e) =>
                  validatePass(e.target.value, "new_password", "Password")
                }
              />
              <div className="error_1"></div>

              <input
                className="form-control"
                type="password"
                maxLength="8"
                name="c_password"
                placeholder="Conform Password"
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
                  Email me Brilliant Earth news, updates and offers.
                </label>
              </div>
              <p className="pt-10">
                <button
                  className="btn btn-success btn-lg btn-block"
                  type="submit"
                  onClick={handleChangePassword}
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
    </>
  );
};
