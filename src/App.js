import "./pages/Style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routing } from "./components/Routing";
import Header from "./components/forntFiles/Header3";
import { createContext, useEffect, useRef, useState } from "react";
import ShopByStyle from "./components/AllRings/ChooseSettingPage/ChooseRingSetting";
import Example1 from "./components/AllRings/ChooseSettingPage/Example1";
import { Footer } from "./components/forntFiles/Footer";
import { ChooseGemstones } from "./components/AllRings/ChooseGemstones/ChooseGemstones";
import { ToastContainer } from 'react-toastify';

import LoaderSpinner from "./components/LoaderSpinner";
export const UserContext = createContext(null);


function App() {
  const [toggledProducts, setToggledProducts] = useState({});
  const [diamondRingToggle, setDiamondRingToggle] = useState({});
  const [localWishlist, setLocalWishlist] = useState([]);
  const [diamondRingLocal, setDiamondRingLocal] = useState([]);
  const [cartDetails, setCartDetails] = useState();
  const [userId, setUserId] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const [searching, setSearching] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showSuggestionHeader, setShowSuggestionHeader] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false)

  const buttonRef = useRef(null);

  const triggerCart = () => {
    buttonRef.current.click();
  };

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="App">
        <UserContext.Provider
          value={{
            toggledProducts: toggledProducts,
            setToggledProducts: setToggledProducts,
            diamondRingToggle: diamondRingToggle,
            setDiamondRingToggle: setDiamondRingToggle,
            localWishlist: localWishlist,
            setLocalWishlist: setLocalWishlist,
            diamondRingLocal: diamondRingLocal,
            setDiamondRingLocal: setDiamondRingLocal,
            setCartDetails: setCartDetails,
            cartDetails: cartDetails,
            userId: userId,
            setUserId: setUserId,
            removeWishList: removeWishList,
            setRemoveWishList: setRemoveWishList,
            searching: searching,
            setSearching: setSearching,
            showSuggestion: showSuggestion,
            setShowSuggestion: setShowSuggestion,
            showSuggestionHeader: showSuggestionHeader,
            setShowSuggestionHeader: setShowSuggestionHeader,
            buttonRef: buttonRef,
            triggerCart: triggerCart,
            loadingCart : loadingCart,
            setLoadingCart: setLoadingCart,
          }}
        >
          {loading ? (
            <LoaderSpinner />
          ) : (
            <>
              <Header />
              <Routing />
              <Footer />
            </>
          )}
          <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
        </UserContext.Provider>
        {/* <Example1/> */}
        {/* <ShopByStyle/> */}
      </div>
    </>
  );
}

export default App;
