import React, { useState, useEffect } from "react";
import round from "../../images/Round.png";
import { Link } from "react-router-dom";
import axios from "axios";
import SlickSlider from "react-slick";

export const GemstoneShopByShape = () => {
  const [gemstoneFilterData, setGemstoneFilterData] = useState([]);

  // =========shape api
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/gemstone-attributes"
      )
      .then((res) => {
        setGemstoneFilterData(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("shape API error gemstone");
      });
  }, []);

  const gemstonesStyleSliderDesktop = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="ShopDiamondShape gemstone">
        <div className="container">
          <h2>Shop by Gemstone</h2>
          <div className="flex">
            <div className="ShopDiamondShape-img-text diamond">

              <SlickSlider
                {...gemstonesStyleSliderDesktop}
                responsive={[
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 6,
                      slidesToScroll: 3,
                      infinite: true,
                    },
                  },

                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                  {
                    breakpoint: 375,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                ]}
              >
                {gemstoneFilterData.gemstones?.map((item) => {
                  console.log(item);
                  return (
                    <>
                      <Link
                        to={`/gemstones/gemstone-shop-all?style=${item.name}`}

                      >
                        <div className="gemstone-slider-main">
                          <img src={item.image} alt="Sapphire-img" />
                          <span className="color-name">{item.name}</span>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </SlickSlider>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
