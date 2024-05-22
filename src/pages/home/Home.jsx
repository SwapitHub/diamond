import React from "react";
import { Banner } from "./Banner";
import { ShopDiamondShape } from "./ShopDiamondShape";
import "../Style.css";
import { ShopCategory } from "./ShopCategory";
import { EndsSoon } from "./EndsSoon";
import { EternityRings } from "./EternityRings";
import { MostLoved } from "./MostLoved";
import { BridalSets } from "./BridalSets";
import { MenRings } from "./MenRings";
import { ShopDiamondSlider } from "./ShopDiamondSlider";
import { MostLovedSlider } from "./MostLovedSlider";
import { ShopByCategorySlider } from "./ShopByCategorySlider";
import { SeeProducts } from "./SeeProducts";
import { EngagementBridal } from "./EngagementBridal";

import { ShopDiamondCotegory } from "./ShopDiamondCotegory";
import { AnniversaryRingFeatured } from "./AnniversaryRingFeatured";
import { AnniversaryRings } from "./AnniversaryRings";
import { WeddingCollection } from "./WeddingCollection";
import { CelebarteLove } from "./CelebarteLove";
import LoveBrilliance from "./LoveBrilliance";

export const Home = () => {
  return (
    <>    
<div>
<Banner/>
  <ShopDiamondShape/>
  <SeeProducts/>
  <ShopDiamondCotegory/>
  <MenRings/>
<AnniversaryRings/>
<CelebarteLove/>
<WeddingCollection/>

        <EngagementBridal />

        <LoveBrilliance />
        {/* <ShopDiamondSlider/>
  <ShopCategory/>
  <ShopByCategorySlider/>
  <EndsSoon/>
  <EternityRings/>
  <BridalSets/> */}
        {/* <MostLoved/> */}
        {/* <MostLovedSlider/> */}
        <AnniversaryRingFeatured />
      </div>
    </>
  );
};
