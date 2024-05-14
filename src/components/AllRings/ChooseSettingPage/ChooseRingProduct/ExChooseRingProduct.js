import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { IoIosStar } from "react-icons/io";

export const ChooseRingProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    default_image_url: "",
    videosRose: "",
    videosWhite: "",
    videosYellow: "",
    price: [],
    images: [],
    metalType: "",
    metalColor: "",
    finishLevel: "",
    diamondQuality: "",
    sku: "",
    description: "",
  });
  const { slug: productId } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(0);

  const calculateFinalMetalColor = async (color) => {
    console.log(color);
    try {
      const finalLevel = calculateFinalLevel(productData.finishLevel);
      const finalMetalType = calculateFinalMetalType(productData.metalType);
      const response = await axios.get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/products"
      );
      const product = response.data.data.find(
        (product) => product.slug === productId
        
      );
      const priceResponse = await axios.post(
        `https://www.overnightmountings.com/priceapi/service.php?action=pricecalculation&type=json&level=${finalLevel}&metaltype=${finalMetalType}&metalcolor=${color}&stylenumber=${product.sku}&quality=${product.diamondQuality}`

        // `http://www.overnightmountings.com/priceapi/service.php?action=pricecalculation&type=json&metaltype=14kt&metalcolor=${color}&stylenumber=50274-E-.05&Quality=6&sizevalue=0&fingersizevalue=Stock`
      );
      console.log(product.sku);
      setSelectedColor(color);
      setUpdatedPrice(priceResponse.data.price);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/products"
        );
        const product = response.data.data.find(
          (product) => product.slug === productId
        );

        if (product) {
          const finalLevel = calculateFinalLevel(product.finishLevel);
          const finalMetalType = calculateFinalMetalType(product.metalType);
          const metalColor = calculateFinalMetalColor(product.metalColor);

          const priceResponse = await axios.get(
            `https://www.overnightmountings.com/priceapi/service.php?action=pricecalculation&type=json&level=${finalLevel}&metaltype=${finalMetalType}&metalColor=${metalColor}&stylenumber=${product.sku}&quality=${product.diamondQuality}`
          );

          setProductData({
            name: product.name,
            default_image_url: product.default_image_url,
            images: product.images,
            videosRose: product.videos.rose,
            videosWhite: product.videos.white,
            videosYellow: product.videos.yellow,
            price: priceResponse.data.price,
            metalType: product.metalType,
            metalColor: product.metalColor,
            finishLevel: product.finishLevel,
            diamondQuality: product.diamondQuality,
            sku: product.sku,
            CenterShape: product.CenterShape,
            description: product.description,
          });
        } else {
          console.log(`Product with ID ${productId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const calculateFinalLevel = (level) => {
    if (level.indexOf("Complete") !== -1) {
      return "Complete";
    }
    if (level.indexOf("Polished") !== -1) {
      return "Polished";
    }
    if (level.indexOf("Semi-mount") !== -1) {
      return "Semi-mount";
    }
    return level;
  };

  const calculateFinalMetalType = (metalType) => {
    // Implement your logic for calculating final metal type
    return "";
  };

  useEffect(() => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      metalColor: selectedColor,
    }));
  }, [selectedColor]);

  return (
    <div className="details-page">
      <div className="">
        <div className="singleProduct">
          <div className="singleProduct-text">
            <h4>{productData.name}</h4>
            <span>
              <p>{productData.description}</p>
            </span>
            <div className="metal-type">
              <strong>Metal : </strong>
              {productData.metalType}
              <div className="metal-type-color">
                <Link to="#">
                  <input
                    type="radio"
                    name="color"
                    onClick={() => calculateFinalMetalColor("White")}
                    checked={selectedColor === "White"}
                  />
                  White
                </Link>

                <Link to="#">
                  <input
                    type="radio"
                    name="color"
                    onClick={() => calculateFinalMetalColor("Pink")}
                    checked={selectedColor === "Pink"}
                  />
                  Pink
                </Link>

                <Link to="#">
                  <input
                    type="radio"
                    name="color"
                    onClick={() => calculateFinalMetalColor("Yellow")}
                    checked={selectedColor === "Yellow"}
                  />
                  Yellow
                </Link>
              </div>
              <p>
                Original Price: ${productData.price}
                <br />
                Updated Price: ${updatedPrice} (setting price)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
