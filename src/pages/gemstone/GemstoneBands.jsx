import React from 'react';
import { GemstoneBanner } from './GemstoneBanner'; 
import { GemstoneShopByShape } from './GemstoneShopByShape';
import { GemstoneByStyle } from './GemstoneByStyle'; 
import  { GemstoneSets } from './GemstoneSets'; 
import  { GemstoneOwnEngagementRing } from './GemstoneOwnEngagementRing'; 
import  { GemstoneReviews } from './GemstoneReviews'; 
import  { GemstoneEducation } from './GemstoneEducation'; 
import  { GemstoneFaq } from './GemstoneFaq'; 


export const GemstoneBands = () => {
  return (
    <>
      <GemstoneBanner />
      <GemstoneShopByShape />
      <GemstoneByStyle />
      <GemstoneSets />
      <GemstoneOwnEngagementRing />
      <GemstoneReviews />
      <GemstoneEducation />
      <GemstoneFaq />
    </>
  )
}

