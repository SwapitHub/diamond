import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { UserContext } from "../../App";


export const RingEndsSoon = () => {
  const [endSoon, setEndSoon] = useState([])
  const {baseUrl} = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        
          const response = await axios.get(
            `${baseUrl}/homecontent`
          );
          const data = response.data.data;

          setEndSoon(data);

          
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="endsSoon ends-soon">
        <div className="container">
          <div className="flex">
            <div className="endsSoon-img">
              <img src="/images/endRings.png" alt="endSoon" loading="lazy"/>
            </div>
            <div className="endsSoon-text ends-soon-txt">
              <h2>{endSoon.sale_banner_heading}</h2>              
              <p>Diamond Earrings with purchase over $1,000.</p>
              <p>Diamond Earrings & Necklace with purchase over $3,000.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
