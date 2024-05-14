// import React, { useContext, useEffect, useState } from "react";
// import { IoIosClose, IoIosStar, IoMdHeart } from "react-icons/io";
// import { RiTruckFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { IoCallOutline, IoPricetagOutline } from "react-icons/io5";
// import { CiGift, CiHeart } from "react-icons/ci";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { HiInformationCircle } from "react-icons/hi2";
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToWishList,
//   removeToCart,
//   removeToWishlist,
//   setCartDetails,
//   setWishlistDetails,
// } from "../../redux/action";
// import { v4 as uuidv4 } from "uuid";
// import { FaExclamationCircle } from "react-icons/fa";
// import { UserContext } from "../../App";
// import { GiBigDiamondRing } from "react-icons/gi";
// import LoaderSpinner from "../LoaderSpinner";

// export const DatabaseCartPage = () => {
//   const dispatch = useDispatch();
//   const white = "18K WHITE GOLD";
//   const yellow = "18K YELLOW GOLD";
//   const rose = "18K ROSE GOLD";
//   const platinum = "Platinum";
//   const [down, setDown] = useState(false);
//   const [againDown, setAgainDown] = useState(false);
//   const [message, setMessage] = useState("");
//   const [showMessage, setShowMessage] = useState(false);
//   const [showTax, setShowTax] = useState(false);
//   const [tax, setTax] = useState("TBD");
//   const [count, setCount] = useState(1);
//   const [shapeData, setShapeData] = useState([]);
//   const [removeCart, setRemoveCart] = useState();
//   const [metalColor, setMetalColor] = useState([]);
//     // loader
//     const [loader, setLoader] = useState(true);

//   const cartData = useSelector((state) => state.cartData);
//   const cartDetails = useSelector(state=> state.cartReducer)
//   const wishListDataBase = useSelector(state=> state.wishlistReducer)

//   const { removeWishList, setRemoveWishList } = useContext(UserContext);
//   console.log(cartDetails);
//   const handleChange = (event) => setMessage(event.target.value);
//   // const cartData = useSelector((state) => state.cartData);
//   // console.log(cartData);
//   const handleSaveMessage = () => {
//     if (message.trim() !== "") {
//       setShowMessage(true);
//       setDown(false);
//     } else {
//       setDown(false);
//     }
//   };

//   const handleEditMessage = () => {
//     setDown(true);
//     setShowMessage(false);
//   };

//   const handleDeleteMessage = () => {
//     setMessage("");
//     setShowMessage(false);
//   };

//   function handleIncrement() {
//     if (count > 1) {
//       setCount(count - 1);
//     } else {
//       return 1;
//     }
//   }
//   // =======remove to card
//   useEffect(() => {
//     axios
//       .get(
//         `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove-cartitem/${removeWishList}`
//       )
//       .then((res) => {
//         console.log("=====", res.data);
//       })
//       .catch((error) => {
//         console.log("CSRF Token API Error:", error);
//       });
//   }, [removeWishList]);
//   // ==================
//   // =======================
//   const userId = localStorage.getItem("formData");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (userId) {
//           const response = await axios.get(
//             `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/getcart-items?user_id=${userId}`,

//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "X-CSRF-TOKEN": shapeData,
//               },
//             }
//           );

//           if (response.status === 200) {
//             console.log("=================get card item details", response.data);
//             dispatch(setCartDetails(response.data))
//           } else {
//             console.error("Error Status:", response.status);
//           }
//         } else {
//           console.log(null);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, [setCartDetails]);

