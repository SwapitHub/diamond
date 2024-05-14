import React from 'react'
import { Link } from 'react-router-dom'

export const GemstoneOwnEngagementRing = () => {
    return (
        <section className="own-engagment gemstone">
            <div className="container">
                <div className="inner-own-eng">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                            Preset Gemstone Rings
                        </h2>
                    </div>
                    <div className="ring-grid-sec">
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=moissanite">
                                <div className="img-bar">
                                    <img src="/images/Moissanite-Rings.jpg" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Moissanite Rings</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=sapphire">
                                <div className="img-bar">
                                    <img src="/images/Sapphire-Rings2.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Sapphire Rings</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=morganite">
                                <div className="img-bar">
                                    <img src="/images/Morganite-Rings.jpg" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Morganite Rings</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=aquamarine">
                                <div className="img-bar">
                                    <img src="/images/Aquamarine-Rings.jpg" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Aquamarine Rings</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}
