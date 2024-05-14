import React from 'react'
import { ShopDiamondShape } from '../home/ShopDiamondShape'
import { EngagementBanner } from './EngagementBanner'
import { OwnEngagementRing } from './OwnEngagementRing'
import { RingByStyle } from './RingByStyle'
import { RingEducation } from './RingEducation'
import { RingEndsSoon } from './RingEndsSoon'
import { RingExclusive } from './RingExclusive'
import { RingFaq } from './RingFaq'
import { RingReadyToShip } from './RingReadyToShip'
import { RingReviews } from './RingReviews'

export const EngagementRing = () => {
    return (
        <>
            <EngagementBanner />
            <ShopDiamondShape />
            <OwnEngagementRing />
            <RingEndsSoon />
            <RingByStyle />
            <RingReadyToShip />
            <RingExclusive />
            <RingReviews />
            <RingEducation />
            <RingFaq />
        </>
    )
}
