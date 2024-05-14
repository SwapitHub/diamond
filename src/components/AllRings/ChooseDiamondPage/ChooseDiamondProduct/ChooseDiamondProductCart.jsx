import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const ChooseDiamondProductCart = () => {
  const [productData, setProductData] = useState({
    ringPrice: [],
    img1: "",
    id: "",
  });

  const { productId } = useParams();

  const Apidata = "http://localhost:3500/product";

  async function getStoreData() {
    try {
      const res = await axios.get(`${Apidata}/${productId}`);
      const responseData = res.data; // Store the response data in a variable
      setProductData({
        ringPrice: responseData.ringPrice,
        img1: responseData.img1,
        id: responseData.id,
      });
      console.log("data=======", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getStoreData();
  }, [productId]);
  console.log(productData);

  return (
    <div>
      <div className="container">
        <div className="singleProduct">
          <div className="singleProduct-img">
          <img src={productData.img1} alt="" />
          <img src={productData.img1} alt="" />
          <img src={productData.img1} alt="" />
          </div>
          <div className="singleProduct-text">
            <h3>Petite Twisted Vine Diamond Engagement Ring</h3>
            <span>star Rating</span>
            <p>
              This beautiful ring features a shimmering strand of pavé diamonds
              entwined with a lustrous ribbon of precious metal.
            </p>
            
            <p>${productData.ringPrice}(setting price)</p>
            <Link to={`/mainPage5/${productData.id} `} className="ChooseSetting">
          <button>Choose this diamond</button>
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
