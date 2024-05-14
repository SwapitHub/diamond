import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const ChooseRingProductCart = () => {
  const [productData, setProductData] = useState({
    ringPrice: [],
    img1: "",
    id: "",
  });

  const { productId } = useParams();

  const Apidata = "https://dev.demo-swapithub.com/diamond/api/v1/products";

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
            <p><strong>Metal: </strong>18k white gold</p>
            <p><span>gary</span><span>yellow</span><span>orange</span><span>gary</span></p>
            <p><strong>Style: </strong>Classic</p>
            <p><span>classic</span><span>hidden</span></p>
            <p><strong>Setting Carat Weight: </strong> 1/8 ct. tw.</p>
            <p><span>1/8</span> <span>1/5</span> <span>1/4</span></p>
            <p>${productData.ringPrice}(setting price)</p>
            <Link to={`/mainPage5/${productData.id} `} className="ChooseSetting">
          <button>Choose a settings</button>
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
