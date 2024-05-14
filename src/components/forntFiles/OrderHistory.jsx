import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { toast } from 'react-toastify';
import { removeToCart, removeToWishlist } from "../../redux/action";


export const OrderHistory = ({setFormData}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const cartData = useSelector((state) => state.cartData);
  const wishlistData = useSelector((state) => state.wishlistData);


  const signOut = (event) =>{
    event.preventDefault();

    cartData.map((item) => {
      dispatch(removeToCart(item));
    });
    wishlistData.map((item) => {
      dispatch(removeToWishlist(item));
    });
    setTimeout(() => {
      history.push("/login");
      window.location.reload(true)
    }, 3000);

    localStorage.clear();
    localStorage.removeItem("persist:persist-store");

    toast.success("Sign Out Successfully", {
      position: "top-right"
    });

    
  }
  return (
    <>
      <div className="order-history" id="user-log">
        <div className="container">
          <div className="order-history-main">
            <ul className="list-unstyled">
              <li>
                <Link to="/accounts">My Account</Link>
              </li>
              <li>
                <Link to="/accounts">Order History</Link>
              </li>
              <li>
                <Link to="/wishlist">Wish List</Link>
              </li>
            </ul>
            <div className="sign-btn">
              <button className="submit"
              onClick={(event) => signOut(event)}
              >sign out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
