import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToWishlist,
  setCartDetails,
  setWishlistDetails,
} from "../../redux/action";

export const WishlistHoverDatabase = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("formData");
  const {
    setToggledProducts,
    setLocalWishlist,
    localWishlist,

    diamondRingLocal,
    setDiamondRingLocal,
    setDiamondRingToggle,
  } = useContext(UserContext);
  const [tocaken, setTocaken] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const wishlistData = useSelector((state) => state.wishlistData);
  const cartData = useSelector((state) => state.cartData);
  const wishListDataBase = useSelector((state) => state.wishlistReducer);

  console.log("mmmmmmmmmmmmmmmmmmmmmmmmm", wishListDataBase);
  const user_id = localStorage.getItem("formData");
  const productColor = "18K WHITE GOLD";
  // =======remove to card
  useEffect(() => {
    axios
      .get(
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${removeWishList}`
      )
      .then((res) => {
        console.log("===========", res.data);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, [removeWishList]);

  const prevWishlistLengthRef = useRef(wishListDataBase.length);
  useEffect(() => {
    // Check if the current length of wishlistDatabase is different from the previous length
    if (wishListDataBase.length !== prevWishlistLengthRef.current) {
      const fetchData = async () => {
        try {
          if (userId) {
            const response = await axios.get(
              `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/wishlist-items?user_id=${userId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": tocaken,
                },
              }
            );

            if (response.status === 200) {
              console.log("==================================", response);
              dispatch(setWishlistDetails(response.data.data));
            } else {
              console.error("Error Status:", response.status);
            }
          } else {
            console.log(null);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();

      // Update the previous length to the current length
      prevWishlistLengthRef.current = wishListDataBase.length;
    }
  }, [userId, wishListDataBase.length, dispatch, tocaken]);
  // =======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/getcart-items?user_id=${userId}`,

            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": tocaken,
              },
            }
          );

          if (response.status === 200) {
            console.log("=================get card item details", response);
            dispatch(setCartDetails(response.data));
          } else {
            console.error("Error Status:", response.status);
          }
        } else {
          console.log(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userId, tocaken, cartData, wishListDataBase]);
  //   ==========
  const handleCreateAccount = async (
    ring_price,
    ring_id,
    ring_data,
    ring_img,
    ring_color,
    diamond_id,
    diamondItem,
    diamond_price,
    gemstone_id,
    gemstone_price,
    gemstoneItem,
    gemstone_stock_no,
    userId
  ) => {
    const formData = {
      user_id: userId,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      ring_id: ring_id,
      ring_color: ring_color,
      ring_price: ring_price,
      diamond_id: diamond_id,
      diamond_price: diamond_price,
      img_sku: ring_img,
      gemstone_stock_no: gemstone_stock_no,
    };

    localStorage.setItem("cart_data", JSON.stringify(formData));
    const savedWishlist = JSON.parse(localStorage.getItem("cart_data")) || [];

    const API_URl = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cart?user_id=${formData.user_id}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&diamond_id=${formData.diamond_id}&diamond_price=${diamond_price}&img_sku=${formData.img_sku}&ring_price=${formData.ring_price}&gemstone_stock_no=${formData.gemstone_stock_no}`;

    axios
      .get(
        API_URl,

        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": tocaken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setTocaken(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);

  // function handleWishDataRemove(id) {
  //   console.log("==============", id);
  //   setWishlistRemoveId(id);
  // }

  const handleWishDataRemove = (wish_list_id, ring_id) => {
    const updatedItems = wishListDataBase.filter(
      (item) => item?.id !== wish_list_id
    );
    dispatch(setWishlistDetails(updatedItems));
    setRemoveWishList(wish_list_id);
    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (wish_list_id === item?.id) {
        console.log(wish_list_id, "===============", item?.id);
        dispatch(setWishlistDetails(updatedItems));
      }
    });

    wishlistData?.map((item) => {
      if (ring_id === (item.item?.id || item.diamonds?.id)) {
        dispatch(removeToWishlist(item));
        dispatch(addToCart(item));
      }

      if (
        item.product_type === "ring_diamond" ||
        item.product_type === "ring_gemstone"
      ) {
        setDiamondRingToggle((prevState) => ({
          ...prevState,
          [item.diamond?.id]: false,
        }));
        const updatedWishlist = diamondRingLocal.filter(
          (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
        );

        setDiamondRingLocal(updatedWishlist);
      } else {
        const updatedItems = wishListDataBase?.filter(
          (item) => item.id !== wish_list_id
        );
        dispatch(setWishlistDetails(updatedItems));
        // setWishlistRemoveId(wish_list_id);
        setToggledProducts((prevState) => ({
          ...prevState,
          [ring_id]: false,
        }));
        const updatedWishlist = localWishlist.filter(
          (wishlistItem) =>
            (wishlistItem.item?.id || wishlistItem.diamonds?.id) !== ring_id
        );
        setLocalWishlist(updatedWishlist);
      }
    });
  };

  // =======remove to card
  useEffect(() => {
    const delayedSearch = debounce(() => {
      axios
        .get(
          `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${removeWishList}`
        )
        .then((res) => {})
        .catch((error) => {
          console.log("CSRF Token API Error:", error);
        });
    }, 500);

    delayedSearch();

    return delayedSearch.cancel;
  }, [removeWishList]);
  // ==================
  return (
    <>
      <div className="cart-card-main-wrap" id="user-log">
        <div className="cart-card">
          {wishListDataBase.length > 0 ? wishListDataBase?.map((item, index) => {
            console.log(item, "dddddddddddddddddddddddddddddddd");
            return (
              <>
                {item.product_type == "ring_diamond" ||
                item.product_type == "ring" ||
                item.product_type == "ring_gemstone" ? (
                  <div className="cart-card-inner" key={index}>
                    <div className="cart-left-main">
                      <ul className="carts-pic">
                        <Link to="javascript:void(0);">
                          <li>
                            <img
                              src={
                                item.ring?.default_image_url
                                  ? item.ring?.default_image_url
                                  : `https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`
                              }
                              alt="Gold Ring"
                              className="img-responsive center-block"
                            />
                          </li>
                        </Link>
                      </ul>
                    </div>
                    <div className="cart-right-main">
                      <div className="cart-info">
                        <div className="cart-info-inner">
                          <div className="cart-info-left">
                            <h2>
                              <Link to="javascript:void(0);" className="td-n2">
                                {item.ring?.name}
                              </Link>
                            </h2>
                            <div className="money">${item?.ring_price}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {item?.diamond &&
                      item?.diamond.map((diamond_item) => {
                        return (
                          <>
                            <div className="cart-left-main">
                              <ul className="carts-pic">
                                <Link to="javascript:void(0);">
                                  <li>
                                    <img
                                      src={diamond_item?.image_url}
                                      alt="Gold Ring"
                                      className="img-responsive center-block"
                                    />
                                  </li>
                                </Link>
                              </ul>
                            </div>
                            <div className="cart-right-main">
                              <div className="cart-info">
                                <div className="cart-info-inner">
                                  <div className="cart-info-left">
                                    <div className="money">
                                      {diamond_item?.size} carat{" "}
                                      {diamond_item?.shape} Diamond
                                    </div>
                                    <div className="money">
                                      ${item?.diamond_price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="whislist-button-purple">
                                {item?.product_type == "ring" ? (
                                  <Link
                                    to={`/engagement-rings/start-with-a-diamond/?slug=${item.ring?.slug}&color=${item?.active_color}`}
                                  >
                                    Add a Diamond
                                  </Link>
                                ) : (
                                  <Link
                                    key={index}
                                    to="javascript:void(0)"
                                    onClick={() => {
                                      handleWishDataRemove(
                                        item.id,
                                        diamond_item.id
                                      );
                                      handleCreateAccount(
                                        item?.ring_price,
                                        item.ring?.id,
                                        item.ring,
                                        item.img_sku,
                                        productColor,
                                        diamond_item?.stock_num,
                                        diamond_item,
                                        diamond_item?.total_sales_price,

                                        item.gemstone_item?.stock_num
                                          ? item.gemstone_item?.stock_num
                                          : "",
                                        item.gemstone_item?.total_sales_price
                                          ? item.gemstone_item
                                              ?.total_sales_price
                                          : "",
                                        item.gemstone_item
                                          ? item.gemstone_item
                                          : "",
                                        item.gemstone_item?.id
                                          ? item.gemstone_item?.id
                                          : "",
                                        userId ? userId : null
                                      );
                                    }}
                                  >
                                    Add to Bag
                                  </Link>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}

                    <div className=" whislist-button-purple">
                      {item?.product_type == "ring" && (
                        <Link
                          to={`/engagement-rings/start-with-a-diamond/?slug=${item.ring?.slug}&color=${item?.active_color}`}
                        >
                          Add a Diamond
                        </Link>
                      )}
                    </div>
                    {item.gemstone?.map((gemstoneItem) => {
                      return (
                        <>
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="javascript:void(0);">
                                <li>
                                  <img
                                    src={gemstoneItem?.image_url}
                                    alt="Gold Ring"
                                    className="img-responsive center-block"
                                  />
                                </li>
                              </Link>
                            </ul>
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <div className="cart-info-inner">
                                <div className="cart-info-left">
                                  <div className="money">
                                    {gemstoneItem?.short_title}
                                  </div>
                                  <div className="money">
                                    {" "}
                                    ${gemstoneItem?.total_sales_price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="whislist-button-purple">
                              {item?.product_type == "ring" ? (
                                <Link
                                  to={`/engagement-rings/start-with-a-diamond/?slug=${item.ring?.slug}&color=${item?.active_color}`}
                                >
                                  Add a Diamond
                                </Link>
                              ) : (
                                <Link
                                  key={index} // Add a unique key for each link
                                  to="javascript:void(0)"
                                  onClick={() => {
                                    handleWishDataRemove(item.id);
                                    handleCreateAccount(
                                      item?.ring_price,
                                      item.ring?.id,
                                      item.ring,
                                      item.img_sku,
                                      productColor,
                                      item.diamond_item?.stock_num
                                        ? item.diamond_item?.stock_num
                                        : "",
                                      item.diamond_item
                                        ? item?.diamond_item
                                        : "",
                                      item.diamond_item?.total_sales_price
                                        ? item?.diamond_item?.total_sales_price
                                        : "",

                                      gemstoneItem?.stock_num,
                                      gemstoneItem?.total_sales_price,
                                      gemstoneItem,
                                      gemstoneItem?.id,

                                      userId ? userId : null
                                    );
                                  }}
                                >
                                  Add to Bag
                                </Link>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}

                    <div className="cart-checkcross">
                      <IoIosClose
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishDataRemove(item.id, item?.ring_id);
                        }}
                      />
                    </div>
                  </div>
                ) : item?.product_type == "gemstone" ? (
                  item?.gemstone?.map((gemstoneItem) => {
                    return (
                      <>
                        <div className="cart-card-inner" key={index}>
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="javascript:void(0);">
                                <li>
                                  <img
                                    src={gemstoneItem?.image_url}
                                    alt="Gold Ring"
                                    className="img-responsive center-block"
                                  />
                                </li>
                              </Link>
                            </ul>
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <div className="cart-info-inner">
                                <div className="cart-info-left">
                                  <div className="money">
                                    {gemstoneItem?.short_title}
                                  </div>
                                  <div className="money">
                                    {" "}
                                    ${gemstoneItem?.total_sales_price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="whislist-button-purple">
                              <Link
                                to="javascript:void(0)"
                                onClick={() => {
                                  handleWishDataRemove(
                                    item.id,
                                    gemstoneItem.id
                                  );
                                  handleCreateAccount(
                                    item?.ring_price ? item?.ring_price : "",
                                    item.ring?.id ? item.ring?.id : "",
                                    item.ring ? item.ring : "",
                                    item.ring.imgUrl ? item.ring.imgUrl : "",
                                    item.productColor ? item.productColor : "",
                                    item.stock_num ? item.stock_num : "",
                                    item.diamond_item ? item.diamond_item : "",
                                    item.total_sales_price
                                      ? item.total_sales_price
                                      : "",
                                    gemstoneItem.stock_num,
                                    gemstoneItem.total_sales_price,
                                    gemstoneItem,
                                    gemstoneItem?.id,
                                    userId ? userId : null
                                  );
                                }}
                              >
                                Add to Bag
                              </Link>
                            </div>
                          </div>

                          <div className="cart-checkcross">
                            <IoIosClose
                              onClick={(e) => {
                                e.preventDefault();
                                handleWishDataRemove(item.id, gemstoneItem.id);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  item?.diamond &&
                  item?.diamond.map((diamond_item) => {
                    return (
                      <>
                        <div className="cart-card-inner">
                          <div className="cart-left-main">
                            <ul className="carts-pic">
                              <Link to="javascript:void(0);">
                                <li>
                                  <img
                                    src={diamond_item?.image_url}
                                    alt="Gold Ring"
                                    className="img-responsive center-block"
                                  />
                                </li>
                              </Link>
                            </ul>
                          </div>
                          <div className="cart-right-main">
                            <div className="cart-info">
                              <div className="cart-info-inner">
                                <div className="cart-info-left">
                                  <div className="money">
                                    {diamond_item?.size} carat{" "}
                                    {diamond_item?.shape} Diamond
                                  </div>
                                  <div className="money">
                                    ${item?.diamond_price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="whislist-button-purple">
                              <Link
                                key={index} // Add a unique key for each link
                                to="javascript:void(0)"
                                onClick={() => {
                                  handleWishDataRemove(
                                    item.id,
                                    diamond_item.id
                                  );
                                  handleCreateAccount(
                                    item?.ring_price ? item?.ring_price : "",
                                    item.ring?.id ? item.ring?.id : "",
                                    item.ring ? item.ring : "",
                                    item.ring.imgUrl ? item.ring.imgUrl : "",
                                    item.productColor ? item.productColor : "",
                                    diamond_item?.stock_num,
                                    diamond_item,
                                    diamond_item?.total_sales_price,

                                    item.gemstone_item?.stock_num
                                      ? item.gemstone_item?.stock_num
                                      : "",
                                    item.gemstone_item?.total_sales_price
                                      ? item.gemstone_item?.total_sales_price
                                      : "",
                                    item.gemstone_item
                                      ? item.gemstone_item
                                      : "",
                                    item.gemstone_item?.id
                                      ? item.gemstone_item?.id
                                      : "",

                                    userId ? userId : null
                                  );
                                }}
                              >
                                Add to Bag
                              </Link>
                            </div>
                            <div className="cart-checkcross">
                              <IoIosClose
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleWishDataRemove(
                                    item.id,
                                    diamond_item.id
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
              </>
            );
          }): <div className="empty-wish-list">Oops! Looks like your wish list is empty.</div>}


        </div>
        
        <div className="checkout-btn">
          <Link to={user_id ? "/wishlist-page" : "/wishlist" }className="btn btn-success btn-lg btn-block">
            View Wist List
          </Link>
        </div>
      </div>
    </>
  );
};