//   // ========================end
//   useEffect(() => {
//     axios
//       .get(
//         "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
//       )
//       .then((res) => {
//         setShapeData(res.data.csrf_token);
//       })
//       .catch((error) => {
//         console.log("CSRF Token API Error:", error);
//       });
//   }, []);
//   // =============
//   // =============
//   useEffect(() => {
//     axios
//       .get(
//         "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/metalcolor"
//       )
//       .then((res) => {
//         setMetalColor(res.data.data);
//       })
//       .catch(() => {
//         console.log("API error");
//       });
//   }, []);
//   const calculateTotalPrice = () => {
//     let total = 0;
//     cartDetails.forEach((item) => {
//       total +=
//         parseFloat(item?.ring_price || 0) +
//         parseFloat(item?.diamond_price || 0) +
//         parseFloat(item.gemstone_price || 0);
//     });
//     return total;
//   };
//   // const calculateTotalPrice = () => {
//   //   let total = 0;
//   //   cartDetails.forEach((item) => {
//   //     total += parseFloat(item?.ring_price) + parseFloat(item?.diamond_price) + parseFloat(item?.gemstone_price);
//   //   });
//   //   return total;
//   // };
//   let isDuplicate;
//   let hasDuplicates;

//   const wishlist = useSelector((state) => state.wishlistData);
//   const [toggledProducts, setToggledProducts] = useState([]);

//   const handleWishlist = async (
//     product_type,    
//     user_id,
//     gemstone_id,
//     gemstone_price ,
//     ring_id,
//     ring_color,
//     img_sku,
//     ring_price,
//     diamond_id,
//     diamond_price
//   ) => {
//     try {          

//       // Construct URL for API call
//       const apiUrl = `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=${user_id}&gemstone_price=${gemstone_price}&gemstone_id=${gemstone_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${img_sku}&ring_price=${ring_price}&diamond_id=${diamond_id}&diamond_price=${diamond_price}`;
//       // Make API call
//       console.log(apiUrl);
//       const response = await axios.get(apiUrl, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-TOKEN": shapeData,
//         },
//       });

//       if (response.status === 200) {
//         console.log("Wishlist item added successfully:", response.data.res);
//         loader && <LoaderSpinner />
//       } else {
//         console.error(
//           "Error adding item to wishlist. Status:",
//           response.status
//         );
//         loader && <LoaderSpinner />
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       loader && <LoaderSpinner />
//     }
//   };

//   const handleRemoveItem = (itemId) => {
//     const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
//     // setCartDetails(updatedItems);
//     dispatch(setCartDetails(updatedItems))
//     setRemoveWishList(itemId);
//   };
//   const handleRemoveItemCart = (itemId) => {
//     const updatedItems = cartDetails.filter((item) => item?.id !== itemId);
//     console.warn(updatedItems);
//     dispatch(setCartDetails(updatedItems))
//     const removedItem = cartDetails.find((item) => item?.id === itemId);

//     // If the removed item exists, add it to the wishlist
//     if (removedItem) {        
//         dispatch(setWishlistDetails([...wishListDataBase, removedItem]));       
//         setRemoveWishList(itemId);
//     }
//   };



//   useEffect(() => {
//     // Simulate loading delay
//     const timeout = setTimeout(() => {
//       setLoader(false);
//     }, 2000);

//     // Cleanup timeout
//     return () => clearTimeout(timeout);
//   }, []);

  
//   return (
//     <>
//       <div className="shoping-car-page data-base-cart">
//         <div className="container">
//           <div className="shop-bag">
//             <h1>shopping bag</h1>
//             <p className="mb-20 mb-xs-30">
//               <Link to="/login" className="td-u">
//                 Sign in
//               </Link>{" "}
//               or{" "}
//               <Link to="/login" className="td-u">
//                 create an account
//               </Link>{" "}
//               to save the items in your bag or track your order.
//             </p>
//           </div>

