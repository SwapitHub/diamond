import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { UserContext } from '../../App';


export const WeddingBanner = () => {
    const [homeContext, setHomeContext] = useState([]);
    const {baseUrl} = useContext(UserContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
              
                    const response = await axios.get(
                        `${baseUrl}/homecontent`
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
            <div className="banner-main engment-banner-sec wedding-banner">
                <div className="container min-ht">
                    <div className=" banner flex min-ht">
                        <div className="banner-text min-ht">
                            <div className="breadcrum">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><span><IoIosArrowForward /></span></li>
                                    <li><Link to="/engagement-ring"> Wedding Bands</Link></li>
                                </ul>
                            </div>

                            <h1> Wedding Bands</h1>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quisquam.</span>
                            <div className='btn-bar'>
                                <Link className="button" to="#">
                                    Shop Wedding Band
                                </Link>
                            </div>

                        </div>
                        <div className="banner-img min-ht">
                            <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/weddingbanner33.png" alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
