import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { UserContext } from "../../App";

export const WeddingSets = () => {
    const [bridalSet, setBridalSet] = useState([])
    const {baseUrl} = useContext(UserContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                    const response = await axios.get(
                        `${baseUrl}/homecontent`
                    );
                    const data = response.data.data;

                    setBridalSet(data);

                   
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="wedding-page ">
                <div className="container">
                    <div className="bridalSets-necklaces flex ">
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Women's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" to={bridalSet.ring_promotion_banner_link_2}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hands1.png" alt="ring_promotion_banner_desktop_2" loading="lazy" />
                            </div>
                            <div className="mb-bridalSets-img">
                                <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hands1.png" alt="ring_promotion_banner_mobile_2" loading="lazy" />
                            </div>
                        </div>
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Men's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" to={bridalSet.ring_promotion_banner_link_2}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand3.png" alt="ring_promotion_banner_desktop_2" loading="lazy" />
                            </div>
                            <div className="mb-bridalSets-img">
                                <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/hand3.png" alt="ring_promotion_banner_mobile_2" loading="lazy" />
                            </div>
                        </div>
                        {/* <div className="bridalSets-2">
                        <div className="bridalSets-img dsk-bridalSets-img">
                            <img src="/images/hand3.png" alt="bridalSet" loading="lazy" />
                        </div>
                        <div className="mb-bridalSets-img">
                            <img src="/images/hand23.png" alt="bridalSet" loading="lazy" />
                        </div>
                        <div className="bridalSets-text">
                            <h3>Men's Wedding Bands</h3>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_3),
                                }}
                            ></span>
                            <div className="bridalSets-btn">
                                <Link className="button" to={bridalSet.ring_promotion_banner_alt_3}>
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        </>

    );
};
