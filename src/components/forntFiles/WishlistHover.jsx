import React, { useContext, useEffect, useMemo, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeToWishlist,
  setCartDetails,
  setWishlistDetails,
} from "../../redux/action";
import { UserContext } from "../../App";
import axios from "axios";
import debounce from "lodash.debounce";
import { productList, productListCart } from "../../redux/productAction";

export const WishlistHover = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlistData);
  console.log(wishlist);

  const {
    toggledProducts,
    setToggledProducts,
    setDiamondRingToggle,
    localWishlist,
    setLocalWishlist,
    setDiamondRingLocal,
    diamondRingLocal,
  } = useContext(UserContext);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    setLocalWishlist(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist?.forEach((item) => {
      initialToggledProducts[item.item?.id || item.diamonds?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  // }, [localWishlist]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("ring-diamond")) || [];
    setDiamondRingLocal(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist?.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setDiamondRingToggle(initialToggledProducts);
  }, [setDiamondRingToggle]);

  // useEffect(() => {
  //   localStorage.setItem("ring-diamond", JSON.stringify(diamondRingLocal));
  // }, [diamondRingLocal]);

  function handleWishData(item) {
    console.log(item);
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    const updatedWishlist = localWishlist?.filter(
      (wishlistItem) => wishlistItem.item?.id !== item.item?.id
    );
    setLocalWishlist(updatedWishlist);
    if (item.diamond) {
      setDiamondRingToggle((prevState) => ({
        ...prevState,
        [item.diamond?.id]: false,
      }));
      const updatedWishlists = diamondRingLocal.filter(
        (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
      );
      setDiamondRingLocal(updatedWishlists);
    }
  }
  function handleHoverWishlist(item) {
    console.log(item);
    dispatch(addToCart(item.removingItem));
    dispatch(removeToWishlist(item));
    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [item.diamond?.id]: false,
    }));
    const updatedWishlist = diamondRingLocal?.filter(
      (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
    );
    setDiamondRingLocal(updatedWishlist);
  }

  function handleHoverWishlistDiamond(item) {
    console.log(item);
    dispatch(addToCart(item));
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.diamonds?.id]: false,
    }));
    const updatedWishlist = localWishlist?.filter(
      (wishlistItem) => wishlistItem.diamonds?.id !== item.diamonds?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  function handleWishDataGemstone(item) {
    console.log(item);
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    const updatedWishlist = localWishlist?.filter(
      (wishlistItem) => wishlistItem.item?.id !== item.item?.id
    );
    setLocalWishlist(updatedWishlist);

    if (item.diamond) {
      setDiamondRingToggle((prevState) => ({
        ...prevState,
        [item.diamond?.id]: false,
      }));
      const updatedWishlists = diamondRingLocal.filter(
        (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
      );
      setDiamondRingLocal(updatedWishlists);
    }
  }

  function handleWishDataDiamond(item) {
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.diamonds?.id]: false,
    }));
    const updatedWishlist = localWishlist.filter(
      (wishlistItem) =>
        (wishlistItem.item?.id || wishlistItem.diamonds?.id) !==
        item.diamonds?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  const userId = localStorage.getItem("formData");

  const [tocaken, setTocaken] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const wishlistData = useSelector((state) => state.wishlistData);
  const cartData = useSelector((state) => state.cartData);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  console.log("mmmmmmmmmmmmmmmmmmmmmmmmm", wishListDataBase);
  const user_id = localStorage.getItem("formData");
  const productColor = "18K WHITE GOLD";
  // =======remove to card
  const fetchRemoveWishlistItem = useMemo(() => {
    return async (removeWishList) => {
      try {
        const response = await axios.get(
          `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${removeWishList}`
        );
        console.log("===========", response.data);
        dispatch(productList());
      } catch (error) {
        console.log("CSRF Token API Error:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (removeWishList) {
      fetchRemoveWishlistItem(removeWishList);
    }
  }, [fetchRemoveWishlistItem, removeWishList]);

  // const fetchData = useMemo(() => {
  //   return async () => {
  //     try {
  //       if (userId) {
  //         const response = await axios.get(
  //           `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/wishlist-items?user_id=${userId}`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": tocaken,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log("==================================", response);
  //           dispatch(setWishlistDetails(response.data.data));
  //         } else {
  //           console.error("Error Status:", response.status);
  //         }
  //       } else {
  //         console.log(null);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  // }, [wishlist]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);
  // =======================
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (userId) {
  //         const response = await axios.get(
  //           `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/getcart-items?user_id=${userId}`,

  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": tocaken,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log("=================get card item details", response);
  //           dispatch(setCartDetails(response.data));
  //         } else {
  //           console.error("Error Status:", response.status);
  //         }
  //       } else {
  //         console.log(null);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, [tocaken, cartData]);
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
    diamond_stock_no,
    userId,
    ring_size
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
      diamond_stock_no: diamond_stock_no,
      ring_size: ring_size,
    };

    localStorage.setItem("cart_data", JSON.stringify(formData));
    const savedWishlist = JSON.parse(localStorage.getItem("cart_data")) || [];

    const API_URl = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cart?user_id=${formData.user_id}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&diamond_id=${formData.diamond_id}&diamond_price=${diamond_price}&img_sku=${formData.img_sku}&ring_price=${formData.ring_price}&gemstone_stock_no=${formData.gemstone_stock_no}&diamond_stock_no=${formData.diamond_stock_no}&ring_size=${formData.ring_size}`;

    console.log(API_URl);
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
          console.log("jkfsdurfoiew", response);
          dispatch(productListCart());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchCsrfToken = useMemo(() => {
    return async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
        );
        return response.data.csrf_token;
      } catch (error) {
        console.log("CSRF Token API Error:", error);
        return null;
      }
    };
  }, []);

  useEffect(() => {
    fetchCsrfToken().then((token) => {
      if (token) {
        setTocaken(token);
      }
    });
  }, [fetchCsrfToken]);

  // function handleWishDataRemove(id) {
  //   console.log("==============", id);
  //   setWishlistRemoveId(id);
  // }

  const handleWishDataRemove = (wish_list_id, ring_id) => {
    const updatedItems = wishListDataBase.filter(
      (item) => item?.id !== wish_list_id
    );

    setRemoveWishList(wish_list_id);
    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (wish_list_id === item?.id) {
        console.log(wish_list_id, "===============", item?.id);
      }
    });

    wishlistData?.map((item) => {
      console.log(item.item?.id, "kjdklsfjoisdjf", ring_id);
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

  const handleWishDataRemoveWishlist = (wish_list_id, ring_id) => {
    const updatedItems = wishListDataBase.filter(
      (item) => item?.id !== wish_list_id
    );
    console.log(updatedItems);
    setRemoveWishList(wish_list_id);
    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (wish_list_id === item?.id) {
        console.log(wish_list_id, "===============", item?.id);
      }
    });

    wishlistData?.map((item) => {
      if (ring_id === (item.item?.id || item.diamonds?.id)) {
        dispatch(removeToWishlist(item));
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

  return (
    <>
      {userId ? (
        <div className="cart-card-main-wrap" id="user-log">
          <div className="cart-card">
            {wishListDataBase.length > 0 ? (
              wishListDataBase?.map((item, index) => {
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
                                  <Link
                                    to="javascript:void(0);"
                                    className="td-n2"
                                  >
                                    {item.ring?.name}
                                  </Link>
                                </h2>
                                <div className="money">${item?.ring_price}</div>
                                <div className="money">
                                  Ring Size: {item?.ring_size}
                                </div>
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
                                            item.ring_id
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
                                            item.gemstone_item
                                              ?.total_sales_price
                                              ? item.gemstone_item
                                                  ?.total_sales_price
                                              : "",
                                            item.gemstone_item
                                              ? item.gemstone_item
                                              : "",
                                            item.gemstone_item?.id
                                              ? item.gemstone_item?.id
                                              : "",
                                            diamond_item?.id,
                                            userId ? userId : null,
                                            item?.ring_size
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
                                        handleWishDataRemove(
                                          item.id,
                                          item?.ring_id
                                        );
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
                                            ? item?.diamond_item
                                                ?.total_sales_price
                                            : "",

                                          gemstoneItem?.stock_num,
                                          gemstoneItem?.total_sales_price,
                                          gemstoneItem,
                                          gemstoneItem?.id,
                                          item.diamond_item?.id
                                            ? item.diamond_item?.id
                                            : "",
                                          userId ? userId : null,
                                          item?.ring_size
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
                              handleWishDataRemoveWishlist(
                                item.id,
                                item?.ring_id
                              );
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
                                        item?.ring_price
                                          ? item?.ring_price
                                          : "",
                                        item.ring?.id ? item.ring?.id : "",
                                        item.ring ? item.ring : "",
                                        item.ring.imgUrl
                                          ? item.ring.imgUrl
                                          : "",
                                        item.productColor
                                          ? item.productColor
                                          : "",
                                        item.stock_num ? item.stock_num : "",
                                        item.diamond_item
                                          ? item.diamond_item
                                          : "",
                                        item.total_sales_price
                                          ? item.total_sales_price
                                          : "",
                                        gemstoneItem.stock_num,
                                        gemstoneItem.total_sales_price,
                                        gemstoneItem,
                                        gemstoneItem?.id,
                                        item.diamond_item?.id
                                          ? item.diamond_item?.id
                                          : "",
                                        userId ? userId : null,
                                        item?.ring_size ? item?.ring_size : ""
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
                                    handleWishDataRemoveWishlist(
                                      item.id,
                                      gemstoneItem.id
                                    );
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
                                        item?.ring_price
                                          ? item?.ring_price
                                          : "",
                                        item.ring?.id ? item.ring?.id : "",
                                        item.ring ? item.ring : "",
                                        item.ring.imgUrl
                                          ? item.ring.imgUrl
                                          : "",
                                        item.productColor
                                          ? item.productColor
                                          : "",
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
                                        diamond_item?.id,
                                        userId ? userId : null,

                                        item?.ring_size ? item?.ring_size : ""
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
                                      handleWishDataRemoveWishlist(
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
              })
            ) : (
              <div className="empty-wish-list">
                Oops! Looks like your wish list is empty.
              </div>
            )}
          </div>

          <div className="checkout-btn">
            <Link
              to={user_id ? "/wishlist-page" : "/wishlist"}
              className="btn btn-success btn-lg btn-block"
            >
              View Wist List
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-card-main-wrap" id="user-log">
          <div className="cart-card">
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => {
                console.log(item);
                return (
                  <>
                    {item.gemstoneSingle ? (
                      <div className="cart-card-inner" key={index}>
                        <div className="cart-left-main">
                          <ul className="carts-pic">
                            <Link to="javascript:void(0);">
                              <li>
                                <img
                                  src={
                                    item.gemstoneSingle?.image_url ||
                                    item.diamond?.image_url
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
                                <div>
                                  <h2>
                                    <Link
                                      to="javascript:void(0);"
                                      className="td-n2"
                                    >
                                      {item.gemstoneSingle?.short_title ||
                                        `${item.diamond?.size} Carat ${item.diamond?.shape} Diamond`}
                                    </Link>
                                  </h2>
                                  <div className="ir245-muted">
                                    <div>
                                      $
                                      {item.gemstoneSingle?.total_sales_price ||
                                        item.diamond?.total_sales_price}
                                    </div>
                                  </div>

                                  <div className="whislist-button-purple">
                                    <Link
                                      to="javascript:void(0);"
                                      onClick={() => {
                                        dispatch(addToCart(item));
                                        dispatch(removeToWishlist(item));
                                        setToggledProducts((prevState) => ({
                                          ...prevState,
                                          [item.item?.id]: false,
                                        }));
                                        item.diamond &&
                                          setDiamondRingToggle((prevState) => ({
                                            ...prevState,
                                            [item.diamond?.id]: false,
                                          }));
                                      }}
                                    >
                                      {/* Add to Bag */}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart-checkcross">
                          <IoIosClose
                            onClick={(e) => {
                              e.preventDefault();
                              handleWishDataGemstone(item);
                            }}
                          />
                        </div>
                      </div>
                    ) : item.item ? (
                      <div className="cart-card-inner" key={index}>
                        <div className="cart-left-main">
                          <ul className="carts-pic">
                            <Link to="javascript:void(0);">
                              <li>
                                <img
                                  src={
                                    item.item?.image
                                      ? item.item?.image
                                      : item.item?.image_url
                                      ? item.item?.image_url
                                      : item.item?.default_image_url
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
                                <div>
                                  <h2>
                                    <Link
                                      to="javascript:void(0);"
                                      className="td-n2"
                                    >
                                      <h2>
                                        <Link
                                          to="javascript:void(0);"
                                          className="td-n2"
                                        >
                                          {item.item?.name
                                            ? item.item?.name
                                            : item.item?.short_title}
                                        </Link>
                                      </h2>
                                    </Link>
                                  </h2>
                                  <div className="ir245-muted">
                                    <div>
                                      $
                                      {item.item?.white_gold_price
                                        ? item.item?.white_gold_price
                                        : item.item?.total_sales_price}
                                    </div>
                                  </div>
                                  {(item.item?.sku && item.item?.imageName) ||
                                  (item.item?.ProductClass && !item.diamond) ? (
                                    <div className="whislist-button-purple">
                                      <Link
                                        to={`/engagement-rings/start-with-a-diamond/?slug=${item.item?.slug}&color=${item.ring_color}`}
                                      >
                                        Add a Diamond
                                      </Link>
                                    </div>
                                  ) : (
                                    (item?.qty || item.item?.gem_type) && (
                                      <div className="whislist-button-purple">
                                        <Link
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(addToCart(item));
                                            dispatch(removeToWishlist(item));
                                            setToggledProducts((prevState) => ({
                                              ...prevState,
                                              [item.item?.id]: false,
                                            }));
                                            const updatedWishlist =
                                              localWishlist?.filter(
                                                (wishlistItem) =>
                                                  wishlistItem.item?.id !==
                                                  item.item?.id
                                              );
                                            setLocalWishlist(updatedWishlist);
                                            item.diamond &&
                                              setDiamondRingToggle(
                                                (prevState) => ({
                                                  ...prevState,
                                                  [item.diamond?.id]: false,
                                                })
                                              );
                                          }}
                                        >
                                          Add to Bag
                                        </Link>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart-checkcross">
                          <IoIosClose
                            onClick={(e) => {
                              e.preventDefault();
                              handleWishData(item);
                            }}
                          />
                        </div>
                        {item.diamond && (
                          // item.diamond.map((diamond, index) => (
                          <div className="cart-card-inner">
                            <div className="cart-left-main">
                              <img src={item.diamond?.image_url} alt="" />
                            </div>
                            <div className="cart-right-main">
                              <div className="cart-info">
                                <div className="cart-info-inner">
                                  <div className="cart-info-left">
                                    <div>
                                      <h2>
                                        <Link
                                          to="javascript:void(0);"
                                          className="td-n2"
                                        >
                                          <h2>
                                            <Link
                                              to="javascript:void(0);"
                                              className="td-n2"
                                            >
                                              {item.diamond
                                                .sub_title_description ? (
                                                <>
                                                  {item.diamond.size}{" "}
                                                  <span>Carat</span>{" "}
                                                  {item.diamond.shape}{" "}
                                                  <span> Diamond</span>{" "}
                                                </>
                                              ) : (
                                                item.diamond.short_title
                                              )}
                                            </Link>
                                          </h2>
                                        </Link>
                                      </h2>
                                      <div className="ir245-muted">
                                        <div>
                                          ${item.diamond?.total_sales_price}
                                        </div>
                                      </div>
                                      <div className="whislist-button-purple">
                                        <Link
                                          to="javascript:void(0);"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            handleHoverWishlist(item);
                                          }}
                                        >
                                          Add to Bag
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      item.diamonds && (
                        // item.diamond.map((diamond, index) => (
                        <>
                          <div className="cart-card-inner">
                            <div className="cart-checkcross">
                              <IoIosClose
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleWishDataDiamond(item);
                                }}
                              />
                            </div>
                            <div className="cart-left-main">
                              <img src={item.diamonds?.image_url} alt="" />
                            </div>
                            <div className="cart-right-main">
                              <div className="cart-info">
                                <div className="cart-info-inner">
                                  <div className="cart-info-left">
                                    <div>
                                      <h2>
                                        <Link
                                          to="javascript:void(0);"
                                          className="td-n2"
                                        >
                                          <h2>
                                            <Link
                                              to="javascript:void(0);"
                                              className="td-n2"
                                            >
                                              {item.diamonds
                                                .sub_title_description ? (
                                                <>
                                                  {item.diamonds.size}{" "}
                                                  <span>Carat</span>{" "}
                                                  {item.diamonds.shape}{" "}
                                                  <span> Diamond</span>{" "}
                                                </>
                                              ) : (
                                                item.diamond.short_title
                                              )}
                                            </Link>
                                          </h2>
                                        </Link>
                                      </h2>
                                      <div className="ir245-muted">
                                        <div>
                                          ${item.diamonds?.total_sales_price}
                                        </div>
                                      </div>
                                      <div className="whislist-button-purple">
                                        <Link
                                          to="javascript:void(0);"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            handleHoverWishlistDiamond(item);
                                          }}
                                        >
                                          Add to Bag
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    )}
                  </>
                );
              })
            ) : (
              <div className="empty-wish-list">
                Oops! Looks like your wish list is empty.
              </div>
            )}
          </div>
          <div className="checkout-btn">
            <Link to="/wishlist" className="btn btn-success btn-lg btn-block">
              View Wist List
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