//           <div className="shoping-card-main-wrap">
//             <div className="shoping-card">
//               {loader ? (
//                 <LoaderSpinner />
//               ) : (
//                 cartDetails?.map((item, index) => {
//                   console.log(item);
//                   const selectedMetalColor = metalColor.find(
//                     (colorItem) => colorItem.value === item?.active_color
//                   );
//                   // show error if the same diamond is selected
//                   isDuplicate = cartDetails?.some((cartItem, i) => {
//                     if (i !== index) {
//                       const cartItemIds = cartItem.diamond.map(
//                         (diamond) => diamond?.id
//                       );
//                       const itemIds = item.diamond.map(
//                         (diamond) => diamond?.id
//                       );
//                       return (
//                         cartItemIds.every((id) => itemIds.includes(id)) &&
//                         cartItemIds.length === itemIds.length
//                       );
//                     }
//                     return false;
//                   });
//                   //Hide checkout if duplicate diamonds is present
//                   item.diamond.length > 0 &&
//                     (hasDuplicates = cartDetails?.some((cartItem, i) => {
//                       if (i !== index) {
//                         const itemIds = item.diamond.map((items) => items.id);
//                         const cartItemIds = cartItem.diamond.map(
//                           (cart) => cart.id
//                         );
//                         return itemIds.every((id) => cartItemIds.includes(id));
//                       }
//                       return false;
//                     }));

//                   console.log(hasDuplicates);
//                   return (
//                     <>
//                       {/* ===========only gemstone */}
//                       {item.gemstone_id &&
//                       item.ring?.id == null &&
//                       item?.diamond_id == null ? (
//                         <div className="shop-card-inner gemstone">
//                           <div className="product-info gemstone-only">
//                             {item.gemstone?.map((gemstoneItem) => {
//                               return (
//                                 <>
//                                   <div className="gemstone-cart">
//                                     <div className="gemstone-img-text">
//                                       <img
//                                         src={gemstoneItem?.image_url}
//                                         alt=""
//                                       />
//                                       <div className="remove-option">
//                                       <Link
//                                           to="javascript:void(0)"
                                         

//                                           onClick={() =>{
//                                             handleRemoveItemCart(item.id)
                                          
//                                             handleWishlist(
//                                               "gemstone",
//                                               userId,
//                                               gemstoneItem?.stock_num,
//                                               gemstoneItem?.total_sales_price,

//                                               item.item?.ring.id? item.item?.ring.id:"",
//                                               item.item?.active_color? item.item?.active_color : "",
//                                               item.item?.img_sku ?item.item?.img_sku:"",
//                                               item.item?.ring_price?item.item?.ring_price:"",
//                                               item.diamondItem?.stock_num?item.diamondItem?.stock_num:"",
//                                               item.diamondItem?.total_sales_price?item.diamondItem?.total_sales_price:""
//                                             )
//                                           }
//                                           }
//                                         >
//                                           <span className="txt-mtw">
//                                             <CiHeart />
//                                             Move to Wish List
//                                           </span>
//                                         </Link>
//                                         <br />
//                                         <Link
//                                           to="javascript:void(0);"
//                                           onClick={() =>
//                                             handleRemoveItem(item?.id)
//                                           }
//                                         >
//                                           <IoIosClose />
//                                           Remove
//                                         </Link>
//                                       </div>
//                                     </div>

//                                     <div className="gemstone-name">
//                                       <p>{gemstoneItem.short_title}</p>
//                                       <p className="small-text">
//                                         <span>
//                                           <GiBigDiamondRing />
//                                         </span>
//                                         Add this gem to
//                                         <Link
//                                           to={`/engagement-rings/start-with-a-setting?stock_num=${gemstoneItem?.stock_num}`}
//                                         >
//                                           ring
//                                         </Link>
//                                       </p>
//                                     </div>
//                                     <div className="gemstone-price">
//                                       <p>${item.gemstone_price}</p>
//                                     </div>
//                                   </div>
//                                   {/* {isDuplicate && (
//                                     <div className="available-list">
//                                       <p className="exclamation-symbol-red">
//                                         <span>
//                                           <FaExclamationCircle />
//                                         </span>
//                                         This unique diamond exists in multiple
//                                         places in your Shopping Cart. Please
//                                         remove one of the items or{" "}
//                                         <Link to="/engagement-rings/start-with-a-diamond">
//                                           choose a new diamond
//                                         </Link>{" "}
//                                         before submitting your order.
//                                       </p>
//                                     </div>
//                                   )} */}
//                                 </>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ) : null}

//                       {/* ===========only gemstone end*/}

