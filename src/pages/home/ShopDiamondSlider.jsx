import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import round from "../../images/Round.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
export const ShopDiamondSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      
      
    ],
  };
  // diamond shape
  const [shapeData, setShapeData] = useState([]);
console.log(shapeData);
  useEffect(() => {
    axios
      .get("http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/diamondshape")
      .then((res) => {
        setShapeData(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  return (
    <section
      className="mobile-ShopDiamondShape-main"
      id="mobile-ShopDiamondShape-main"
    >
      <div className="container">
        <div className="mobile-ShopDiamondShape">
          <h2>Shop diamonds by shape</h2>
          <div className="mobile-ShopDiamondShapeSlider">
            <Slider {...settings}>
              {shapeData.map((client, index) => {
                return (
                  <div className="mobile-ShopDiamondShape-card1">
                    <div className="ShopDiamondShape-img-text">
                      <Link to="#">
                        <img src={client.icon} alt="" />
                        <span>{client.shape}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
