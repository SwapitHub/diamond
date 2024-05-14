import React from 'react'
import { Link } from 'react-router-dom'

export const RingReadyToShip = () => {
    return (
        <section className="ready-ship-banner tp">
            <div className="container">
                <div className="inner-banner-wrapped">
                    <div className="banner-content">
                        <h2>Ready to Ship
                            Engagement Rings</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.</p>
                        <div className="btn-bar">
                            <Link to="/engagement-rings/start-with-a-setting" className="btn-custom">Shop Now</Link>
                        </div>
                    </div>
                    <div className="banner-img">
                        <img src="/images/readyBands.png" alt="banner-img" />
                    </div>
                </div>
            </div>
        </section>
    )
}
