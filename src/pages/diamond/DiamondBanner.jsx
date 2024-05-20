import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { UserContext } from "../../App";

export const DiamondBanner = () => {
  const [homeContext, setHomeContext] = useState([]);
  const { baseUrl } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/homecontent`);
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
      <div className="banner-main engment-banner-sec diamond">
        <div className="bg-bannerr">
          <img src="/images/dmddgrp.png" alt="" loading="lazy" />
        </div>
        <div className="container min-ht">
          <div className=" banner flex min-ht">
            <div className="banner-text min-ht">
              <div className="breadcrum">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </li>
                  <li>
                    <Link to="/engagement-ring"> Wedding Bands</Link>
                  </li>
                </ul>
              </div>

              <h1> Wedding Bands</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
                quisquam.
              </span>
              <div className="btn-bar">
                <Link
                  className="button"
                  to="/engagement-rings/start-with-a-diamond"
                >
                  Shop Natural Diamonds
                </Link>
                <Link
                  className="button bg-trans"
                  to="/engagement-rings/start-with-a-diamond/lab"
                >
                  Shop Lab Diamonds
                </Link>
              </div>
            </div>
            {/* <div className="banner-img min-ht">
                            <img src="/images/diamondbanner.png" alt="" loading="lazy" />
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
