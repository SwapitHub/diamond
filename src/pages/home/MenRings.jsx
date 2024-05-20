import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { UserContext } from "../../App";

export const MenRings = () => {
  const [menRings, setMenRings] = useState([]);
  const {baseUrl} = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/homecontent`
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
      <div className="menRings Bridal-Jewellery">
        <div className=" container">
          <div className="flex menRings-main">
            <div className="menRings-text">
              <h2>Bridal Jewellery</h2>
              <p>
                Modern and romantic, graceful and feminine, our wedding day
                jewellery is the perfect finishing touch to your special day and
                a precious keepsake to be worn for years to come.
              </p>
              <div>
                <Link
                  className="button"
                  to="/engagement-rings/start-with-a-setting?bridal-sets=true"
                >
                 Discover Collections
                </Link>
              </div>
            </div>
            <div className="menRings-img">
              <img
                src="./images/bridal_jwelary.png"
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