//                       {/* ========== ring + diamond*/}
//                       {item.ring?.id &&
//                       item?.diamond_id &&
//                       !item?.gemstone_id ? (
//                         <div className="shop-card-inner diamond-ring">
//                           <div className="product-pic ring-only">
//                             <div className="diamond-ring-img-text">
//                               <Link to="#">
//                                 <ul className="product-list">
//                                   <li
//                                     className={
//                                       item.active_color === white
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === yellow
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === rose
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === platinum
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                 </ul>
//                               </Link>
//                             </div>
//                             <div className="product-info-inner">
//                               <div className="product-info-left">
//                                 <h2>
//                                   <Link
//                                     to={`/detail-ring-product?slug=${item.ring?.slug}&color=${item?.active_color}`}
//                                     className="td-n2"
//                                   >
//                                     {selectedMetalColor?.value}{" "}
//                                     {item.ring?.name} (1/2{" "}
//                                     <span
//                                       style={{ textTransform: "lowercase" }}
//                                     >
//                                       ct. tw.
//                                     </span>
//                                     )
//                                   </Link>
//                                 </h2>

//                                 <div className="ir245-muted">
//                                   <div className="code">BE3D20-18KY</div>
//                                   {/* <div className="code">
//                                   Qty:
//                                   <span
//                                     className="qty"
//                                     style={{ color: "#807a7a" }}
//                                   >
//                                     <span onClick={() => setCount(count + 1)}>
//                                       <FaPlus />
//                                     </span>
//                                     <span>{count}</span>
//                                     <span onClick={() => handleIncrement()}>
//                                       <FaMinus />
//                                     </span>
//                                   </span>
//                                   <input
//                                     name="cartitem_id"
//                                     type="hidden"
//                                     value="17566554"
//                                   />
//                                   <span
//                                     className="iconfont iconfont-plus"
//                                     onclick="increase_numbers(this);"
//                                   ></span>
//                                 </div> */}
//                                 </div>
//                               </div>

//                               <div className="select-custom-size">
//                                 <select>
//                                   <option>Select Ring Size </option>
//                                   <option>1</option>
//                                   <option>2</option>
//                                   <option>3</option>
//                                   <option>4</option>
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="product-ring-price">
//                               <span
//                                 style={{ whiteSpace: "nowrap" }}
//                                 id="prodcut_price_17566554"
//                               >
//                                 ${item?.ring_price}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="product-info diamond-only">
//                             {item.diamond?.slice(0, 1).map((diamondItem) => {
//                               console.log(diamondItem);
//                               return (
//                                 <>
//                                   <div className="checkout-name-description">
//                                     <div className="diamond-text-img">
//                                       <img
//                                         src={diamondItem?.image_url}
//                                         alt=""
//                                       />

//                                       <div className="remove-option">
//                                       <Link
//                                          to="javascript:void(0)"
//                                           onClick={() =>{
//                                             handleRemoveItemCart(item.id)
                                          
//                                             handleWishlist(
//                                               "ring_diamond",
//                                               userId,
//                                               item.gemstoneItem?.stock_num ?  item.gemstoneItem?.stock_num : "",
//                                               item.gemstoneItem?.total_sales_price? item.gemstoneItem?.total_sales_price : "",

//                                               item?.ring.id,
//                                               item?.active_color,
//                                               item?.img_sku,
//                                               item?.ring_price,
//                                               diamondItem?.stock_num,
//                                               diamondItem?.total_sales_price
//                                             )
//                                           }
//                                           }
//                                         >
//                                           <span className="txt-mtw">
//                                             <CiHeart />
//                                             Move to Wish List
//                                           </span>
//                                         </Link>
//                                         <br />
//                                         <Link
//                                           to="javascript:void(0);"
//                                           onClick={() =>
//                                             handleRemoveItem(item.id)
//                                           }
//                                         >
//                                           <IoIosClose />
//                                           Remove
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="checkout-left-des diamond-name">
//                                       <p>
//                                         <Link to="#">
//                                           {diamondItem?.size} Carat{" "}
//                                           {diamondItem?.shape} Diamond
//                                         </Link>
//                                       </p>
//                                       <p className="small-text">
//                                         {diamondItem?.cut} Cut,{" "}
//                                         {diamondItem?.color} Color,{" "}
//                                         {diamondItem?.clarity} Clarity
//                                       </p>
//                                       <p className="small-text">5587475AB</p>
//                                       <div className="available-list">
//                                         <p>
//                                           <span>
//                                             <IoIosStar />
//                                           </span>
//                                           Only {diamondItem?.available}{" "}
//                                           Available
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <div className="checkout-right-price diamond-price">
//                                       <p>${diamondItem?.total_sales_price}</p>
//                                     </div>
//                                   </div>

