import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

export const EngagementBanner = () => {
    const [homeContext, setHomeContext] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/homecontent"
                );
                const data = response.data.data;

                setHomeContext(data);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="banner-main engment-banner-sec">
                <div className="container min-ht">
                    <div className=" banner flex min-ht">
                        <div className="banner-text min-ht">
                            <div className="breadcrum">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><span><IoIosArrowForward /></span></li>
                                    <li><Link to="#">Engagement Ring</Link></li>
                                </ul>
                            </div>

                            <h1>Engagement Rings</h1>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quisquam.</span>
                            <div className='btn-bar'>
                                <Link className="button" to="/engagement-rings/start-with-a-setting">
                                    Engagement Rings
                                </Link>
                            </div>

                        </div>
                        <div className="banner-img min-ht">
                            <img src="/images/Layer 45.png" alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
