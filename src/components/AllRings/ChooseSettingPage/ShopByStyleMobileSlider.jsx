import React from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { Link } from "react-router-dom";
export const ShopByStyleMobileSlider = () => {
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
  const testimonialSlide = [
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
      img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
      name: "Round",
    },
    {
        img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
        name: "Round",
      },
      {
        img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
        name: "Round",
      },
      {
        img: "https://css.brilliantearth.com/static/img/fillter/shop-by-style/Solitaire_ir352.png",
        name: "Round",
      },
  ];

  return (
    <div
      className="ShopByStyleMobileSlider-main"
      id="ShopByStyleMobileSlider"
    >
      <div className="container">
        <div className="mobile-ShopByStyle">
          <div className="mobile-ShopByStyle">
            <Slider {...settings}>
              {testimonialSlide.map((client, index) => {
                return (
                  <div className="mobile-ShopDiamondShape-card1">
                    <div className="ShopDiamondShape-card1">
                      <Link to="#">
                        <img src={client.img} alt="" />
                        <p>{client.name}</p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
