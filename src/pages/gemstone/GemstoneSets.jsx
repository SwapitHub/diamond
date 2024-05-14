import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

export const GemstoneSets = () => {
    const [bridalSet, setBridalSet] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/homecontent"
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
            <div className="wedding-page diamond-set">
                <div className="container">
                    <div className="bridalSets-necklaces flex diamond-wrp">
                        <div className="bridalSets flex dmg-lft">
                            <div className="bridalSets-text">
                                <h3>Colored Diamonds</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" to="/engagement-rings/start-with-a-gemstone">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <img src="/images/dimondlft.png" alt="ring_promotion_banner_desktop_2" loading="lazy" />
                            </div>
                            <div className="mb-bridalSets-img">
                                <img src="/images/dimondlft.png" alt="ring_promotion_banner_mobile_2" loading="lazy" />
                            </div>
                        </div>
                        <div className="bridalSets flex dmd-rgt">
                            <div className="bridalSets-text">
                                <h3>Lab Diamonds</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" to="/engagement-rings/start-with-a-gemstone">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <img src="/images/diamond2.jpg" alt="ring_promotion_banner_desktop_2" loading="lazy" />
                            </div>
                            <div className="mb-bridalSets-img">
                                <img src="/images/diamond2.jpg" alt="ring_promotion_banner_mobile_2" loading="lazy" />
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
