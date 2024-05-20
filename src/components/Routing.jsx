import React from "react";
import { Route, Routes } from "react-router-dom";




import { Home } from "../pages/home/Home";

import { ChooseDiamonds } from "./AllRings/ChooseDiamondPage/ChooseDiamonds";
import { DetailRingProduct } from "./AllRings/ChooseSettingPage/ChooseRingProduct/DetailRingProduct";
import ChooseRingSetting from "./AllRings/ChooseSettingPage/ChooseRingSetting";

import { PrivacyPolicy } from "../pages/barand/PrivacyPolicy";
import { EngagementRing } from "../pages/engagementRing/EngagementRing";
import { WeddingBands } from "../pages/weddingBands/WeddingBands";
import { ForgetPass } from "./forntFiles/ForgetPass";
import { LoginSignup } from "./forntFiles/LoginSignup";
import { Terms } from "./forntFiles/Terms";

import { ContactUs } from "../pages/contact/ContactUs";
import { Diamond } from "../pages/diamond/Diamond";
import { GemstoneBands } from "../pages/gemstone/GemstoneBands";
import { ChooseGemstones } from "./AllRings/ChooseGemstones/ChooseGemstones";
import { ChooseRingGemstone } from "./AllRings/ChooseGemstones/ChooseRingGemstone";
import { FinalGemstone } from "./AllRings/ChooseGemstones/FinalGemstone";
import { GemstonesDetail } from "./AllRings/ChooseGemstones/GemstonesDetail";
import { FinalRing } from "./AllRings/FinalRing";
import { SelectDiamond } from "./AllRings/SelectDiamond";
import { CartPage } from "./forntFiles/CartPage";
import { ContactsUs } from "./forntFiles/ContactsUs";
import { Help } from "./forntFiles/Help";
import { OrderHistory } from "./forntFiles/OrderHistory";
import { PaymentForm } from "./forntFiles/PaymentForm";
import { ReviewConfirm } from "./forntFiles/ReviewConfirm";
import { SearchPage } from "./forntFiles/SearchPage";
import { SuccessPayment } from "./forntFiles/SuccessPayment";
import { WishList } from "./forntFiles/WishList";
import { WishListDataBase } from "./forntFiles/WishListDataBase";
import { CheckOutPage } from "./forntFiles/checkOut/CheckOutPage";
import { MyAccountDashboard } from "./forntFiles/dashboard/MyAccountDashboard";

export const Routing = () => {
  return (
    <Routes>
      {/* <Route path='/' exact element={<MainPage />} /> */}
      <Route path="/" exact element={<Home />} />

 
      
      <Route path="/:slug/:slug" element={<ChooseRingSetting />} />
      <Route
        path="engagement-rings/start-with-a-diamond"
        element={<ChooseDiamonds />}
      />
      <Route path="/:slug/:slug/lab" element={<ChooseDiamonds />} />
      <Route path="/diamonds" element={<ChooseDiamonds />} />

      <Route
        path="engagement-rings/start-with-a-gemstone"
        element={<ChooseGemstones />}
      ></Route>

      <Route
        path="/:slug/:slug"
        element={<ChooseGemstones />}
      ></Route>

      <Route
        path="gemstones/gemstone-shop-all"
        element={<ChooseGemstones />}
      ></Route>

      <Route path="/gemstones-detail" element={<GemstonesDetail />}></Route>

      <Route path="/detail-ring-product" element={<DetailRingProduct />} />
     
  

      <Route path="/:name" element={<ContactUs />} />
      <Route path="/wishlist" element={<WishList />}></Route>
      <Route path="/engagement-rings" element={<EngagementRing />}></Route>
      <Route path="/weading-band" element={<WeddingBands />}></Route>
      <Route path="/diamond" element={<Diamond />}></Route>
      <Route path="/gemstones" element={<GemstoneBands />}></Route>
      <Route path="/login" element={<LoginSignup />}></Route>
      <Route path="/password_reset" element={<ForgetPass />}></Route>
      <Route path="/terms" element={<Terms />}></Route>
      <Route path="/privacy" element={<PrivacyPolicy />}></Route>
      <Route path="/contact" element={<ContactsUs />}></Route>
      <Route path="/check_out" element={<CheckOutPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      {/* <Route path="/cart-page" element={<DatabaseCartPage />}></Route> */}
      <Route path="/help" element={<Help />}></Route>
      <Route path="/final_ring" element={<FinalRing />}></Route>
      <Route path="/view_diamond" element={<SelectDiamond />}></Route>
      <Route path="/accounts" element={<MyAccountDashboard />}></Route>
      <Route path="/orders-history" element={<OrderHistory />}></Route>
      <Route
        path="detail-ring-product-gemstone"
        element={<ChooseRingGemstone />}
      />
      <Route path="/final_ring_gemstone" element={<FinalGemstone />}></Route>
      <Route path="/wishlist-page" element={<WishListDataBase />} />
      <Route path="/search" element={<SearchPage />}></Route>
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/confirm" element={<ReviewConfirm />} />
      <Route path="/success" element={<SuccessPayment />} />


    </Routes>
  );
};
