import React from 'react'
import { Banner } from './Banner'
import { ShopDiamondShape } from './ShopDiamondShape'
import "../Style.css"
import { ShopCategory } from './ShopCategory'
import { EndsSoon } from './EndsSoon'
import { EternityRings } from './EternityRings'
import { MostLoved } from './MostLoved'
import { BridalSets } from './BridalSets'
import { MenRings } from './MenRings'
import { ShopDiamondSlider } from './ShopDiamondSlider'
import { MostLovedSlider } from './MostLovedSlider'
import { ShopByCategorySlider } from './ShopByCategorySlider'
import { SeeProducts } from './SeeProducts'
import { EngagementBridal } from './EngagementBridal'
import { AnniversaryRing } from './AnniversaryRing'


export const Home = () => {
  return (
    <>    
<div>
  <Banner/>
  <ShopDiamondShape/>
  <SeeProducts/>
  <EngagementBridal/>
  <ShopDiamondSlider/>
  <ShopCategory/>
  <ShopByCategorySlider/>
  <EndsSoon/>
  <EternityRings/>
  <BridalSets/>
  <MenRings/>
  {/* <MostLoved/> */}
  <MostLovedSlider/>
  <AnniversaryRing/>
  
</div>
    
    </>
  )
}
