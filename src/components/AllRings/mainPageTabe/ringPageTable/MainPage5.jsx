import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChooseDiamondProduct } from "../../ChooseDiamondPage/ChooseDiamondProduct/ChooseDiamondProduct";
import { AddToBag } from "../../AddToBag";
import { DetailRingProduct } from "../../ChooseSettingPage/ChooseRingProduct/DetailRingProduct";

export const MainPage5 = () => {
  const [activeSingle, setActiveSingle] = useState("AddToBag");
  const [productData, setProductData] = useState({
    ringPrice: [],
    carat: "",
    id: "",
    img1: "",
    name: "",
    diamondPriceApi: ""
  });

  const { productId } = useParams();
  const Apidata = "http://localhost:3500/product";

  async function getStoreData() {
    try {
      const res = await axios.get(`${Apidata}/${productId}`);
      const responseData = res.data; // Store the response data in a variable
      setProductData({
        ringPrice: responseData.ringPrice,
        carat: responseData.carat,
        id: responseData.id,
        img1: responseData.img1,
        name: responseData.name,
        diamondName: responseData.diamondName,
        diamondPriceApi: responseData.diamondPriceApi,
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
      <div className="main-btn-setting">
        <button onClick={() => setActiveSingle("DetailRingProduct")}>
          <Link to=""></Link>
          <div>
            <p>Setting</p> <p>{productData.name}</p> <p>${productData.ringPrice}</p>
            <Link to="/" className="change">
              change
            </Link>
            <Link to={`/mainPage4/${productData.id}`} className="change">
              view
            </Link>
          </div>
          <div>
            <img src={productData.img1} alt="" />
          </div>
        </button>

        <button>
          <Link to="" onClick={() => setActiveSingle("ChooseDiamondProduct")}>
            <div>
              <p>Diamond</p>
              <p>{productData.carat} <span>{productData.diamondName}</span></p>
              <p>${productData.diamondPriceApi}</p>
              <Link to={`/mainPage3/${productData.id}`} className="change">
                change
              </Link>
              <Link to={`/mainPage4_1/${productData.id}`} className="change">
                view
              </Link>
            </div>
            <div>
              <img
                src="https://image.brilliantearth.com/media/shape_images/round_new.jpg"
                alt=""
              />
            </div>
          </Link>
        </button>

        <button>
          <div>Complete Ring</div>
          <div>
            <img
              src="https://css.brilliantearth.com/static/img/svg/ring.svg"
              alt=""
            />
          </div>
        </button>
      </div>
      <div className="">
        {activeSingle === "DetailRingProduct" && <DetailRingProduct />}
        {activeSingle === "ChooseDiamondProduct" && <ChooseDiamondProduct />}
        {activeSingle === "AddToBag" && <AddToBag />}
      </div>
    </div>
  );
};
