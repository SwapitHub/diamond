import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productList } from "../../redux/productAction";
import { removeToCart } from "../../redux/action";

const Cart = () => {
  const cartData = useSelector((state) => state.cartData);

  // Calculate ringAmount
  const ringAmount = cartData.reduce(
    (total, item) => total + parseFloat(item.ringPrice),
    0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch product data when the component mounts
    dispatch(productList());
  }, [dispatch]); // Include dispatch as a dependency

  return (
    <>
      <div className="cart-page-text">
        <Link to="/">Go to Products Link</Link>
        <h3>Cart Page</h3>
      </div>
      <div className="cart-page-container">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Color</td>
              <td>Price</td>
              <td>Brand</td>
              <td>Category</td>
              <td>Remove button</td>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.color}</td>
                <td>${item.ringPrice}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => dispatch(removeToCart(item.id))}>
                    Remove from Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="price-details">
          <div className="adjust-price">
            <span>Amount</span>
            <span>{ringAmount}</span>
          </div>
          <div className="adjust-price">
            <span>Discount 10%</span>
            <span>{ringAmount / 10}</span>
          </div>
          <div className="adjust-price">
            <span>Tax</span>
            <span>000</span>
          </div>
          <div className="adjust-price">
            <span>Total Amount</span>
            <span>{ringAmount - ringAmount / 10}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