//                                   {item.diamond && isDuplicate && (
//                                     <div className="available-list">
//                                       <p className="exclamation-symbol-red">
//                                         <span>
//                                           <FaExclamationCircle />
//                                         </span>
//                                         This unique diamond exists in multiple
//                                         places in your Shopping Cart. Please
//                                         remove one of the items or{" "}
//                                         <Link to="/engagement-rings/start-with-a-diamond">
//                                           choose a new diamond
//                                         </Link>{" "}
//                                         before submitting your order.
//                                       </p>
//                                     </div>
//                                   )}
//                                 </>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ) : null}
//                       {/* ============ */}

//                       {/* ===========only diamond */}
//                       {item.diamond_id &&
//                       item.ring?.id == null &&
//                       item?.gemstone_id == null ? (
//                         <div className="shop-card-inner diamond-ring">
//                           <div className="product-info diamond-only">
//                             {item.diamond?.map((diamondItem) => {
//                               return (
//                                 <>
//                                   <div className="checkout-name-description">
//                                     <div className="diamond-text-img">
//                                       <img
//                                         src={diamondItem?.image_url}
//                                         alt=""
//                                       />

//                                       <div className="remove-option">
//                                       <Link
//                                           to="javascript:void(0)"
                                          
//                                           onClick={() =>{
//                                           handleRemoveItemCart(item.id)
                                            
                                          
//                                             handleWishlist(
//                                               "diamond",
//                                               userId,
//                                               item.gemstoneItem?.stock_num ?  item.gemstoneItem?.stock_num : "",
//                                               item.gemstoneItem?.total_sales_price? item.gemstoneItem?.total_sales_price : "",

//                                               item.item?.ring.id ? item.item?.ring.id : "",
//                                               item.item?.active_color ? item.item?.ring.id : "",
//                                               item.item?.img_sku ? item.item?.ring.id : "",
//                                               item.item?.ring_price ? item.item?.ring_price : "",

//                                               diamondItem?.stock_num,
//                                               diamondItem?.total_sales_price
//                                             )
//                                           }
//                                           }
//                                         >
//                                           <span className="txt-mtw">
//                                             <CiHeart />
//                                             Move to Wish List
//                                           </span>
//                                         </Link>
//                                         <br />
//                                         <Link
//                                           to="javascript:void(0);"
//                                           onClick={() =>
//                                             handleRemoveItem(item.id)
//                                           }
//                                         >
//                                           <IoIosClose />
//                                           Remove
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="checkout-left-des diamond-name">
//                                       <p>
//                                         <Link to="#">
//                                           {diamondItem?.size} Carat{" "}
//                                           {diamondItem?.shape} Diamond
//                                         </Link>
//                                       </p>
//                                       <p className="small-text">
//                                         {diamondItem?.cut} Cut,{" "}
//                                         {diamondItem?.color} Color,{" "}
//                                         {diamondItem?.clarity} Clarity
//                                       </p>
//                                       <p className="small-text">5587475AB</p>
//                                       <div className="available-list">
//                                         <p>
//                                           <span>
//                                             <IoIosStar />
//                                           </span>
//                                           Only {diamondItem?.available}{" "}
//                                           Available
//                                         </p>
//                                         <p>
//                                           <span>
//                                             <GiBigDiamondRing />
//                                           </span>
//                                           Add this diamond to{" "}
//                                           <Link
//                                             to={`/engagement-rings/start-with-a-setting?stock_num=${diamondItem?.stock_num}`}
//                                           >
//                                             {" "}
//                                             ring
//                                           </Link>
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <div className="checkout-right-price diamond-price">
//                                       <p>${diamondItem?.total_sales_price}</p>
//                                     </div>
//                                   </div>

