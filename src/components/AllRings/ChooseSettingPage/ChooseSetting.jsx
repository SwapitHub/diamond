// import React, { useState } from "react";
// import MoreFilters from "./MoreFilters";
// import ShopByStyle from "./ShopByStyle";
// import { MainPage } from "../mainPageTabe/ringPageTable/MainPage";
// import { Link } from "react-router-dom";

// export const ChooseSetting = () => {
//   const [myActive, setMyActive] = useState("ShopByStyle");
//   console.warn("=========", myActive);
//   return (
//     <div className="container ChooseSetting">
//       <h3 className="center">Engagement Ring Settings</h3>
//       <MainPage />
//       <div className="lab-diamond-btn">
//         <div className="shop-by-common ShopByStyle">
//           <Link to="#" onClick={() => setMyActive("ShopByStyle")}>
//             Shop by style
//           </Link>
//         </div>

//         <div className="shop-by-common shop-by-shape">
//           <Link to="#" onClick={() => setMyActive("ShopByStyle")}>
//             Shop by shape
//           </Link>
//         </div>

//         <div className="shop-by-common shop-by-metal">
//           <Link to="#" onClick={() => setMyActive("ShopByStyle")}>
//             Shop by Metal
//           </Link>
//         </div>

//         <div className="shop-by-common shop-by-price">
//           <Link to="#" onClick={() => setMyActive("ShopByStyle")}>
//             Shop by Price
//           </Link>
//         </div>
//       </div>

//       <div>
//         {/* {myActive === "ShopByStyle" && <ShopByStyle />} */}
//         {/* {myActive === "ShopByMetal" && <MoreFilters />} */}
//       </div>
//     </div>
//   );
// };
