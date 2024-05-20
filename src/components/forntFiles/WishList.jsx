import React, { useContext, useEffect, useState } from "react";
import { validateEmail } from "./ValidationFunctions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VscChromeClose } from "react-icons/vsc";
import {
  addToCart,
  removeToWishlist,
  setCartDetails,
  setWishlistDetails,
} from "../../redux/action";
import { UserContext } from "../../App";
import axios from "axios";
import Select from "react-select";
import { productList, productListCart } from "../../redux/productAction";

export const WishList = () => {
  let engagementRingShown = false;
  const productColor = "18K WHITE GOLD";
  const all = "all";
  const gemstone = "gemstone";
  const ring = "ring";
  const diamond = "diamond";
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeWishList, setActiveWishList] = useState(all);
  const [shapeData, setShapeData] = useState();
  const [removeWishList, setRemoveWishList] = useState();

  const {
    setDiamondRingToggle,
    localWishlist,
    setLocalWishlist,
    diamondRingLocal,
    setToggledProducts,
    setDiamondRingLocal,
    baseUrl,
  } = useContext(UserContext);
  const options = [
    { value: "Less than 3", label: "Less than 3" },
    { value: "3", label: "3" },
    { value: "3 1/2", label: "3 1/2" },
    { value: "4", label: "4" },
    { value: "4 1/2", label: "4 1/2" },
    { value: "5", label: "5" },
    { value: "5 1/2", label: "5 1/2" },
    { value: "6", label: "6" },
    { value: "6 1/2", label: "6 1/2" },
    { value: "7", label: "7" },
    { value: "7 1/2", label: "7 1/2" },
    { value: "8", label: "8" },
    { value: "8 1/2", label: "8 1/2" },
    { value: "9", label: "9" },
    { value: "9 1/2", label: "9 1/2" },
    { value: "10", label: "10" },
    { value: "10 1/2", label: "10 1/2" },
    { value: "11", label: "11" },
    { value: "11 1/2", label: "11 /12" },
    { value: "12", label: "12" },
    { value: "Greater than 12", label: "Greater than 12" },
  ];

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLocalWishlist(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist?.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setToggledProducts(initialToggledProducts);
  }, [setToggledProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("ring-diamond")) || [];
    setDiamondRingLocal(savedWishlist);

    const initialToggledProducts = {};
    savedWishlist.forEach((item) => {
      initialToggledProducts[item.item?.id] = true;
    });
    setDiamondRingToggle(initialToggledProducts);
  }, [setDiamondRingToggle]);

  useEffect(() => {
    localStorage.setItem("ring-diamond", JSON.stringify(diamondRingLocal));
  }, [diamondRingLocal]);

  function validateWhishList() {
    validateEmail(
      document.getElementById("whishlist-email").value,
      "whishlist-email",
      "Email Address"
    );
  }

  const wishlist = useSelector((state) => state.wishlistData);
  const dispatch = useDispatch();
  console.log(wishlist);
  function handleWishlistData(item, product_type) {
    const itemToRemove = item.removingItem + product_type;
    dispatch(addToCart(item.removingItem));
    dispatch(removeToWishlist(item));

    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [item.diamond?.id]: false,
    }));
    const updatedWishlists = diamondRingLocal.filter(
      (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
    );
    setDiamondRingLocal(updatedWishlists);
  }

  function handleWishlistDataGemstones(item) {
    dispatch(addToCart(item));
    dispatch(removeToWishlist(item));

    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    const updatedWishlist = localWishlist?.filter(
      (wishlistItem) => wishlistItem.item?.id !== item.item?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  function handleWishlistDataDiamond(item) {
    dispatch(addToCart(item));
    dispatch(removeToWishlist(item));

    setToggledProducts((prevState) => ({
      ...prevState,
      [item.diamond?.id]: false,
    }));
    const updatedWishlist = localWishlist?.filter(
      (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
    );
    setLocalWishlist(updatedWishlist);
  }
  // let engagementRingHeaderPrinted = false;
  // let gemstonesHeaderPrinted = false;
  // let diamondHeaderPrinted = false;

  function handleRemove(item) {
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

  const handleWishList = (item) => {
    setActiveWishList(item);
    // console.log("dddddd",item);
  };

  function handleRing(item) {
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    const updatedWishlist = localWishlist.filter(
      (wishlistItem) => wishlistItem.item?.id !== item.item?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  function handleDiamond(item) {
    console.log(item);
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.diamonds?.id]: false,
    }));

    const updatedWishlist = localWishlist.filter(
      (wishlistItem) => wishlistItem.diamonds?.id !== item.diamonds?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  function handleGemstone(item) {
    console.log(item);
    dispatch(removeToWishlist(item));
    setToggledProducts((prevState) => ({
      ...prevState,
      [item.item?.id]: false,
    }));
    const updatedWishlist = localWishlist.filter(
      (wishlistItem) => wishlistItem.item?.id !== item.item?.id
    );
    setLocalWishlist(updatedWishlist);
  }

  function handleDiamondRing(item) {
    dispatch(removeToWishlist(item));
    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [item.diamond?.id]: false,
    }));
    const updatedWishlist = diamondRingLocal.filter(
      (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
    );

    setDiamondRingLocal(updatedWishlist);
  }

  function handleGemRing(item) {
    dispatch(removeToWishlist(item));
    setDiamondRingToggle((prevState) => ({
      ...prevState,
      [item.diamond?.id]: false,
    }));
    const updatedWishlist = diamondRingLocal.filter(
      (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
    );

    setDiamondRingLocal(updatedWishlist);
  }

  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  console.log(wishListDataBase);

  function handleWishlistData(item) {
    dispatch(addToCart(item.removingItem));
    dispatch(removeToWishlist(item));
  }

  function handleWishlistDataGemstones(item) {
    dispatch(addToCart(item));
    dispatch(removeToWishlist(item));
  }
  let engagementRingHeaderPrinted = false;
  let gemstonesHeaderPrinted = false;

  // =======================
  const userId = localStorage.getItem("formData");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (userId) {
  //         const response = await axios.get(
  //           `${baseUrl}/wishlist-items?user_id=${userId}`,

  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-CSRF-TOKEN": shapeData,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           console.log("=================get card item details", response);
  //           dispatch(setWishlistDetails(response.data.data));
  //           console.log(response);
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
  // }, [setWishlistDetails, wishlist]);

  // ========================end
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setShapeData(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);
  // =============

  console.log(activeWishList);

  //   =======

  const removeWishlistItem = (wish_list_id, ring_id) => {
    wishlist?.map((item) => {
      if (ring_id === (item.item?.id || item.diamonds?.id)) {
        dispatch(removeToWishlist(item));

        if (
          item.product_type === "ring" ||
          item.product_type === "gemstone" ||
          item.product_type === "diamond"
        ) {
          setToggledProducts((prevState) => ({
            ...prevState,
            [item.item?.id || item.diamonds?.id]: false,
          }));
          const updatedWishlist = localWishlist.filter(
            (wishlistItem) =>
              (wishlistItem.item?.id || wishlistItem.diamonds?.id) !==
              (item.item?.id || item.diamonds?.id)
          );
          setLocalWishlist(updatedWishlist);
        } else {
          setDiamondRingToggle((prevState) => ({
            ...prevState,
            [item.diamond?.id]: false,
          }));
          const updatedWishlist = diamondRingLocal.filter(
            (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
          );
          console.log(updatedWishlist);
          setDiamondRingLocal(updatedWishlist);
        }
      }
    });
    setRemoveWishList(wish_list_id);
    console.log(wish_list_id);
    const updatedItems = wishListDataBase?.filter(
      (item) => item.id !== wish_list_id
    );

    const updatedRemovedItem = wishListDataBase?.filter(
      (item) => item.id === wish_list_id
    );
  };
  const removeWishlistItemWishlist = (wish_list_id, ring_id) => {
    wishlist?.map((item) => {
      console.log(item);
      console.log(item.item?.id, "===============", ring_id);
      if (ring_id === (item.item?.id || item.diamonds?.id)) {
        dispatch(removeToWishlist(item));

        if (
          item.product_type === "ring" ||
          item.product_type === "gemstone" ||
          item.product_type === "diamond"
        ) {
          setToggledProducts((prevState) => ({
            ...prevState,
            [item.item?.id || item.diamonds?.id]: false,
          }));
          const updatedWishlist = localWishlist.filter(
            (wishlistItem) =>
              (wishlistItem.item?.id || wishlistItem.diamonds?.id) !==
              (item.item?.id || item.diamonds?.id)
          );
          setLocalWishlist(updatedWishlist);
        } else {
          setDiamondRingToggle((prevState) => ({
            ...prevState,
            [item.diamond?.id]: false,
          }));
          const updatedWishlist = diamondRingLocal.filter(
            (wishlistItem) => wishlistItem.diamond?.id !== item.diamond?.id
          );
          console.log(updatedWishlist);
          setDiamondRingLocal(updatedWishlist);
        }
      }
    });
    setRemoveWishList(wish_list_id);
    console.log(wish_list_id);
    const updatedItems = wishListDataBase?.filter(
      (item) => item.id !== wish_list_id
    );
  };
  // =======remove to card
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/remove_wishlist_item/${removeWishList}`
      )
      .then((res) => {
        console.log("=====", res.data);
        dispatch(productList());
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, [removeWishList]);
  // ==================

  const user_id = localStorage.getItem("formData");
  const ring_data = "gemstone";

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
    };

    localStorage.setItem("cart_data", JSON.stringify(formData));
    const savedWishlist = JSON.parse(localStorage.getItem("cart_data")) || [];

    console.log("============================", formData);
    const API_URl = `${baseUrl}/cart?user_id=${formData.user_id}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&diamond_id=${formData.diamond_id}&diamond_price=${diamond_price}&img_sku=${formData.img_sku}&ring_price=${formData.ring_price}`;

    console.log(API_URl);

    axios
      .get(
        API_URl,

        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": shapeData,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "=================cart data user id",
            response.data.data.user_id
          );
          dispatch(productListCart());
          dispatch(productList());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      {userId ? (
        <section className="wishlist-main wishlist-data-base">
          <div className="container">
            <div className="breadcrums">
              <ul>
                <li>
                  <Link to="/">Home /</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wish List /</Link>
                </li>
              </ul>
            </div>
            <div className="wishlist-reset-content">
              <h2>Wish List</h2>
            </div>
            {wishListDataBase?.length < 1 && (
              <div className="wishlist-create">
                <div className="wishlist-reset-content">
                  <p>
                    Your wish list is empty. Click the heart icon near an item
                    you love to save across all your devices.
                  </p>
                </div>
                {/* <div className="reset-forms wishlist-acct">
                <form action="" className="form-inline">
                  <div className="input-group">
                    <label className="sr-only">Email address</label>
                    <input
                      type="text"
                      className="zip-code"
                      placeholder="your Email Address"
                      name="email"
                      id="whishlist-email"
                      onChange={(e) =>
                        validateEmail(
                          e.target.value,
                          "whishlist-email",
                          "Email Address"
                        )
                      }
                    />
                    <div className="error_1"></div>
                    <span className="input-group-btn">
                      <button
                        type="button"
                        className="view-menu"
                        onClick={validateWhishList}
                      ></button>
                    </span>
                  </div>
                </form>
              </div> */}
              </div>
            )}
            {/* =========== */}
            {wishListDataBase?.length > 0 && (
              <div className="wishlist_tab_engagementrings">
                <div class="wish-list-tab">
                  <ul>
                    <li
                      className={
                        activeWishList === all
                          ? "wish-header  active"
                          : "wish-header "
                      }
                      onClick={(e) => {
                        handleWishList(all);
                      }}
                    >
                      all
                    </li>
                    {wishListDataBase
                      .reduce((acc, item) => {
                        if (
                          item.product_type &&
                          !acc.includes(item.product_type)
                        ) {
                          acc.push(item.product_type);
                        }
                        return acc;
                      }, [])
                      .map((productType, index) => (
                        <li
                          key={index}
                          className={
                            activeWishList === productType
                              ? "wish-header active"
                              : "wish-header"
                          }
                          onClick={() => {
                            handleWishList(productType);
                          }}
                        >
                          {productType === "gemstone"
                            ? "gemstone"
                            : productType === "diamond"
                            ? "diamond"
                            : (productType === "ring" ||
                                productType === "ring_diamond" ||
                                productType === "ring_gemstone") &&
                              !engagementRingShown
                            ? ((engagementRingShown = true), "engagement ring")
                            : ""}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="wishlist_page-column">
                  {wishListDataBase?.map((item) => {
                    return (
                      <>
                        {/* ==============all view */}
                        {item.product_type ? (
                          <div
                            className={
                              activeWishList === all
                                ? "wishList-data all active"
                                : "wishList-data"
                            }
                          >
                            {item.product_type === "ring_diamond" ||
                            item.product_type === "ring" ||
                            item.product_type === "ring_gemstone" ? (
                              <div class="wishlists-inner-row all-ring">
                                <div class="whishlist-colum">
                                  <span>
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        removeWishlistItemWishlist(
                                          item.id,
                                          item?.ring_id
                                        )
                                      }
                                    >
                                      <VscChromeClose />
                                    </Link>
                                  </span>
                                  <div class="top-whish-list">
                                    <Link to="#">
                                      <img src={item.ring.default_image_url} />
                                    </Link>
                                  </div>
                                  <div class="caption">
                                    <a href="#" class="product-info">
                                      <div
                                        class="headline"
                                        data-item="CYO Rings"
                                      >
                                        {item.ring.name}
                                      </div>
                                    </a>

                                    {item.diamond.length > 0
                                      ? item.diamond.map((diamond_item) => {
                                          return (
                                            <>
                                              <div class="money">
                                                {diamond_item.size} carat{" "}
                                                {diamond_item.shape}
                                              </div>
                                            </>
                                          );
                                        })
                                      : item.gemstone.map((gemstone_item) => {
                                          return (
                                            <>
                                              <div class="money">
                                                {gemstone_item.short_title}
                                              </div>
                                            </>
                                          );
                                        })}

                                    <div className="money">
                                      {item.diamond_price !== null ? (
                                        <>
                                          $
                                          {(
                                            parseFloat(item.ring_price || 0) +
                                            parseFloat(item.diamond_price || 0)
                                          ).toFixed(2)}
                                        </>
                                      ) : (
                                        // If diamond_price is null, display only ring_price
                                        <>
                                          $
                                          {(
                                            parseFloat(item.ring_price || 0) +
                                            parseFloat(item.gemstone_price || 0)
                                          ).toFixed(2)}
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="whishlist-footer">
                                    {/* <Select
                                      defaultValue={selectedOption}
                                      onChange={setSelectedOption}
                                      options={options}
                                      placeholder="Select Size"
                                    /> */}
                                    {item.product_type === "ring" ? (
                                      <Link
                                        to={`/engagement-rings/start-with-a-diamond/?slug=${item.ring?.slug}&color=${item?.active_color}`}
                                        className="bg-btn"
                                      >
                                        Add a Diamond
                                      </Link>
                                    ) : item.product_type === "ring_diamond" ? (
                                      // Map over each diamond item and render a link
                                      item.diamond.map(
                                        (diamond_item, index) => (
                                          <Link
                                            key={index} // Add a unique key for each link
                                            className="bg-btn"
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              removeWishlistItem(item.id);
                                              handleCreateAccount(
                                                item?.ring_price,
                                                item.ring?.id,
                                                item.ring,
                                                item.img_sku,
                                                productColor,
                                                diamond_item.stock_num,
                                                diamond_item,
                                                diamond_item.total_sales_price,
                                                item.item?.stock_num
                                                  ? item.item.stock_num
                                                  : "",
                                                item.item?.total_sales_price
                                                  ? item.item.total_sales_price
                                                  : "",
                                                item.item?.gemstoneItem
                                                  ? item.item.gemstoneItem
                                                  : "",
                                                userId ? userId : null
                                              );
                                            }}
                                          >
                                            Add To Bag
                                          </Link>
                                        )
                                      )
                                    ) : (
                                      item.gemstone.map(
                                        (gemstone_item, index) => (
                                          <Link
                                            key={index} // Add a unique key for each link
                                            className="bg-btn"
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              removeWishlistItem(item.id);
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
                                                item.diamond_item
                                                  ?.total_sales_price
                                                  ? item?.diamond_item
                                                      ?.total_sales_price
                                                  : "",

                                                gemstone_item?.stock_num,
                                                gemstone_item?.total_sales_price,
                                                gemstone_item,

                                                userId ? userId : null
                                              );
                                            }}
                                          >
                                            Add To Bag
                                          </Link>
                                        )
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            {item.product_type === "diamond" ? (
                              <div class="wishlists-inner-row diamond">
                                {item.diamond?.map((diamondsItem) => {
                                  return (
                                    <div class="whishlist-colum">
                                      <span>
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            removeWishlistItemWishlist(
                                              item.id,
                                              diamondsItem.id
                                            )
                                          }
                                        >
                                          <VscChromeClose />
                                        </Link>
                                      </span>
                                      <div class="top-whish-list">
                                        <Link to="#">
                                          <img src={diamondsItem?.image_url} />
                                        </Link>
                                      </div>
                                      <div class="caption">
                                        <a href="#" class="product-info">
                                          <div class="money">
                                            {diamondsItem?.size} carat{" "}
                                            {diamondsItem?.shape}
                                          </div>
                                        </a>

                                        <div class="money">
                                          ${diamondsItem?.total_sales_price}
                                        </div>
                                      </div>
                                      {item?.diamond.map(
                                        (diamond_item, index) => (
                                          <div
                                            key={index}
                                            className="whishlist-footer"
                                          >
                                            <Link
                                              to={`/engagement-rings/start-with-a-setting?stock_num=${
                                                diamond_item?.stock_num || ""
                                              }`}
                                              className="transparent-btn"
                                            >
                                              Add to Ring
                                            </Link>
                                            <Link
                                              className="bg-btn"
                                              to="javascript:void(0)"
                                              onClick={() => {
                                                removeWishlistItem(item.id);

                                                handleCreateAccount(
                                                  item?.ring_price || "",
                                                  item.ring?.id || "",
                                                  item.ring || "",
                                                  item.ring?.imgUrl || "",
                                                  item.productColor || "",
                                                  diamond_item?.stock_num || "", // Ensure diamond_item is defined
                                                  diamond_item || "", // Ensure diamond_item is defined
                                                  diamond_item?.total_sales_price ||
                                                    "", // Ensure diamond_item is defined
                                                  item.gemstoneItem
                                                    ?.stock_num || "", // Ensure gemstoneItem is defined
                                                  item.gemstoneItem
                                                    ?.total_sales_price || "", // Ensure gemstoneItem is defined
                                                  item.gemstoneItem || "", // Ensure gemstoneItem is defined
                                                  userId || null
                                                );
                                              }}
                                            >
                                              Add To Bag
                                            </Link>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}

                            {item.product_type === "gemstone" &&
                              item.gemstone?.map((gemstoneItem) => {
                                return (
                                  <div class="wishlists-inner-row gemstone">
                                    <div class="whishlist-colum">
                                      <span>
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            removeWishlistItemWishlist(
                                              item.id,
                                              gemstoneItem.id
                                            )
                                          }
                                        >
                                          <VscChromeClose />
                                        </Link>
                                      </span>
                                      <div class="top-whish-list">
                                        <Link to="#">
                                          <img src={gemstoneItem.image_url} />
                                        </Link>
                                      </div>
                                      <div class="caption">
                                        <a href="#" class="product-info">
                                          <div
                                            class="headline"
                                            data-item="CYO Rings"
                                          >
                                            {gemstoneItem.short_title}
                                          </div>
                                        </a>

                                        <div class="money">
                                          ${gemstoneItem?.total_sales_price}
                                        </div>
                                      </div>

                                      <div class="whishlist-footer">
                                        <Link
                                          to={`/engagement-rings/start-with-a-setting?stock_num=${gemstoneItem?.stock_num}`}
                                          class="transparent-btn"
                                        >
                                          Add to Ring
                                        </Link>
                                        <Link
                                          class="bg-btn"
                                          to="javascript:void(0)"
                                          onClick={() => {
                                            removeWishlistItem(
                                              item.id,
                                              gemstoneItem.id
                                            );
                                            handleCreateAccount(
                                              item?.ring_price
                                                ? item?.ring_price
                                                : "",
                                              item.ring?.id
                                                ? item.ring?.id
                                                : "",
                                              item.ring ? item.ring : "",
                                              item.ring.imgUrl
                                                ? item.ring.imgUrl
                                                : "",
                                              item.productColor
                                                ? item.productColor
                                                : "",
                                              item.stock_num
                                                ? item.stock_num
                                                : "",
                                              item.diamond_item
                                                ? item.diamond_item
                                                : "",
                                              item.total_sales_price
                                                ? item.total_sales_price
                                                : "",
                                              gemstoneItem.stock_num,
                                              gemstoneItem.total_sales_price,
                                              gemstoneItem,
                                              userId ? userId : null
                                            );
                                          }}
                                        >
                                          Add To Bag
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : null}
                        {/* ========all end */}

                        {/* ring and diamond  */}
                        {item.product_type === "ring_diamond" ||
                        item.product_type === "ring" ||
                        item.product_type === "ring_gemstone" ? (
                          <div
                            className={
                              activeWishList === ring ||
                              activeWishList === "ring_diamond" ||
                              activeWishList === "ring_gemstone"
                                ? "wishList-data active"
                                : "wishList-data"
                            }
                          >
                            <div class="wishlists-inner-row all-ring">
                              <div class="whishlist-colum">
                                <span>
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      removeWishlistItemWishlist(
                                        item.id,
                                        item?.ring_id
                                      )
                                    }
                                  >
                                    <VscChromeClose />
                                  </Link>
                                </span>
                                <div class="top-whish-list">
                                  <Link to="#">
                                    <img
                                      src={item.ring.default_image_url}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div class="caption">
                                  <a href="#" class="product-info">
                                    <div class="headline" data-item="CYO Rings">
                                      {item.ring.name}
                                    </div>
                                  </a>

                                  {item.diamond.length > 0
                                    ? item.diamond.map((diamond_item) => {
                                        return (
                                          <>
                                            <div class="money">
                                              {diamond_item.size} carat{" "}
                                              {diamond_item.shape}
                                            </div>
                                          </>
                                        );
                                      })
                                    : item.gemstone.map((gemstone_item) => {
                                        return (
                                          <>
                                            <div class="money">
                                              {gemstone_item.short_title}
                                            </div>
                                          </>
                                        );
                                      })}

                                  <div className="money">
                                    {item.diamond_price !== null ? (
                                      <>
                                        $
                                        {(
                                          parseFloat(item.ring_price || 0) +
                                          parseFloat(item.diamond_price || 0)
                                        ).toFixed(2)}
                                      </>
                                    ) : (
                                      // If diamond_price is null, display only ring_price
                                      <>
                                        $
                                        {(
                                          parseFloat(item.ring_price || 0) +
                                          parseFloat(item.gemstone_price || 0)
                                        ).toFixed(2)}
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="whishlist-footer">
                                  {/* <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="Select Size"
                                  /> */}
                                  {item.product_type === "ring" ? (
                                    <Link
                                      to={`/engagement-rings/start-with-a-diamond/?slug=${item.ring?.slug}&color=${item?.active_color}`}
                                      className="bg-btn"
                                    >
                                      Add a Diamond
                                    </Link>
                                  ) : item.product_type === "ring_diamond" ? (
                                    // Map over each diamond item and render a link
                                    item.diamond.map((diamond_item, index) => (
                                      <Link
                                        key={index} // Add a unique key for each link
                                        className="bg-btn"
                                        to="javascript:void(0)"
                                        onClick={() => {
                                          removeWishlistItem(item.id);
                                          handleCreateAccount(
                                            item?.ring_price,
                                            item.ring?.id,
                                            item.ring,
                                            item.img_sku,
                                            productColor,
                                            diamond_item.stock_num,
                                            diamond_item,
                                            diamond_item.total_sales_price,
                                            item.item?.stock_num
                                              ? item.item.stock_num
                                              : "",
                                            item.item?.total_sales_price
                                              ? item.item.total_sales_price
                                              : "",
                                            item.item?.gemstoneItem
                                              ? item.item.gemstoneItem
                                              : "",
                                            userId ? userId : null
                                          );
                                        }}
                                      >
                                        Add to Bag
                                      </Link>
                                    ))
                                  ) : (
                                    <Link
                                      to="#"
                                      className="bg-btn"
                                      onClick={() => {
                                        handleWishlistData(
                                          item,
                                          item.product_type
                                        );
                                      }}
                                    >
                                      Add to Bag
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {item.product_type === "diamond" ? (
                          <div
                            className={
                              activeWishList === diamond
                                ? "wishList-data active"
                                : "wishList-data"
                            }
                          >
                            <div class="wishlists-inner-row diamond">
                              {item.diamond?.map((diamondsItem) => {
                                return (
                                  <div class="whishlist-colum">
                                    <span>
                                      <Link
                                        to="#"
                                        onClick={() =>
                                          removeWishlistItemWishlist(
                                            item.id,
                                            diamondsItem.id
                                          )
                                        }
                                      >
                                        <VscChromeClose />
                                      </Link>
                                    </span>
                                    <div class="top-whish-list">
                                      <Link to="#">
                                        <img src={diamondsItem?.image_url} />
                                      </Link>
                                    </div>
                                    <div class="caption">
                                      <a href="#" class="product-info">
                                        <div class="money">
                                          {diamondsItem?.size} carat{" "}
                                          {diamondsItem?.shape}
                                        </div>
                                      </a>

                                      <div class="money">
                                        ${diamondsItem?.total_sales_price}
                                      </div>
                                    </div>
                                    {item?.diamond.map(
                                      (diamond_item, index) => (
                                        <div
                                          key={index}
                                          className="whishlist-footer"
                                        >
                                          <Link
                                            to={`/engagement-rings/start-with-a-setting?stock_num=${
                                              diamond_item?.stock_num || ""
                                            }`}
                                            className="transparent-btn"
                                          >
                                            Add to Ring
                                          </Link>
                                          <Link
                                            className="bg-btn"
                                            to="javascript:void(0)"
                                            onClick={() => {
                                              removeWishlistItem(item.id);
                                              handleCreateAccount(
                                                item?.ring_price || "",
                                                item.ring?.id || "",
                                                item.ring || "",
                                                item.ring?.imgUrl || "",
                                                item.productColor || "",
                                                diamond_item?.stock_num || "", // Ensure diamond_item is defined
                                                diamond_item || "", // Ensure diamond_item is defined
                                                diamond_item?.total_sales_price ||
                                                  "", // Ensure diamond_item is defined
                                                item.gemstoneItem?.stock_num ||
                                                  "", // Ensure gemstoneItem is defined
                                                item.gemstoneItem
                                                  ?.total_sales_price || "", // Ensure gemstoneItem is defined
                                                item.gemstoneItem || "", // Ensure gemstoneItem is defined
                                                userId || null
                                              );
                                            }}
                                          >
                                            Add To Bag
                                          </Link>
                                        </div>
                                      )
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                        {item.product_type === "gemstone" &&
                          item.gemstone?.map((gemstoneItem) => {
                            return (
                              <div
                                className={
                                  activeWishList === gemstone
                                    ? "wishList-data active"
                                    : "wishList-data"
                                }
                              >
                                <div class="wishlists-inner-row gemstone">
                                  <div class="whishlist-colum">
                                    <span>
                                      <Link
                                        to="#"
                                        onClick={() =>
                                          removeWishlistItemWishlist(
                                            item.id,
                                            gemstoneItem.id
                                          )
                                        }
                                      >
                                        <VscChromeClose />
                                      </Link>
                                    </span>
                                    <div class="top-whish-list">
                                      <Link to="#">
                                        <img src={gemstoneItem.image_url} />
                                      </Link>
                                    </div>
                                    <div class="caption">
                                      <a href="#" class="product-info">
                                        <div
                                          class="headline"
                                          data-item="CYO Rings"
                                        >
                                          {gemstoneItem.short_title}
                                        </div>
                                      </a>

                                      <div class="money">
                                        ${gemstoneItem?.total_sales_price}
                                      </div>
                                    </div>

                                    <div class="whishlist-footer">
                                      <Link
                                        to={`/engagement-rings/start-with-a-setting?stock_num=${gemstoneItem?.stock_num}`}
                                        class="transparent-btn"
                                      >
                                        Add to Ring
                                      </Link>
                                      <Link
                                        class="bg-btn"
                                        to="javascript:void(0)"
                                        onClick={() => {
                                          removeWishlistItem(
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
                                            item.stock_num
                                              ? item.stock_num
                                              : "",
                                            item.diamond_item
                                              ? item.diamond_item
                                              : "",
                                            item.total_sales_price
                                              ? item.total_sales_price
                                              : "",
                                            gemstoneItem.stock_num,
                                            gemstoneItem.total_sales_price,
                                            gemstoneItem,
                                            userId ? userId : null
                                          );
                                        }}
                                      >
                                        Add To Bag
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            {/* =========== */}
            <div className="wishlist-shopping">
              <div className="category-tiles">
                <h3>Continue Shopping</h3>
              </div>
              <div className="wishlist-shoping-inner">
                <div className="category-tiles-box">
                  <Link to="/engagement-rings/start-with-a-setting">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/diamond.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Engagement Rings</h4>
                    </div>
                  </Link>
                </div>
                <div className="category-tiles-box">
                  <Link to="/weading-band">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/ring.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Wedding Rings</h4>
                    </div>
                  </Link>
                </div>
                <div className="category-tiles-box">
                  <Link to="/engagement-rings/start-with-a-gemstone">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/rings.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Gemstone Rings</h4>
                    </div>
                  </Link>
                </div>
                <div className="category-tiles-box">
                  <Link to="/engagement-rings/start-with-a-setting?bridal-sets=true">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/chain.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Fine Jewelry</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="wishlist-main wishlist-data-base">
          <div className="container">
            <div className="breadcrums">
              <ul>
                <li>
                  <Link to="/">Home /</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wish List /</Link>
                </li>
              </ul>
            </div>
            <div className="wishlist-reset-content">
              <h2>Wish List</h2>
            </div>
            {wishlist.length < 1 && (
              <div className="wishlist-create">
                <div className="wishlist-reset-content">
                  <p>
                    Your wish list is empty. Sign in or Create an Account to
                    view your saved favorites across all your devices.
                  </p>
                </div>
                <div className="reset-forms wishlist-acct">
                  <form action="" className="form-inline">
                    <div className="input-group">
                      <label className="sr-only">Email address</label>
                      <input
                        type="text"
                        className="zip-code"
                        placeholder="your Email Address"
                        name="email"
                        id="whishlist-email"
                        onChange={(e) =>
                          validateEmail(
                            e.target.value,
                            "whishlist-email",
                            "Email Address"
                          )
                        }
                      />
                      <div className="error_1"></div>
                      <span className="input-group-btn">
                        <button
                          type="button"
                          className="view-menu"
                          onClick={validateWhishList}
                        ></button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* =========== */}
            <div className="wishlist_tab_engagementrings">
              {wishlist.length > 0 && (
                <div className="wish-list-tab">
                  <ul>
                    <li
                      className={
                        activeWishList === "all"
                          ? "wish-header active"
                          : "wish-header"
                      }
                      onClick={() => {
                        handleWishList("all");
                      }}
                    >
                      all
                    </li>

                    {wishlist
                      .reduce((acc, item) => {
                        if (
                          item.product_type &&
                          !acc.includes(item.product_type)
                        ) {
                          acc.push(item.product_type);
                        }
                        return acc;
                      }, [])
                      .map((productType, index) => (
                        <li
                          key={index}
                          className={
                            activeWishList === productType
                              ? "wish-header active"
                              : "wish-header"
                          }
                          onClick={() => {
                            handleWishList(productType);
                          }}
                        >
                          {productType === "gemstone"
                            ? "gemstone"
                            : productType === "diamond"
                            ? "diamond"
                            : productType === "ring"
                            ? "engagement ring"
                            : ""}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="wishlist_page-column">
                {wishlist?.map((item) => {
                  console.log(item);
                  return (
                    <>
                      <div
                        className={
                          activeWishList === all
                            ? "wishList-data active"
                            : "wishList-data"
                        }
                      >
                        {(item.product_type === "ring_diamond" ||
                          item.product_type === "ring" ||
                          item.product_type === "ring_gemstone") && (
                          <div class="wishlists-inner-row all-ring">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    item.product_type === "ring_diamond"
                                      ? handleDiamondRing(item)
                                      : item.product_type === "ring_gemstone"
                                      ? handleGemRing(item)
                                      : handleRing(item);
                                  }}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img
                                    src={
                                      item.item?.image
                                        ? item.item?.image
                                        : item.item?.default_image_url
                                    }
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.item?.name}
                                  </div>
                                </Link>
                                {item.product_type === "ring_diamond" ? (
                                  <div class="money">
                                    {item.diamond?.size} carat
                                    {item.diamond?.shape} Diamond
                                  </div>
                                ) : (
                                  <div class="money">
                                    {item.diamond?.short_title}
                                  </div>
                                )}

                                <div class="money">
                                  $
                                  {(
                                    parseFloat(
                                      item.item?.white_gold_price || 0
                                    ) +
                                    parseFloat(
                                      item.diamond?.total_sales_price || 0
                                    )
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                {/* <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={options}
                                  placeholder="Select Size"
                                /> */}
                                {item.product_type === "ring" ? (
                                  <Link
                                    to={`/engagement-rings/start-with-a-diamond/?slug=${item.item?.slug}&color=${item?.ring_color}`}
                                    class="bg-btn"
                                  >
                                    Add a Diamond
                                  </Link>
                                ) : item.product_type === "ring_diamond" ? (
                                  <Link
                                    to="#"
                                    class="bg-btn"
                                    onClick={() => {
                                      handleWishlistData(
                                        item,
                                        item.product_type
                                      );
                                    }}
                                  >
                                    Add to Bag
                                  </Link>
                                ) : (
                                  <Link
                                    to="#"
                                    class="bg-btn"
                                    onClick={() => {
                                      handleWishlistData(
                                        item,
                                        item.product_type
                                      );
                                    }}
                                  >
                                    Add to Bag
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {item.product_type === "diamond" && (
                          <div class="wishlists-inner-row diamond">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => handleDiamond(item)}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img src={item.diamonds?.image_url} alt="" />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.diamonds?.size} Carat{" "}
                                    {item.diamonds?.shape} Diamond
                                  </div>
                                </Link>

                                <div class="money">
                                  {" "}
                                  ${item.diamonds?.total_sales_price}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                <Link
                                  class="transparent-btn"
                                  to={`/engagement-rings/start-with-a-setting?stock_num=${item.diamonds?.stock_num}`}
                                >
                                  Add to Ring
                                </Link>
                                <Link
                                  to="#"
                                  class="bg-btn"
                                  onClick={() =>
                                    handleWishlistDataDiamond(item)
                                  }
                                >
                                  Add to Bag
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.product_type === "gemstone" && (
                          <div class="wishlists-inner-row gemstone">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => handleGemstone(item)}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img src={item.item?.image_url} alt="" />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.item?.short_title}
                                  </div>
                                </Link>

                                <div class="money">
                                  ${item.item?.total_sales_price}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                <Link
                                  to={`/engagement-rings/start-with-a-setting?stock_num=${item.item?.stock_num}`}
                                  class="transparent-btn"
                                >
                                  Add to Ring
                                </Link>
                                <Link
                                  to="#"
                                  class="bg-btn"
                                  onClick={() => {
                                    handleWishlistDataGemstones(item);
                                  }}
                                >
                                  Add to Bag
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {(item.product_type === "ring_diamond" ||
                        item.product_type === "ring" ||
                        item.product_type === "ring_gemstone") && (
                        <div
                          className={
                            activeWishList === ring
                              ? "wishList-data active"
                              : "wishList-data"
                          }
                        >
                          <div class="wishlists-inner-row all-ring">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    item.product_type === "ring_diamond"
                                      ? handleDiamondRing(item)
                                      : item.product_type === "ring_gemstone"
                                      ? handleGemRing(item)
                                      : handleRing(item);
                                  }}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img
                                    src={
                                      item.item?.image
                                        ? item.item?.image
                                        : item.item?.default_image_url
                                    }
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.item?.name}
                                  </div>
                                </Link>
                                {item.product_type === "ring_diamond" ? (
                                  <div class="money">
                                    {item.diamond?.size} carat
                                    {item.diamond?.shape} Diamond
                                  </div>
                                ) : (
                                  <div class="money">
                                    {item.diamond?.short_title}
                                  </div>
                                )}

                                <div class="money">
                                  $
                                  {(
                                    parseFloat(
                                      item.item?.white_gold_price || 0
                                    ) +
                                    parseFloat(
                                      item.diamond?.total_sales_price || 0
                                    )
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                {/* <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={options}
                                  placeholder="Select Size"
                                /> */}
                                {item.product_type === "ring" ? (
                                  <Link
                                    to={`/engagement-rings/start-with-a-diamond/?slug=${item.item?.slug}&color=${item?.ring_color}`}
                                    class="bg-btn"
                                  >
                                    Add a Diamond
                                  </Link>
                                ) : item.product_type === "ring_diamond" ? (
                                  <Link
                                    to="#"
                                    class="bg-btn"
                                    onClick={() => {
                                      handleWishlistData(
                                        item,
                                        item.product_type
                                      );
                                    }}
                                  >
                                    Add to Bag
                                  </Link>
                                ) : (
                                  <Link
                                    to="#"
                                    class="bg-btn"
                                    onClick={() => {
                                      handleWishlistDataGemstones(
                                        item,
                                        item.product_type
                                      );
                                    }}
                                  >
                                    Add to Bag
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {item.product_type === "diamond" && (
                        <div
                          className={
                            activeWishList === diamond
                              ? "wishList-data active"
                              : "wishList-data"
                          }
                        >
                          <div class="wishlists-inner-row diamond">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => handleDiamond(item)}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img src={item.diamonds?.image_url} alt="" />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.diamonds?.size} Carat{" "}
                                    {item.diamonds?.shape} Diamond
                                  </div>
                                </Link>

                                <div class="money">
                                  {" "}
                                  ${item.diamonds?.total_sales_price}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                <Link
                                  class="transparent-btn"
                                  to={`/engagement-rings/start-with-a-setting?stock_num=${item.diamonds?.stock_num}`}
                                >
                                  Add to Ring
                                </Link>
                                <Link
                                  to="#"
                                  class="bg-btn"
                                  onClick={() =>
                                    handleWishlistDataDiamond(item)
                                  }
                                >
                                  Add to Bag
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.product_type === "gemstone" && (
                        <div
                          className={
                            activeWishList === gemstone
                              ? "wishList-data active"
                              : "wishList-data"
                          }
                        >
                          <div class="wishlists-inner-row gemstone">
                            <div class="whishlist-colum">
                              <span>
                                <Link
                                  to="#"
                                  onClick={() => handleGemstone(item)}
                                >
                                  <VscChromeClose />
                                </Link>
                              </span>
                              <div class="top-whish-list">
                                <Link to="#">
                                  <img src={item.item?.image_url} alt="" />
                                </Link>
                              </div>
                              <div class="caption">
                                <Link to="#" class="product-info">
                                  <div class="headline" data-item="CYO Rings">
                                    {item.item?.short_title}
                                  </div>
                                </Link>

                                <div class="money">
                                  ${item.item?.total_sales_price}
                                </div>
                              </div>
                              <div class="whishlist-footer">
                                <Link
                                  to={`/engagement-rings/start-with-a-setting?stock_num=${item.item?.stock_num}`}
                                  class="transparent-btn"
                                >
                                  Add to Ring
                                </Link>
                                <Link
                                  to="#"
                                  class="bg-btn"
                                  onClick={() => {
                                    handleWishlistDataGemstones(item);
                                  }}
                                >
                                  Add to Bag
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>

            {/* =========== */}
            <div className="wishlist-shopping">
              <div className="category-tiles">
                <h3>Continue Shopping</h3>
              </div>
              <div className="wishlist-shoping-inner">
                <div className="category-tiles-box">
                  <Link to="/engagement-rings/start-with-a-setting">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/diamond.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Engagement Rings</h4>
                    </div>
                  </Link>
                </div>
                <div className="category-tiles-box">
                  <Link to="/weading-band">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/ring.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Wedding Rings</h4>
                    </div>
                  </Link>
                </div>
                <div className="category-tiles-box">
                  <Link to="/engagement-rings/start-with-a-gemstone">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/rings.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Gemstone Rings</h4>
                    </div>
                  </Link>
                </div>
                <Link to="/engagement-rings/start-with-a-setting?bridal-sets=true">
                  <div className="category-tiles-box">
                    <div className="wisher-imager">
                      <img
                        src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/chain.jpg"
                        alt=""
                      />
                    </div>
                    <div className="category-title">
                      <h4>Fine Jewelry</h4>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
