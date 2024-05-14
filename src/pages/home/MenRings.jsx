import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

export const MenRings = () => {
  const [menRings, setMenRings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/homecontent"
        );
        const data = response.data.data;

        setMenRings(data);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="menRings">
        <div className=" container">
          <div className="flex menRings-main">
            <div className="menRings-text">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    menRings.ring_promotion_banner_desc
                  ),
                }}
              ></div>
              <div>
                <Link
                  className="button"
                  to="/engagement-rings/start-with-a-setting?bridal-sets=true"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="menRings-img">
              <img
                src={menRings.ring_promotion_banner_last}
                alt={menRings.ring_promotion_banner_alt}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
