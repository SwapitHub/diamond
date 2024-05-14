import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


export const GemstoneBanner = () => {
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
            <div className="banner-main engment-banner-sec gemstone-banner">
                <div className="container min-ht">
                    <div className=" banner flex min-ht">
                        <div className="banner-text min-ht gemstone">
                            <div className="breadcrum">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><span><IoIosArrowForward /></span></li>
                                    <li><Link to="#">Gemstones</Link></li>
                                </ul>
                            </div>

                            <h1>Design Your Own Gemstone Ring</h1>
                            <span>Lorem Ipsum is simply dummy text of the printing and industry.</span>
                            <div className='btn-bar'>
                                <Link className="button" to="/engagement-rings/start-with-a-gemstone">
                                    Start With a Gemstone
                                </Link>
                            </div>

                        </div>
                        <div className="banner-img min-ht">
                            <img src="/images/gembanner.png" alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
