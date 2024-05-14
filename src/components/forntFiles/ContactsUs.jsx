import React from 'react'
import { Link } from 'react-router-dom'
import { RiChat3Line } from "react-icons/ri";
import { validateEmail, validateName } from './ValidationFunctions';


export const ContactsUs = () => {
    function validateForm() {
        validateName(document.getElementById('contact-name').value, 'contact-name', "First Name")
        validateName(document.getElementById('contact-last').value, 'contact-last', "Last Name")
        validateEmail(document.getElementById('contact-email').value, 'contact-email', "Email Address")

    }
    return (
        <>
            <div className="contact-pages">


                <div className="contact-us-page">
                    <div className="container">
                        <div className="breadcrums">
                            <ul>
                                <li><Link to="/" >Home /</Link></li>
                                <li><Link to="/customer-care" >Customer Service /</Link></li>
                                <li><Link to="/contact" >Contact </Link></li>
                                
                            </ul>
                        </div>

                        <div className="contact-top-content">
                            <h1>Contact Us</h1>
                            <p>We're here to help with any questions you may have! <br />Our jewelry specialists are available 24/7.</p>
                        </div>




                        <div className="email-chat-main">




                            <div className="info-left">

                                <div className="chat-us">
                                    <h2>Chat with Us</h2>
                                    <p>Our jewelry specialists are here for you 24/7. Call us or live chat us at any time.</p>
                                    <ul>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i>
                                            Call 800.691.0952</li>
                                    </ul>

                                    <Link to="#" className="btn" id="ctrl_chat"><RiChat3Line />
                                        LIVE CHAT NOW</Link>
                                </div>


                                <div className="visit-showroom">
                                    <h2><Link to="#">Visit Our Showrooms</Link></h2>
                                    <ul>
                                        <li><Link to="#">Atlanta</Link></li>
                                        <li><Link to="#">Austin</Link></li>
                                        <li><Link to="#">Baltimore</Link></li>
                                        <li><Link to="#">Bethesda</Link></li>
                                        <li><Link to="#">Boston</Link></li>
                                        <li><Link to="#">Brooklyn</Link></li>
                                        <li><Link to="#">Chicago - Gold Coast</Link></li>
                                        <li><Link to="#">Chicago - Fulton Market</Link></li>
                                        <li><Link to="#">Cleveland</Link></li>
                                        <li><Link to="#">Charlotte</Link></li>
                                        <li><Link to="#">Columbus</Link></li>
                                        <li><Link to="#">Dallas</Link></li>
                                        <li><Link to="#">Denver</Link></li>
                                        <li><Link to="#">Detroit</Link></li>
                                        <li><Link to="#">Fairfax</Link></li>
                                        <li><Link to="#">Garden City</Link></li>
                                        <li><Link to="#">Los Angeles</Link></li>
                                        <li><Link to="#">Houston</Link></li>
                                        <li><Link to="#">King of Prussia</Link></li>
                                        <li><Link to="#">Miami</Link></li>
                                        <li><Link to="#">Minneapolis</Link></li>
                                        <li><Link to="#">Nashville</Link></li>
                                        <li><Link to="#">New York</Link></li>
                                        <li><Link to="#">Pasadena</Link></li>
                                        <li><Link to="#">Philadelphia</Link></li>
                                        <li><Link to="#">Portland</Link></li>
                                        <li><Link to="#">Roseville</Link></li>
                                        <li><Link to="#">San Diego</Link></li>
                                        <li><Link to="#">San Francisco</Link></li>
                                        <li><Link to="#">Santa Monica</Link></li>
                                        <li><Link to="#">Scottsdale</Link></li>
                                        <li><Link to="#">Seattle</Link></li>
                                        <li><Link to="#">St. Louis</Link></li>
                                        <li><Link to="#">Tampa</Link></li>
                                        <li><Link to="#">Walnut Creek</Link></li>
                                        <li><Link to="#">Washington, DC</Link></li>
                                    </ul>

                                    <Link id="make_appt_btn_contact" to="#" className="btn">Visit a Showroom</Link>
                                    <Link id="make_appt_btn_contact" to="#" className="btn">Book Virtual Appointment</Link>
                                    <div className="showrom"><img src="https://www.brilliantearth.com/static/img/showrooms/ir347/BrilliantEarthShowroom_Version2.jpg" alt="" /></div>
                                </div>



                            </div>





                            <div className="info-right">

                                <div className="email-form">
                                    <h2>Email Us</h2>

                                    <form>
                                        <input type="text" className="form-control" placeholder="First Name" name="first_name" maxLength="32" id='contact-name' onChange={(e) => validateName(e.target.value, 'contact-name', 'First Name')} />
                                        <div className="error_1"></div>
                                        <input type="text" className="form-control" placeholder="Last Name" name="last_name" maxLength="32" id='contact-last' onChange={(e) => validateName(e.target.value, 'contact-last', 'Last Name')} />
                                        <div className="error_1"></div>
                                        <input type="text" className="form-control" placeholder="Email Address" name="email" maxLength="128" id='contact-email' onChange={(e) => validateName(e.target.value, 'contact-email', 'Email Address')} />
                                        <div className="error_1"></div>
                                        <input type="text" className="form-control" placeholder="Phone (Optional)" name="phone" maxLength="16" />
                                        <textarea type="text" className="form-control" id="contact_input_message" placeholder="Message" style={{ height: "6em" }} name="message" maxLength="300"></textarea>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                <span className="send-text">Send me updates on new styles and special offers.</span>
                                            </label>
                                        </div>
                                        <button type="button" className="btn btn-success btn-block" onClick={validateForm}>REQUEST GUIDANCE</button>
                                    </form>


                                </div>

                                <div className="visit-showroom">
                                    <h2><Link to="#">Visit Our Showrooms</Link></h2>
                                    <ul>
                                        <li><Link to="#">FAQs</Link></li>
                                        <li><Link to="#">Find Your Ring Size</Link></li>
                                        <li><Link to="#">Free Shipping</Link></li>
                                        <li><Link to="#">Returns & Resizes</Link></li>
                                        <li><Link to="#">Track Your Order</Link></li>
                                    </ul>
                                </div>


                                <div className="other-list">
                                    <h2>Other Inquiries</h2>
                                    <ul className="other-inquiries-list">
                                        <li><span className="other-inquiries-text">marketing: </span> <Link to="mailto:marketing@brilliantearth.com">marketing@brilliantearth.com</Link></li>
                                        <li><span className="other-inquiries-text">PR: </span> <Link to="mailto:pr@brilliantearth.com">pr@brilliantearth.com</Link></li>
                                        <li><span className="other-inquiries-text">careers: </span> <Link to="mailto:jobs@brilliantearth.com">jobs@brilliantearth.com</Link></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
