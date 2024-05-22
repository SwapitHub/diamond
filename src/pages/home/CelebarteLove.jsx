import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";


export const CelebarteLove = () => {

    return (
        <>
            <section className="celebratre-love-sec">
                <div className="container">


                    <div className="celebrate-inner" style={{ backgroundImage: "url(./images/celebrate-back-image.png)" }}>


                        <div className="celebrate-content">
                            <h3>Celebrate Love with Timeless Elegance!</h3>
                            <p>Explore Our Stunning Collection and Find Your Perfect Piece Today!</p>
                            <Link className="see-btn btn" to="/engagement-rings/start-with-a-setting">See Products {`>`} </Link>
                        </div>



                    </div>



                </div>
            </section>

        </>
    );
};
