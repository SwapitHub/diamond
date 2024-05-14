import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const ChooseDiamondProduct = () => {
  const [productData, setProductData] = useState({
    diamondPriceApi: [],
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
        diamondPriceApi: responseData.diamondPriceApi,
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
      <div className="singleProduct">
        {/* <h1>{productId}</h1> */}
        <h1>{productData.id}</h1>
        <h1>${productData.diamondPriceApi}</h1>
        <img src={productData.img1} alt="" />
        ChooseRingProduct
        <Link to="/shopByStyle">back to shopStyle product </Link>
        <Link to={`/mainPage3/${productData.id}`}>
          <button>Choose a settings</button>
        </Link>
      </div>
    </div>
  );
};
