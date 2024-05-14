import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Banner = () => {
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
      <div className="banner-main">
        <div className="container">
          <div className=" banner flex">
            <div className="banner-text">
              <h1>{homeContext.main_banner_title}</h1>
              <span>{homeContext.main_banner_subtitle}</span>
              <div>
                <Link className="button" to="engagement-rings/start-with-a-setting">
                  Shop Engagement Rings
                </Link>
              </div>
            </div>
            <div className="banner-img">
              <img src={homeContext.main_banner} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
