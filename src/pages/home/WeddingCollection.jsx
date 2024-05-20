import React from 'react'
import { Link } from 'react-router-dom'

export const WeddingCollection = () => {
    return (
        <section className="own-engagment gemstone WeddingCollection">
            <div className="container">
                <div className="inner-own-eng">
                    <div className="heading-sec">                    
                    </div>
                    <div className="ring-grid-sec">
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=moissanite">
                                <div className="img-bar">
                                    <img src="/images/engement_ring.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Engagement Rings</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=sapphire">
                                <div className="img-bar">
                                    <img src="/images/wedding_jwelary.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Wedding Jewerly</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/gemstones/gemstone-shop-all?style=morganite">
                                <div className="img-bar">
                                    <img src="/images/wedding_collection.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>wedding collection</h5>
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                </div>

            </div>
        </section>

    )
}
