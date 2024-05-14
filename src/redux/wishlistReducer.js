import { ADD_TO_WISHLIST, REMOVE_TO_WISHLIST } from "./constant";

export const wishlistData = (data = [], action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST:
        console.warn("ADD_TO_WishList condition ", action);
        return [...data, { ...action.payload }];
      case REMOVE_TO_WISHLIST:
        console.warn("REMOVE_TO_wishlist condition ", action);
        const remainingItems = data.filter(
          (item) => item.uniqueId !== action.data.uniqueId
        );
        return [...remainingItems];
      default:
        return data;
    }
  };