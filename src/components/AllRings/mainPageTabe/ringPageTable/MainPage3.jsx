import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChooseDiamonds } from "../../ChooseDiamondPage/ChooseDiamonds";
import { DetailRingProduct } from "../../ChooseSettingPage/ChooseRingProduct/DetailRingProduct";

export const MainPage3 = () => {
  const [activeSingle, setActiveSingle] = useState("ChooseDiamonds");
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
        name: responseData.name,
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
          <div>
          1- Setting <div><span>{productData.name} </span><span> - ${productData.ringPrice}</span></div>
            <br />
            <Link to="/" className="change">
              change 
            </Link>
            <Link to={`/mainPage2/${productData.id}`} className="change">
               view
            </Link>
          </div>
          <div>         
            <img src={productData.img1} alt="" />
          </div>
        </button>

        <button>
          <Link to="" onClick={() => setActiveSingle("ChooseDiamonds")}>
            <div>
              2 - Choose Diamond 
            </div>
          </Link>

          <div>
            <img
              src="https://css.brilliantearth.com/static/img/svg/diamond.svg"
              alt=""
            />
          </div>
        </button>

        <button>
            <div>
              3 - Complete Ring <p> Select Ring Size </p>
            </div>
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
        {activeSingle === "ChooseDiamonds" && <ChooseDiamonds />}
      </div>
    </div>
  );
};
