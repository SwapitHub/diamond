import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productList } from "../../redux/productAction";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/action";

export const AddToBag = () => {
  const [addToCardSizeData, setAddToCardSizeData] = useState("")
  const [addProductData, setAddProductData] = useState({
    ringPrice: 0,
    diamondPriceApi: 0,
    img1: "",
    id: "",
    name: "",
    color: "",
  });

  const { productId } = useParams();

  const Apidata = "http://localhost:3500/product";

  async function getStoreData() {
    try {
      const res = await axios.get(`${Apidata}/${productId}`);
      const responseData = res.data; // Store the response data in a variable
      setAddProductData({
        ringPrice: responseData.ringPrice,
        img1: responseData.img1,
        id: responseData.id,
        name: responseData.name,
        carat: responseData.carat,
        color: responseData.color,
        diamondPriceApi: responseData.diamondPriceApi,
        diamondName: responseData.diamondName
      });
      console.log("data=======", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getStoreData();
    dispatch(productList());
  }, [productId]);


  // =============
  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.warn("data in main component", data);

  function handleChange(event){
    setAddToCardSizeData( event.target.value)
  }
  console.log(addToCardSizeData);
  return (
    <div>
      <div className="container">
        <div className="singleProduct">
          <div className="singleProduct-img">
            <img src={addProductData.img1} alt="" />
            <img src={addProductData.img1} alt="" />
            <img src={addProductData.img1} alt="" />
          </div>
          <div className="singleProduct-text">
            <h3>Your One-of-a-Kind Ring</h3>
            <div className="singleProduct-text-img-text">
              <span>
                <img
                  src="https://css.brilliantearth.com/static/img/svg/ring-green.svg"
                  alt=""
                />
              </span>
              <div className="singleProduct-text-add">
                <p>18K Yellow Gold Petite Elodie Solitaire Engagement Ring</p>
                <p>star rating</p>
                <p>${addProductData.ringPrice}</p>
              </div>
            </div>
            <div className="singleProduct-text-img-text">
              <span className="diamond-icon">
                <img
                  src="https://css.brilliantearth.com/static/img/svg/Sparkling-Diamond-green.svg"
                  alt=""
                />
              </span>
              <div className="singleProduct-text-add">
                <p>{addProductData.carat} Carat {addProductData.diamondName}</p>
                <p>Ideal cut • I color • SI2 clarity</p>
                <p>${addProductData.diamondPriceApi}</p>
              </div>
            </div>
            <p className="total-price">total: ${addProductData.diamondPriceApi + addProductData.ringPrice}</p>
            <div className="singleProduct-select-box">
              <select value={addToCardSizeData} onChange={handleChange}>
                <option value="select-Size">select Size</option>
                <option value="less-thane-3">less thane 3</option>
                <option value="three-1/2">3 1/2</option>
                <option value="four">4</option>
                <option value="four-1/2">4 1/2</option>
              </select>
            </div>
            <Link to="/cart">
              <button onClick={() => dispatch(addToCart(addProductData))}>
                Add to bag
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
