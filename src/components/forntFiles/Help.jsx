import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, validateName } from "./ValidationFunctions";
import { IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import Popup from "reactjs-popup";
import { DropHint } from "./DropHint";
import Select from "react-select";

export const Help = () => {
  function handleHelpValidations() {
    validateName(
      document.getElementById("help-name").value,
      "help-name",
      "First Name"
    );
    validateName(
      document.getElementById("help-last").value,
      "help-last",
      "Last Name"
    );
    validateEmail(
      document.getElementById("help-email").value,
      "help-email",
      "Email Address"
    );
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="request-help-main">
        <div className="container">
          <div className="request-helped-cnt">
            <h2> Need Help?</h2>
            <p>
              Our jewelry specialists are happy to answer your <br />
              questions about this product.
            </p>
          </div>
          <div className="request-help-inner">
            <div className="request-help-left">
              <form className="form-search">
                <input
                  className="form-control"
                  type="text"
                  maxlength="30"
                  name="first_name"
                  placeholder="First Name"
                  id="help-name"
                  onChange={(e) =>
                    validateName(e.target.value, "help-name", "First Name")
                  }
                />
                <div className="error_1"></div>
                <input
                  className="form-control"
                  type="text"
                  maxlength="30"
                  name="last_name"
                  placeholder="Last Name"
                  id="help-last"
                  onChange={(e) =>
                    validateName(e.target.value, "help-last", "Last Name")
                  }
                />
                <div className="error_1"></div>
                <input
                  type="email"
                  className="form-control"
                  maxlength="75"
                  name="email"
                  placeholder="Email Address"
                  id="help-email"
                  onChange={(e) =>
                    validateEmail(e.target.value, "help-email", "Email Address")
                  }
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="number"
                  maxlength="30"
                  name="phone"
                  placeholder="phone (Optional)"
                />

                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    id="input_message"
                    placeholder="message"
                    style={{ height: "5em" }}
                    name="message"
                    maxlength="300"
                  ></textarea>
                </div>

                <div className="form-group">
                  <input type="checkbox" id="updatesCheckbox" />
                  <label htmlFor="updatesCheckbox">
                    Send me updates on new styles and special offers.
                  </label>
                </div>

                <p className="pt-10">
                  <button
                    className="btn"
                    type="button"
                    onClick={handleHelpValidations}
                  >
                    submit
                  </button>
                </p>
                <p className="privacy-views">
                  Your privacy is important to us.{" "}
                  <Link className="td-u" to="/privacy-policy">
                    view Privacy Policy 
                  </Link>
                  .
                </p>
              </form>
            </div>
            <div className="request-help-middle">
              <div className="product-of-interest text-center pt-30">
                <Link to="#">
                  <img src="https://image.brilliantearth.com/media/diamond_ring_vto/DJ/BE18959_yellow_Oval_top_75_carat.png" />
                </Link>
                <h5>
                  <Link to="#">
                    18K Yellow Gold Petite Elodie Solitaire Ring
                  </Link>
                </h5>
                <p>BE18959-18KY</p>
              </div>
            </div>
            <div className="request-help-right">
              <div className="need immediate-main">
                <h4>need immediate help?</h4>
                <ul className="immediate-assistance">
                  <li>
                    <h5>
                      <Link to="#">
                        <IoChatbubbleOutline />
                        chat now
                      </Link>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <Link to="/contact">
                        <IoCallOutline />
                        800.691.0952
                      </Link>
                    </h5>
                  </li>
                </ul>
                <h4>special requests?</h4>
                <p>
                  We can customize any of our standard items to fit your
                  personal style and preferences.
                </p>

                <h4>
                  <Link to="#" className="drop-hint">
                    Dropping a Hint?
                  </Link>
                </h4>
                <p>Click Drop Hint to share this product with a friend!</p>
                <div className="fore1">
                  <Link to="#">
                    <Popup
                      trigger={
                        <Link to="#">
                          {" "}
                          <IoIosMail /> Drop Hint
                        </Link>
                      }
                      open={open}
                      closeOnDocumentClick
                      onOpen={()=>setOpen(true)}
                      onClose={() => setOpen(false)}
                      position="left center"
                    >
                      <DropHint setOpen={setOpen} />
                    </Popup>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
