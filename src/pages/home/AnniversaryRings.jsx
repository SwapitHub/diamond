import React, { useEffect, useState } from "react";
import engagementRing from "../../images/EngagementRing.png";
import { Link } from "react-router-dom";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";

export const AnniversaryRings = () => {
  return (
    <>
      <div className="ShopCategory ShopDiamondCotegory Anniversary Rings">
        <div className="container">
          <h3>Anniversary Rings</h3>
          <div className="flex">
            <div class="column-width">
              <Link to="#">
                <div className="ShopCategory-img">
                  <img src={engagementRing} alt="" />
                </div>
                <h4>Band Ring in platinum with Diamond</h4>
              </Link>
            </div>

            <div class="column-width">
              <Link to="#">
                <div className="ShopCategory-img">
                  <img src={engagementRing} alt="" />
                </div>
                <h4>Band Ring in platinum with Diamond</h4>
              </Link>
            </div>

            <div class="column-width">
              <Link to="#">
                <div className="ShopCategory-img">
                  <img src={engagementRing} alt="" />
                </div>
                <h4>Band Ring in platinum with Diamond</h4>
              </Link>
            </div>

            <div class="column-width">
              <Link to="#">
                <div className="ShopCategory-img">
                  <img src={engagementRing} alt="" />
                </div>
                <h4>Band Ring in platinum with Diamond</h4>
              </Link>
            </div>
            <div class="column-width">
              <Link to="#">
                <div className="ShopCategory-img">
                  <img src={engagementRing} alt="" />
                </div>
                <h4>Band Ring in platinum with Diamond</h4>
              </Link>
            </div>
            <div className="discover-collection"><Link className="button" to="#">Discover Collections</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};
