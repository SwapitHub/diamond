import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";


export const CelebarteLove = () => {

    return (
        <>
            <section className="celebratre-love-sec">
                <div className="container">


                    <div className="celebrate-inner" style={{ backgroundImage: "url(./images/celebrate-back-image.png)" }}>


                        <div className="celebrate-content">
                            <h3>Celebrate Love with Timeless Elegance!</h3>
                            <p>Explore Our Stunning Collection and Find Your Perfect Piece Today!</p>
                            <a className="see-btn btn" href="#">See Products {`>`} </a>
                        </div>



                    </div>



                </div>
            </section>

        </>
    );
};