//                                   {/* {isDuplicate && (
//                                     <div className="available-list">
//                                       <p className="exclamation-symbol-red">
//                                         <span>
//                                           <FaExclamationCircle />
//                                         </span>
//                                         This unique diamond exists in multiple
//                                         places in your Shopping Cart. Please
//                                         remove one of the items or{" "}
//                                         <Link to="/engagement-rings/start-with-a-diamond">
//                                           choose a new diamond
//                                         </Link>{" "}
//                                         before submitting your order.
//                                       </p>
//                                     </div>
//                                   )} */}
//                                 </>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ) : null}

//                       {/* ===========only diamond end*/}

//                       {/* ============= ring + gemstone*/}
//                       {item.ring?.id && item?.gemstone_id ? (
//                         <div className="shop-card-inner gemstone">
//                           <div className="product-pic ring-only">
//                             <div className="diamond-ring-img-text">
//                               <Link to="#">
//                                 <ul className="product-list">
//                                   <li
//                                     className={
//                                       item.active_color === white
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === yellow
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === rose
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                   <li
//                                     className={
//                                       item.active_color === platinum
//                                         ? "active"
//                                         : "displayed"
//                                     }
//                                   >
//                                     <img
//                                       src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${item?.img_sku}/${item?.img_sku}.jpg`}
//                                       alt="Gold Ring"
//                                       className="img-responsive center-block"
//                                     />
//                                   </li>
//                                 </ul>
//                               </Link>
//                             </div>
//                             <div className="product-info-inner">
//                               <div className="product-info-left">
//                                 <h2>
//                                   <Link to="#" className="td-n2">
//                                     {/* {selectedMetalColor.value}{" "} */}
//                                     {item.ring?.name} (1/2{" "}
//                                     <span
//                                       style={{ textTransform: "lowercase" }}
//                                     >
//                                       ct. tw.
//                                     </span>
//                                     )
//                                   </Link>
//                                 </h2>
//                                 <div className="ir245-muted">
//                                   <div className="code">BE3D20-18KY</div>
//                                   {/* <div className="code">
//                                   Qty:
//                                   <span
//                                     className="qty"
//                                     style={{ color: "#807a7a" }}
//                                   >
//                                     <span onClick={() => setCount(count + 1)}>
//                                       <FaPlus />
//                                     </span>
//                                     <span>{count}</span>
//                                     <span onClick={() => handleIncrement()}>
//                                       <FaMinus />
//                                     </span>
//                                   </span>
//                                   <input
//                                     name="cartitem_id"
//                                     type="hidden"
//                                     value="17566554"
//                                   />
//                                   <span
//                                     className="iconfont iconfont-plus"
//                                     onclick="increase_numbers(this);"
//                                   ></span>
//                                 </div> */}
//                                 </div>
//                               </div>

//                               <div className="select-custom-size">
//                                 <select>
//                                   <option>Select Ring Size </option>
//                                   <option>1</option>
//                                   <option>2</option>
//                                   <option>3</option>
//                                   <option>4</option>
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="product-ring-price">
//                               <span
//                                 style={{ whiteSpace: "nowrap" }}
//                                 id="prodcut_price_17566554"
//                               >
//                                 ${item?.ring_price}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="product-info gemstone-only">
//                             {item.gemstone?.map((gemstoneItem) => {
//                               return (
//                                 <>
//                                   <div className="gemstone-cart">
//                                     <div className="gemstone-img-text">
//                                       <img
//                                         src={gemstoneItem?.image_url}
//                                         alt=""
//                                       />
//                                       <div className="remove-option">
//                                       <Link
//                                            to="javascript:void(0)"
                                          
