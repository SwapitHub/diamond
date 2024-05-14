import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPhone, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsChat } from "react-icons/bs";
import { validateEmail, validateName } from "../ValidationFunctions";

export const NeedAssistance = ({ setIsOpen }) => {
  function handleDashboardValidation() {
    var nameValue = document.getElementById("input_first_name");
    var lastValue = document.getElementById("input_last_name");
    var emailValue = document.getElementById("input_email");

    validateName(nameValue, "input_first_name", "First Name");
    validateName(lastValue, "input_last_name", "Last Name");
    validateEmail(emailValue, "input_email", "Email Address");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <>
      <section className="popup-need-assis">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Need Assistance?</h3>
              <Link to="#" onClick={() => setIsOpen(false)}>
                <IoMdClose />
              </Link>
            </div>
            <div className="need-form-row">
              <div className="ass-form-left">
                <div className="assistance-form">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      id="input_first_name"
                      placeholder="First Name"
                      name="first_name"
                      maxLength="32"
                      onChange={(e) =>
                        validateName(
                          e.target.value,
                          "input_first_name",
                          "First Name"
                        )
                      }
                    />
                    <div className="error_1"></div>
                    <input
                      type="text"
                      className="form-control"
                      id="input_last_name"
                      placeholder="Last Name"
                      name="last_name"
                      maxLength="32"
                      onChange={(e) =>
                        validateName(
                          e.target.value,
                          "input_last_name",
                          "Last Name"
                        )
                      }
                    />
                    <div className="error_1"></div>

                    <input
                      type="text"
                      className="form-control"
                      id="input_email"
                      placeholder="Email Address"
                      name="email"
                      maxLength="75"
                      onChange={(e) =>
                        validateEmail(
                          e.target.value,
                          "input_email",
                          "Email Address"
                        )
                      }
                    />
                    <div className="error_1"></div>
                    <input
                      type="text"
                      className="form-control"
                      id="input_phone"
                      placeholder="Phone (Optional)"
                      name="phone"
                      maxLength="16"
                    />
                    <div className="error_1"></div>
                    <textarea
                      className="form-control"
                      id="input_message"
                      placeholder="Message"
                      style={{ height: "6em" }}
                      name="message"
                      maxLength="300"
                    ></textarea>
                    <label className="check-box">
                      <input type="checkbox" />
                      Send me updates on new styles and special offers.
                    </label>
                    <Link
                      className="btn"
                      data-category="Form Submit"
                      onClick={handleDashboardValidation}
                    >
                      REQUEST GUIDANCE
                    </Link>
                  </form>
                </div>
              </div>

              <div className="ass-detail-right">
                <div className="get-ass">
                  <ul>
                    <li>
                      <Link to="#">
                        <span>
                          {" "}
                          <FaUser />
                        </span>
                        Virtual Appointment
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span>
                          <FaLocationDot />
                        </span>
                        Visit Our Showrooms
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span>
                          <BsChat />
                        </span>
                        Live Chat
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span>
                          {" "}
                          <FaPhoneAlt />
                        </span>
                        Call Us 800.691.0952
                      </Link>
                    </li>
                  </ul>
                  <p className="mt-20 mb-20">
                    Customer Service Hours:
                    <br />
                    Our jewelry specialists are available 24/7.
                  </p>
                  <p className="text-66">
                    <span>
                      <Link to="#" className="mr10 td-u">
                        View FAQs
                      </Link>{" "}
                    </span>
                    <span>
                      <Link to="#" className="td-u">
                        View Customer Service
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center">
              Your privacy is important to us.{" "}
              <span>
                <Link
                  to="/security-and-privacy-policies/#privacy"
                  className="td-u"
                >
                  View Privacy Policy
                </Link>
                .
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
