import React from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  return (
    <>
      <section className="wishlist-main">
        <div className="container">
          <div className="breadcrums">
            <ul>
              <li>
                <Link to="/">Home /</Link>
              </li>
              <li>
                <Link to="/cart">Cart /</Link>
              </li>
            </ul>
          </div>
          <div className="wishlist-create">
            <div className="wishlist-reset-content">
              <h3>Your Shopping Bag is Empty</h3>
              <p>
                <Link to="/login">Sign in</Link> to view previously saved items or
                track a recent order.
              </p>
            </div>
            <div className="reset-forms wishlist-acct"></div>
          </div>
          <div className="wishlist-shopping">
            <div className="category-tiles">
              <h3>Continue Shopping</h3>
            </div>
            <div className="wishlist-shoping-inner">
              <div className="category-tiles-box">
                <div className="wisher-imager">
                  <img src="/images/diamond.jpg" />
                </div>
                <div className="category-title">
                  <h4>Engagement Rings</h4>
                </div>
              </div>
              <div className="category-tiles-box">
                <div className="wisher-imager">
                  <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/ring.jpg" />
                </div>
                <div className="category-title">
                  <h4>Wedding Rings</h4>
                </div>
              </div>
              <div className="category-tiles-box">
                <div className="wisher-imager">
                  <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/rings.jpg" />
                </div>
                <div className="category-title">
                  <h4>Gemstone Rings</h4>
                </div>
              </div>
              <div className="category-tiles-box">
                <div className="wisher-imager">
                  <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/chain.jpg" />
                </div>
                <div className="category-title">
                  <h4>Fine Jewelry</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
