import React, { useState, useEffect, useContext } from "react";
import round from "../../images/Round.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

export const ShopDiamondShape = () => {
  // diamond shape
  const [shapeData, setShapeData] = useState([]);
  const {baseUrl} = useContext(UserContext)
  console.log(shapeData);
  useEffect(() => {
    axios
      .get(`${baseUrl}/diamondshape`)
      .then((res) => {
        setShapeData(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  return (
    <>
      <div className="ShopDiamondShape">
        <div className="container">
          <h3>Design Your Own Engagement Ring</h3>
          <div className="flex">
            {shapeData.map((shapeItem) => {
              return (
                <>
                  <div className="ShopDiamondShape-img-text">
                    <Link to={`/engagement-rings/settings?shape=${shapeItem.shape}`}>
                      <img src={shapeItem.icon} alt="" />
                      <span>{shapeItem.shape}</span>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
