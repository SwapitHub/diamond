import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export const Banner = () => {
  const [homeContext, setHomeContext] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/homecontent"
        );
        const data = response.data.data;

        setHomeContext(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <section className="banner-section">
        <div className="container">
          <div className="common-row banner">
            <Slider {...settings}>
              <div className="banner-img-slider">
                <div className="banner-ring-text-btn">
                  <h3>Celebrate Love with Timeless Elegance!</h3>
                  <span>
                    Explore Our Stunning Collection and Find Your Perfect Piece
                    Today!
                  </span>
                  <div className="banner-Rings">
                    <Link
                      className="button"
                      to="engagement-rings/start-with-a-setting"
                    >
                      See Wedding Rings
                    </Link>
                  </div>
                </div>
                <img src="./images/banner_2.png" alt="" />
              </div>

              <div className="banner-img-slider">
                <div className="banner-ring-text-btn">
                  <h3>Celebrate Love with Timeless Elegance!</h3>
                  <span>
                    Explore Our Stunning Collection and Find Your Perfect Piece
                    Today!
                  </span>
                  <div className="banner-Rings">
                    <Link
                      className="button"
                      to="engagement-rings/start-with-a-setting"
                    >
                      See Wedding Rings
                    </Link>
                  </div>
                </div>
                <img src="./images/banner_2.png" alt="" />
              </div>

              <div className="banner-img-slider">
                <div className="banner-ring-text-btn">
                  <h3>Celebrate Love with Timeless Elegance!</h3>
                  <span>
                    Explore Our Stunning Collection and Find Your Perfect Piece
                    Today!
                  </span>
                  <div className="banner-Rings">
                    <Link
                      className="button"
                      to="engagement-rings/start-with-a-setting"
                    >
                      See Wedding Rings
                    </Link>
                  </div>
                </div>
                <img src="./images/banner_2.png" alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};
