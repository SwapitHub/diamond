import React from 'react'
import { WeddingBanner } from './WeddingBanner'
import { WeddingSets } from './WeddingSets'
import { WeddingByStyle } from './WeddingByStyle'
import { WeddingEndsSoon } from './WeddingEndsSoon'
import { WeddingCommitment } from './WeddingCommitment'
import { WeddingPopular } from './WeddingPopular'
import { WeddingReadyShip } from './WeddingReadyShip'
import { WeddingBridal } from './WeddingBridal'
import { WeddingReviews } from './WeddingReviews'
import { WeddingEdu } from './WeddingEdu'
import { WeddingFaq } from './WeddingFaq'

export const WeddingBands = () => {
    return (
        <>
            <WeddingBanner/>
            <WeddingSets/>
            <WeddingByStyle/>
            <WeddingEndsSoon/>
            <WeddingCommitment/>
            <WeddingPopular/>
            <WeddingReadyShip/>
            <WeddingBridal/>
            <WeddingReviews/>
            <WeddingEdu/>
            <WeddingFaq/>
        </>
    )
}
