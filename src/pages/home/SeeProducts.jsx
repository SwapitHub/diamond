import React from "react";
import { Link } from "react-router-dom";

export const SeeProducts = () => {
  return (
    <section className="see-products-main">
      <div className="container">
        <div className="common-row see-products">
          <div className="see-products-img">
            <Link to="/engagement-rings/start-with-a-setting" className="See-Products">
              <span>Anniversary Rings</span>
              <span> See Products &gt; </span>
            </Link>
            <img src="./images/seeProduct_1.png" alt="" />
          </div>
          <div className="see-products-img">
            <Link to="" className="See-Products">
              <span>Diamond Pendants</span>
              <span> See Products &gt; </span>
            </Link>

            <img src="./images/seeProduct_2.png" alt="" />
          </div>
          <div className="see-products-img">
            <Link to="" className="See-Products">
              <span>Tennis Bracelets</span>
              <span> See Products &gt; </span>
            </Link>

            <img src="./images/seeProduct_3.png" alt="" />
          </div>
          <div className="see-products-img">
            <Link to="" className="See-Products">
              <span>Diamond Studs</span>
              <span> See Products &gt; </span>
            </Link>

            <img src="./images/seeProduct_4.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
