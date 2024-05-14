import { combineReducers } from "redux";
import { cartData } from "./reducer";
import { wishlistData } from "./wishlistReducer";
import { productDataWishlist } from "./productReducer";
import { productDataCart } from "./productReducerCart";

export default combineReducers({
  cartData,
  wishlistData,
  productDataWishlist,
  productDataCart,
});
