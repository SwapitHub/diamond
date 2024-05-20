import React, { useEffect, useState } from "react";
import engagementRing from "../../images/EngagementRing.png";
import { Link } from "react-router-dom";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";

export const ShopDiamondCotegory = () => {
  
  return (
    <>
      <div className="ShopCategory ShopDiamondCotegory">
        <div className="container">
          <h3>shop diamonds by Category</h3>
          <div className="flex">

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
          </div>
        </div>
      </div>
    </>
  );
};
