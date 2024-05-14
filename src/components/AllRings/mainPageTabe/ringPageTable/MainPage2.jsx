import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChooseDiamonds } from "../../ChooseDiamondPage/ChooseDiamonds";
import { DetailRingProduct } from "../../ChooseSettingPage/ChooseRingProduct/DetailRingProduct";

export const MainPage2 = () => {
  const [activeSingle, setActiveSingle] = useState("DetailRingProduct");
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: [],
    metalType: "",
    metalColor: "",
    finishLevel: "",
    diamondQuality: "",
    sku: "",
    // Add more properties as needed
  });
console.log(productData);
  const { slug: productId } = useParams();
  // console.log(productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/products');
        const product = response.data.data.find(product => product.slug === productId);
        // console.log(product);

        if (product) {
          const finalLevel = calculateFinalLevel(product.finishLevel);
          const finalMetalType = calculateFinalMetalType(product.metalType);

          const priceResponse = await axios.get(
            `https://www.overnightmountings.com/priceapi/service.php?action=pricecalculation&type=json&level=${finalLevel}&metaltype=${finalMetalType}&metalcolor=${product.metalColor}&stylenumber=${product.sku}&quality=${product.diamondQuality}`
          );

          setProductData({
            name: product.name,
            image: product.default_image_url,
            price: priceResponse.data.price,
            metalType: product.metalType,
            metalColor: product.metalColor,
            finishLevel: product.finishLevel,
            diamondQuality: product.diamondQuality,
            sku: product.sku,
            // Add more properties as needed
          });
          
        } else {
          console.log(`Product with ID ${productId} not found.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]); // Dependency on productId means this effect will re-run whenever productId changes

  const calculateFinalLevel = (level) => {
    if (level.indexOf('Complete') !== -1) {
      return 'Complete';
    }
    if (level.indexOf('Polished') !== -1) {
      return 'Polished';
    }
    if (level.indexOf('Semi-mount') !== -1) {
      return 'Semi-mount';
    }
    return '';
  };

  const calculateFinalMetalType = (metalType) => {
    // Implement your logic for metal type conversion here
    // ...

    return '';
  };

  return (
    <div className="container">
      <div className="main-btn-setting details-main-btn-setting">
          
          <div className="ring Choose-Setting">
            <Link to="" onClick={() => setActiveSingle("ChooseSetting")}>
              <div>1 Choose Setting</div>
              <div className="img">
                <img
                  src="https://css.brilliantearth.com/static/img/svg/setting.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className="ring Choose-Diamond">
            <Link to="#" onClick={() => setActiveSingle("LabDiamond")}>
              <div>
                <div>2 Choose Diamond</div>
                <Link to="#" className="Browse-Diamonds">
                  Browse Diamonds
                </Link>
              </div>

              <div className="img">
                <img
                  src="https://css.brilliantearth.com/static/img/svg/diamond.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className="ring Complete-Ring">
            <div>
              Complete Ring <p> Select Ring Size </p>
            </div>
            <div className="img">
              <img
                src="https://css.brilliantearth.com/static/img/svg/ring.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      <div className="">
        {activeSingle === "DetailRingProduct" && <DetailRingProduct />}
        {activeSingle === "LabDiamond" && <ChooseDiamonds />}
      </div>
    </div>
  );
};
