import React, { useEffect, useState } from "react";
import engagementRing from "../../images/EngagementRing.png";
import { Link } from "react-router-dom";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";

export const ShopCategory = () => {

  const ShopStyleSliderOuter = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const [ShopByStyle, setShopStyle] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/product-style"
      )
      .then((res) => {
        setShopStyle(res.data.data);
        // setActiveStyleIds(menuShapeName)
      })
      .catch(() => {
        console.log("shop style api error");
      });
  }, []);
  return (
    <>
      <div className="ShopCategory">
        <div className="container">
          <h2>Shop by category</h2>
          <div className="flex">
            <div class="column-width">

              <SlickSlider
                {...ShopStyleSliderOuter}
                responsive={[
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 5,
                      slidesToScroll: 3,
                      infinite: true,
                    },
                  },
                  {
                    breakpoint: 639,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                    },
                  },

                  {
                    breakpoint: 375,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                ]}
              >
                {ShopByStyle.map((styleItem) => {
                  return (
                    <>
                      <Link
                        to={`/engagement-rings/${styleItem.alias}`}
                      >
                        <div className="shop-style-img">
                          <img src={styleItem.image} alt="" />
                        </div>
                        <div className="shop-style-text">
                          <span>{styleItem.name}</span>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </SlickSlider>
            </div>
          </div>


          {/* <div class="column-width">
            <Link to="#">
              <div className="ShopCategory-img">
                <img src={engagementRing} alt="" />
              </div>
              <h4>Ready To Ship Rings</h4>
            </Link>
          </div>

          <div class="column-width">
            <Link to="#">
              <div className="ShopCategory-img">
                <img src={engagementRing} alt="" />
              </div>
              <h4>Ready To Ship Rings</h4>
            </Link>
          </div>

          <div class="column-width">
            <Link to="#">
              <div className="ShopCategory-img">
                <img src={engagementRing} alt="" />
              </div>
              <h4>Ready To Ship Rings</h4>
            </Link>
          </div>

          <div class="column-width">
            <Link to="#">
              <div className="ShopCategory-img">
                <img src={engagementRing} alt="" />
              </div>
              <h4>Ready To Ship Rings</h4>
            </Link>
          </div> */}

        </div>
      </div >

    </>
  );
};
