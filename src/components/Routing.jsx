import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChooseDiamondProduct } from "./AllRings/ChooseDiamondPage/ChooseDiamondProduct/ChooseDiamondProduct";

import ShapCaret from "./AllRings/ChooseDiamondPage/ShapCaret";
import { DiemondPageTabe1 } from "./AllRings/mainPageTabe/diemondPageTabe/DiemondPageTabe1";

import { DiemondPageTabe2 } from "./AllRings/mainPageTabe/diemondPageTabe/DiemondPageTabe2";
import { TablePopUp } from "./AllRings/ChooseDiamondPage/TablePopUp";

import { ChooseDiamondProductCart } from "./AllRings/ChooseDiamondPage/ChooseDiamondProduct/ChooseDiamondProductCart";
import { MainPage4_1 } from "./AllRings/mainPageTabe/ringPageTable/MainPage4_1";
import { Home } from "../pages/home/Home";
import { DetailRingProduct } from "./AllRings/ChooseSettingPage/ChooseRingProduct/DetailRingProduct";
import ChooseSetting from "./AllRings/ChooseSettingPage/ChooseRingSetting";
import ChooseRingSetting from "./AllRings/ChooseSettingPage/ChooseRingSetting";
import { ChooseDiamonds } from "./AllRings/ChooseDiamondPage/ChooseDiamonds";
import { BookAnAppointment } from "../pages/contact/BookAnAppointment";

import { PrivacyPolicy } from "../pages/barand/PrivacyPolicy";
import { TermsUse } from "../pages/barand/TermsUse";
import { EngagementRing } from "../pages/engagementRing/EngagementRing";
import { WeddingBands } from "../pages/weddingBands/WeddingBands";
import { LoginSignup } from "./forntFiles/LoginSignup";
import { ForgetPass } from "./forntFiles/ForgetPass";
import { Terms } from "./forntFiles/Terms";

import { ContactsUs } from "./forntFiles/ContactsUs";
import { WishList } from "./forntFiles/WishList";
import { GemstoneSets } from "../pages/gemstone/GemstoneSets";
import { GemstoneBands } from "../pages/gemstone/GemstoneBands";
import { Diamond } from "../pages/diamond/Diamond";
import { ContactUs } from "../pages/contact/ContactUs";
import { CartPage } from "./forntFiles/CartPage";
import { Cart } from "./forntFiles/Cart";
import { Help } from "./forntFiles/Help";
import { FinalRing } from "./AllRings/FinalRing";
import { CheckOutPage } from "./forntFiles/checkOut/CheckOutPage";
import { OrderHistory } from "./forntFiles/OrderHistory";
import { MyAccountDashboard } from "./forntFiles/dashboard/MyAccountDashboard";
import { SelectDiamond } from "./AllRings/SelectDiamond";
import { ChooseGemstones } from "./AllRings/ChooseGemstones/ChooseGemstones";
import { GemstonesDetail } from "./AllRings/ChooseGemstones/GemstonesDetail";
import { DatabaseCartPage } from "./forntFiles/DatabaseCartPage";
import { ChooseRingGemstone } from "./AllRings/ChooseGemstones/ChooseRingGemstone";
import { FinalGemstone } from "./AllRings/ChooseGemstones/FinalGemstone";
import { WishListDataBase } from "./forntFiles/WishListDataBase";
import { SearchPage } from "./forntFiles/SearchPage";
import { PaymentForm } from "./forntFiles/PaymentForm";
import { ReviewConfirm } from "./forntFiles/ReviewConfirm";
import { SuccessPayment } from "./forntFiles/SuccessPayment";

export const Routing = () => {
  return (
    <Routes>
      {/* <Route path='/' exact element={<MainPage />} /> */}
      <Route path="/" exact element={<Home />} />

      <Route path="chooseDiamondProduct" element={<ChooseDiamondProduct />} />
      <Route
        path="chooseDiamondProductCart/:productId"
        element={<ChooseDiamondProductCart />}
      />
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
      <Route path="shapCaret/:productId" element={<ShapCaret />} />
      <Route path="diemondPageTabe1" element={<DiemondPageTabe1 />} />
      <Route path="diemondPageTabe2" element={<DiemondPageTabe2 />} />
      <Route path="mainPage3/:productId" element={<TablePopUp />} />
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
