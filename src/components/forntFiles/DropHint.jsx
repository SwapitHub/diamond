import React, { useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { validateEmail, validateName } from "./ValidationFunctions";

export const DropHint = ({setOpen}) => {
  const [click, setClick] = useState(false);

  function handleDropValidations() {
    const recipientEmail = document.getElementById("drop-recipient").value;
    const yourEmail = document.getElementById("drop-email").value;
    const yourName = document.getElementById("drop-name").value;

    validateEmail(recipientEmail, "drop-recipient", "Recipient's Email");
    validateEmail(yourEmail, "drop-email", "Your Email");
    validateName(yourName, "drop-name",  "Name");
  }

  return (
    <>
      <section class="hintt-drop-popup">
        <div class="container">
          <div class="popup-hint">
            <div class="popup-cnt-hint">
              <Link to="#" onClick={()=>setOpen(false)}>
                <span>
                  <IoIosClose />
                </span>
              </Link>
              <h2>drop a hint</h2>
              <p>Love this design? Share a little hint.</p>
            </div>
            <div class="hint-card-inner">
              <div class="product-pic">
                <Link to="#">
                  <img
                    alt="Earring"
                    src="https://image.brilliantearth.com/media/cache/fd/e1/fde1e2fb2c562875010ded9f6ccad1ac.jpg"
                    class="img-responsive center-block"
                  />
                </Link>
              </div>
              <div class="product-info">
                <div class="product-info-inner">
                  <div class="product-info-left">
                    <div>
                      <h2>
                        <Link to="#" class="td-n2">
                          18K Yellow Gold Luxe Diamond rings
                        </Link>{" "}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="draft-hint">
              <form>
                <label for="first_emails">Recipient's Email</label>
                <input
                  type="text"
                  class="form-control"
                  name="first_name"
                  maxlength="32"
                  id="drop-recipient"
                  onChange={(e)=>validateEmail(e.target.value, 'drop-recipient', "Recipient's Email")}
                />
                <div className="error_1"></div>
                <label for="your_emails">your Email</label>
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  maxlength="32"
                  id="drop-email"
                  onChange={(e)=>validateEmail(e.target.value, 'drop-email', "Your Email")}

                />
                <div className="error_1"></div>
                <label for="fyour_name">your name</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  maxlength="128"
                  id="drop-name"
                  onChange={(e)=>validateName(e.target.value, 'drop-name', "Name")}

                />
                <div className="error_1"></div>
                {click ? (
                  <>
                    <div className="your-note-drop-icon">
                      <div className="close-drop-icon">
                        <label htmlFor="first_note">Your Note (optional)</label>
                        <Link to="#" onClick={() => setClick(!click)}>
                          <IoIosClose />
                        </Link>
                      </div>
                      <textarea
                        type="text"
                        className="form-control"
                        id="contact_input_message"
                        style={{ height: "6em" }}
                        name="message"
                        maxLength="400"
                        placeholder="Share details like ring size, metal type, or carat weight preferences to nudge someone in the right direction."
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <div
                    className="click-function"
                    onClick={() => setClick(!click)}
                  >
                    <IoIosAdd />
                    <Link to="#">Add a Note</Link> <span>(optional)</span>
                  </div>
                )}

                <label>
                  <input type="checkbox" />
                  <span class="send-text">Send me a Copy of this mail.</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <span class="send-text">
                    Send me Brilliant Earth email updates.
                  </span>
                </label>
                <button
                  type="button"
                  class="btn btn-success btn-block"
                  onClick={handleDropValidations}
                >
                  send
                </button>
                <div class="politices-remark">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </form>
            </div>

            <div class="submit-policies">
              <p>
                By submitting this form, you agree that Brilliant Earth may use
                your email address in accordance with our Privacy Policy.{" "}
                <Link to="/privacy-policy">view privacy policy</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