//                                           onClick={() =>{
//                                             handleRemoveItemCart(item.id)                                          
//                                             handleWishlist(
//                                               "ring_gemstone",
//                                               userId,
//                                               gemstoneItem?.stock_num,
//                                               gemstoneItem?.total_sales_price,

//                                               item?.ring.id,
//                                               item?.active_color,
//                                               item?.img_sku,
//                                               item?.ring_price,

//                                               item.diamondItem?.stock_num? item.diamondItem?.stock_num:"",
//                                               item.diamondItem?.total_sales_price?item.diamondItem?.total_sales_price:""
//                                             )
//                                           }
//                                           }
//                                         >
//                                           <span className="txt-mtw">
//                                             <CiHeart />
//                                             Move to Wish List
//                                           </span>
//                                         </Link>
//                                         <br />
//                                         <Link
//                                           to="javascript:void(0);"
//                                           onClick={() =>
//                                             handleRemoveItem(item.id)
//                                           }
//                                         >
//                                           <IoIosClose />
//                                           Remove
//                                         </Link>
//                                       </div>
//                                     </div>

//                                     <div className="gemstone-name">
//                                       <p>${gemstoneItem.short_title}</p>
//                                     </div>
//                                     <div className="gemstone-price">
//                                       <p>${item.gemstone_price}</p>
//                                     </div>
//                                   </div>
//                                   {/* {isDuplicate && (
//                                     <div className="available-list">
//                                       <p className="exclamation-symbol-red">
//                                         <span>
//                                           <FaExclamationCircle />
//                                         </span>
//                                         This unique diamond exists in multiple
//                                         places in your Shopping Cart. Please
//                                         remove one of the items or{" "}
//                                         <Link to="/engagement-rings/start-with-a-diamond">
//                                           choose a new diamond
//                                         </Link>{" "}
//                                         before submitting your order.
//                                       </p>
//                                     </div>
//                                   )} */}
//                                 </>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ) : null}

//                       {/* =================== */}
//                     </>
//                   );
//                 })
//               )}
//               <div className="home-banner-promo__box">
//                 <div className="home-banner-promo__img">
//                   <img
//                     src="/images/Diamonds.jpg"
//                     alt="Lab Diamond Studs"
//                     className="img-responsive"
//                   />
//                 </div>
//                 <div className="home-banner-promo__body middle">
//                   <div>
//                     <div className="home-banner-promo__header">ENDS SOON!</div>
//                     <div className="home-banner-promo__subheader">
//                       <span>Lab Diamond Studs </span>with purchase over $1,000.
//                       <br />
//                       <span>Surprise Earrings </span>with all other purchases.
//                     </div>
//                   </div>
//                 </div>
//                 <Link to="#" className="see-details-link">
//                   <u>See Terms</u>
//                 </Link>
//               </div>
//             </div>

//             <div className="card-right-side">
//               <p className="text-center mt-xs-20 ass">
//                 Need Assistance? <Link to="#">Chat now</Link> or
//                 call800.691.0952
//               </p>
//               <div className="order-box">
//                 <h3>order summary</h3>
//                 {cartDetails?.slice(0, 1).map((item) => {
//                   return (
//                     <>
//                       <div className="table-count">
//                         <div className="row">
//                           <div className="subtotal">Subtotal</div>
//                           <div className="price-right">
//                             ${calculateTotalPrice().toFixed(2)}
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="subtotal">FedEx Shipping</div>
//                           <div className="price-right">Free</div>
//                         </div>
//                         <div className="row">
//                           <div className="subtotal">
//                             <Link onClick={() => setShowTax(!showTax)}>
//                               Sales Tax Estimate
//                               <HiInformationCircle />
//                             </Link>
//                           </div>
//                           <div className="price-right">{tax}</div>
//                           {showTax && (
//                             <div className="estimated-taxess">
//                               <form>
//                                 <div className="estimates-tax-main">
//                                   <div className="estimate-tax-left">
//                                     <select>
//                                       <option value="United States">
//                                         United States
//                                       </option>
//                                       <option value="Puerto Rico">
//                                         Puerto Rico
//                                       </option>
//                                       <option value="Virgin Islands (U.S.)">
//                                         Virgin Islands (U.S.)
//                                       </option>
//                                       <option value="Canada">Canada</option>
//                                       <option value="Australia">
//                                         Australia
//                                       </option>
//                                       <option value="Other">Other</option>
//                                     </select>
//                                   </div>
//                                   <div className="estimate-tax-right">
//                                     <input
//                                       type="text"
//                                       className="ship_sub"
//                                       placeholder="zip code"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="texs-estimated">
//                                   <Link
//                                     to="#"
//                                     onClick={() =>
//                                       setShowTax(false) || setTax("$0.00")
//                                     }
//                                   >
//                                     estimate tax
//                                   </Link>
//                                 </div>
//                               </form>
//                             </div>
//                           )}
//                         </div>

