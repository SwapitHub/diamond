import React from 'react'
import { validateEmail } from './ValidationFunctions';
import { Link } from 'react-router-dom';

export const ForgetPass = () => {
    function handleValidation(){
        validateEmail(document.getElementById('forget-email').value, 'forget-email', 'Email Address');

    }
    return (
        <>
            <section className="password-rest">
                <div className="container">
                <div className="breadcrums">
                        <ul>
                            <li><Link to="/" >Home /</Link></li>
                            <li><Link to="/customer-care" >Customer Service /</Link></li>
                            <li><Link to="/login" >Account /</Link></li>
                            <li><Link to="/forget-password">Password Reset </Link></li>
                        </ul>
                    </div>
                    <div className="password-inner">
                        <div className="psswd-reset-content">
                            <h2>My Account</h2>
                            <h3>account assistance</h3>
                            <p>Enter the email address you used to create your Brilliant Earth account. </p>
                        </div>
                        <div className="recieve-password">
                            <ul>
                                <li>You will receive an email shortly to reset your password.</li>
                                <li>If you do not receive an email, please <Link to="/contact">contact us</Link> for assistance.</li>
                            </ul>
                        </div>
                        <div className="reset-forms">
                            <form className="form-inline">
                                <div className="input-group">
                                    <input type="text" className="zip-code" placeholder="Email Address" name="email" id='forget-email' onChange={(e)=>validateEmail(e.target.value, 'forget-email', "Email Address")}/>
                                    <div className="error_1"></div>
                                        <span className="input-group-btn"><button type="button" onClick={handleValidation}>submit</button></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
