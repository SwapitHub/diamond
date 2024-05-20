import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SettingPreferences } from "./SettingPreferences";
import { OrdersContact } from "./OrdersContact";
import { OrdersHistoryDashboard } from "./OrdersHistoryDashboard";
import { useHistory } from "react-router-use-history";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../../../redux/action";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";
import { UserContext } from "../../../App";
export const MyAccountDashboard = () => {
  const {baseUrl} = useContext(UserContext)
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(1);

  const white = "18K WHITE GOLD";
  const yellow = "18K YELLOW GOLD";
  const rose = "18K ROSE GOLD";
  const platinum = "Platinum";
  const cartData = useSelector((state) => state.cartData);
  const wishlistData = useSelector((state) => state.wishlistData);

  const signOut = (event) => {
    event.preventDefault();

    cartData.map((item) => {
      dispatch(removeToCart(item));
    });

    setTimeout(() => {
      history.push("/login");
      window.location.reload(true);
    }, 2000);

    localStorage.removeItem("persist:persist-store");
    localStorage.clear();

    toast.success("Sign Out Successfully", {
      position: "top-right",
    });
  };
  const user_id = localStorage.getItem("formData");
  const [profileData, setProfileData] = useState();
  const [showOrderId, setShowOrderId] = useState(null);

  console.log(profileData);
  // =========
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/user-account?user_id=${user_id}`
      )
      .then((res) => {
        setProfileData(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("profile API is not working");
      });
  }, [cartData, wishlistData, user_id]);
  return (
    <>
      <div class="account-page">
        <div class="container">
          <div class="account-inner">
            <div class="account-side-bar">
              <div class="account-user-name">
                <AiOutlineUser />
                <span>Hi, {profileData?.userdata?.first_name}</span>
              </div>
              <ul class="nav">
                <li class={toggle == 1 ? "activated" : ""}>
                  <Link to="#" onClick={() => setToggle(1)}>
                    Account Overview
                  </Link>
                </li>
                <li class={toggle == 2 ? "activated" : ""}>
                  <Link to="#" onClick={() => setToggle(2)}>
                    Order History
                  </Link>
                </li>
                <li class={toggle == 3 ? "activated" : ""}>
                  <Link to="#" onClick={() => setToggle(3)}>
                    Settings & Preferences
                  </Link>
                </li>
                <li class={toggle == 4 ? "activated" : ""}>
                  <Link to="/cart" onClick={() => setToggle(4)}>
                    Shopping Bag
                  </Link>
                </li>
                <li class={toggle == 5 ? "activated" : ""}>
                  <Link to="/wishlist" onClick={() => setToggle(5)}>
                    Wish List
                  </Link>
                </li>
                <li class={toggle == 6 ? "activated" : ""}>
                  <Link to="javascript:void(0)" onClick={() => setToggle(6)}>
                    Refer a Friend
                  </Link>
                </li>
                <li class={toggle == 7 ? "activated" : ""}>
                  <Link to="#" onClick={(event) => signOut(event)}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
            {toggle == 1 && (
              <div class="account-right-data">
                <div class="order-history-main-dashboard">
                  <div class="order-col">
                    <div class="panel-heading">Order History</div>

                    <div class="panel-body">
                      {profileData?.order_history?.length > 0 ? (
                        profileData?.order_history?.slice(-1)?.map((item) => {
                          console.log(item);
                          const createdAt = new Date(item.created_at);
                          const formattedDate = format(createdAt, "MM/dd/yyyy");
                          return (
                            <p>
                              Your recent order{" "}
                              <Link
                                to="#"
                                onClick={() => {
                                  setToggle(2);
                                  setShowOrderId(item.order_id);
                                }}
                              >
                                {item.order_id}{" "}
                              </Link>
                              placed on {formattedDate}
                            </p>
                          );
                        })
                      ) : (
                        <p>You have no recent orders.</p>
                      )}
                    </div>

                    <div class="view-button">
                      <Link to="#" onClick={() => setToggle(2)}>
                        View Order History
                      </Link>
                    </div>
                  </div>

                  <div class="order-col">
                    <div class="panel-heading">Settings & Preferences</div>

                    <div class="panel-body">
                      <p>Update your name, email or change your password. </p>
                    </div>

                    <div class="view-button">
                      <Link to="#" onClick={() => setToggle(3)}>
                        Update Preferences
                      </Link>
                    </div>
                  </div>

                  <div class="order-col">
                    <div class="panel-heading">Shopping Bag</div>

                    <div class="panel-body">
                      <div class="shop-images">
                        <ul className="product-list">
                          {profileData?.cart?.length > 0 ? (
                            profileData?.cart?.slice(0, 3)?.map((item) => {
                              console.log(item);
                              return (
                                <>
                                  <li
                                    className={
                                      item.active_color === white
                                        ? "active white"
                                        : "displayed"
                                    }
                                  >
                                    <img
                                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                      alt="white Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>
                                  <li
                                    className={
                                      item.active_color === yellow
                                        ? "active yellow"
                                        : "displayed"
                                    }
                                  >
                                    <img
                                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
                                      alt="Gold Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>
                                  <li
                                    className={
                                      item.active_color === rose
                                        ? "active rose"
                                        : "displayed"
                                    }
                                  >
                                    <img
                                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
                                      alt="Gold Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>
                                  <li
                                    className={
                                      item.active_color === platinum
                                        ? "active platinum"
                                        : "displayed"
                                    }
                                  >
                                    <img
                                      src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
                                      alt="Gold Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>

                                  {item.gemstone.map((gemItem) => {
                                    return (
                                      <>
                                        <li>
                                          <img
                                            src={gemItem.image_url}
                                            alt="Gold Ring"
                                            className="img-responsive center-block"
                                          />
                                        </li>
                                      </>
                                    );
                                  })}
                                  {item.diamond.map((diaItem) => {
                                    return (
                                      <>
                                        <li>
                                          <img
                                            src={diaItem.image_url}
                                            alt="Gold Ring"
                                            className="img-responsive center-block"
                                          />
                                        </li>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })
                          ) : (
                            <div class="panel-body">
                              <p>View your bag items and checkout.</p>
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div class="view-button">
                      <Link to="/cart">View Shopping Bag</Link>
                    </div>
                  </div>

                  <div class="order-col">
                    <div class="panel-heading">Wish List</div>

                    <div class="panel-body">
                      <div class="shop-images">
                        <ul className="product-list">
                          {profileData?.wishlist?.length > 0 ? (
                            profileData?.wishlist?.slice(0, 4)?.map((item) => {
                              console.log(item);
                              return (
                                <>
                                  <li
                                    className={
                                      item.active_color === white
                                        ? "active white"
                                        : "displayed"
                                    }
                                  >
                                    <img
                                      src={item.ring?.default_image_url}
                                      alt="Gold Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>

                                  {item.gemstone.map((gemItem) => {
                                    return (
                                      <>
                                        <li>
                                          <img
                                            src={gemItem.image_url}
                                            alt="Gold Ring"
                                            className="img-responsive center-block"
                                          />
                                        </li>
                                      </>
                                    );
                                  })}
                                  {item.diamond.map((diaItem) => {
                                    return (
                                      <>
                                        <li>
                                          <img
                                            src={diaItem.image_url}
                                            alt="Gold Ring"
                                            className="img-responsive center-block"
                                          />
                                        </li>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })
                          ) : (
                            <div class="panel-body">
                              <p>View your bag items and checkout.</p>
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div class="view-button">
                      <Link to="/wishlist">View My Wish List</Link>
                    </div>
                  </div>

                  <div class="order-col">
                    <div class="panel-heading">Refer a Friend</div>

                    <div class="panel-body">
                      <p>Love Brilliant Earth? Tell your friends!</p>
                    </div>

                    <div class="view-button">
                      <Link to="#" onClick={() => setToggle(6)}>
                        Refer a Friend
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
            {toggle == 2 && (
              <OrdersHistoryDashboard
                profileData={profileData}
                showOrderId={showOrderId}
                setShowOrderId={setShowOrderId}
              />
            )}
            {toggle == 3 && <SettingPreferences profileData={profileData} />}
            {toggle == 4 && null}
            {toggle == 5 && null}
            {toggle == 6 && null}
            {toggle == 7 && null}
          </div>
        </div>
      </div>
    </>
  );
};