//                         <div className="row total">
//                           <div className="subtotal">
//                             <b>Total</b>
//                           </div>
//                           <div className="price-right">
//                             <b>${calculateTotalPrice().toFixed(2)}</b>
//                           </div>
//                         </div>
//                         {item.diamond && !hasDuplicates ? (
//                           <div className="button-card">
//                             <Link className="check-btn" to="/check_out">
//                               checkout
//                             </Link>
//                             <span>Or</span>
//                             <Link className="pay-btn" to="#">
//                               <img
//                                 src="https://css.brilliantearth.com/static/img/icon/paypal.png"
//                                 alt=""
//                               />
//                             </Link>
//                           </div>
//                         ) : (
//                           null
//                         )}
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>

//               <div className="shipping-info">
//                 <h4>shipping info</h4>

//                 <div className="ship-card">
//                   <div className="ship-icon">
//                     <RiTruckFill />
//                   </div>

//                   <div className="ship-content">
//                     <p>
//                       Estimated ship date if ordered by 9 PM PT today:{" "}
//                       <b>Wednesday, February 14th</b>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="ship-card">
//                   <div className="ship-icon">
//                     <IoCallOutline />
//                   </div>

//                   <div className="ship-content">
//                     <p>
//                       <Link to="/contact">Contact us</Link> to schedule Saturday
//                       delivery, hold at a FedEx location, or to inquire about
//                       available delivery options.{" "}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="add-form-gift">
//                 <div className="add-per-info" onClick={() => setDown(!down)}>
//                   <CiGift />
//                   <h3>Add a Personalized Gift Message</h3>
//                   {down ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
//                 </div>

//                 {down && (
//                   <div className="add-form">
//                     <form>
//                       <textarea
//                         value={message}
//                         onChange={handleChange}
//                       ></textarea>
//                       <label>
//                         <input type="checkbox" checked />
//                         Include price on receipt
//                       </label>
//                     </form>

//                     <div className="save-buttons">
//                       <p>
//                         <Link
//                           to="#"
//                           className="td-u"
//                           onClick={() => setDown(false)}
//                         >
//                           Cancel
//                         </Link>{" "}
//                         |{" "}
//                         <Link
//                           to="#"
//                           className="td-u"
//                           onClick={handleSaveMessage}
//                         >
//                           Save Message
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 {showMessage && (
//                   <div className="saved-message">
//                     <p>{message}</p>
//                     <label className="add-form">
//                       <input type="checkbox" checked />
//                       Include price on receipt
//                     </label>
//                     <div className="edit-delete-buttons">
//                       <Link onClick={handleEditMessage}>Edit</Link> |{" "}
//                       <Link onClick={handleDeleteMessage}>Delete</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="add-form-gift">
//                 <div
//                   className="add-per-info"
//                   onClick={() => setAgainDown(!againDown)}
//                 >
//                   <IoPricetagOutline />
//                   <h3>Enter a Gift Card or Promo Code</h3>
//                   {againDown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
//                 </div>
//                 {againDown && (
//                   <div className="add-form">
//                     <form>
//                       <input type="text" placeholder="" />
//                     </form>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
