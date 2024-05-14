import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const TablePopUp = ({toggle}) => {
  const [active, setActive] = useState();

  const [productData, setProductData] = useState({
    shape: "",
    diamondPriceApi: [],
    carat: "",
    multiCategory: "",
  });

  const { productId } = useParams();

  const Apidata = "http://localhost:3500/product";

  async function getStoreData() {
    try {
      const res = await axios.get(`${Apidata}/${productId}`);
      const responseData = res.data; // Store the response data in a variable
      setProductData({
        id: responseData.id,
        diamondPriceApi: responseData.diamondPriceApi,
        shape: responseData.shape,
        carat: responseData.carat,
        multiCategory: responseData.multiCategory,
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
    <div className={`select-diamond ${active}`}>
      <div className="tablepopup">
        <div className="tablepopup-img">
          <img
            src="https://media.imajize.com/4522818/frames/8013334/0;1;BE1D1234.pear_white-192.jpg/resize;w_468;h_468;bg_ffffff;f_inside/image.jpg"
            alt=""
          />
        </div>
        <div className="tablepopup-text">
          <button onClick={toggle}>+</button>
          <h3>Shape: {productData.shape}</h3>
          <h3>diamondPriceApi: ${productData.diamondPriceApi}</h3>
          <h3>Carat: {productData.carat}</h3>
          <h3>MultiCategory: {productData.multiCategory}</h3>
          <div>
            <Link to={`/mainPage5/${productData.id}`}>
              <button>Select diamond</button>
            </Link>           
          </div>
        </div>
      </div>
    </div>
  );
};
