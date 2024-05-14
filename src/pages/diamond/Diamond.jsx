import React from 'react';
import { ShopDiamondShape } from '../home/ShopDiamondShape';
import { DiamondBanner } from './DiamondBanner';
import { DiamondCommitment } from './DiamondCommitment';
import { DiamondEdu } from './DiamondEdu';
import { DiamondFaq } from './DiamondFaq';
import { DiamondReadyToShip } from './DiamondReadyToShip';
import { DiamondReviews } from './DiamondReviews';
import { DiamondSets } from './DiamondSets';

export const Diamond = () => {
  return (
    <>
      <DiamondBanner />
      <ShopDiamondShape />
      <DiamondReadyToShip />
      <DiamondCommitment />
      <DiamondSets />
      <DiamondReviews />
      <DiamondEdu />
      <DiamondFaq />
    </>
  )
}
