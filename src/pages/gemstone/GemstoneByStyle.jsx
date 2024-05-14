import React from 'react'
import { Link } from 'react-router-dom'

export const GemstoneByStyle = () => {
    return (
        <section className="own-engagment own-pd-control">
            <div className="container">
                <div className="popular-engagment">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                            Shop By Color
                        </h2>
                    </div>
                    <div className="inner-polular-eng">
                        <div className="popular-grid-wrapper">
                            <Link to="/gemstones/gemstone-shop-all?color=white">
                                <div className="imgg-sec">
                                    <img src="/images/Ring-1.jpg" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>White</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/gemstones/gemstone-shop-all?color=peach">
                                <div className="imgg-sec">
                                    <img src="/images/Ring-2.jpg" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Peach</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/gemstones/gemstone-shop-all?color=purple">
                                <div className="imgg-sec">
                                    <img src="/images/Ring-3.jpg" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Purple</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/gemstones/gemstone-shop-all?color=pink">
                                <div className="imgg-sec">
                                    <img src="/images/Ring-4.jpg" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Pink</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/gemstones/gemstone-shop-all?color=blue">
                                <div className="imgg-sec">
                                    <img src="/images/Ring-5.jpg" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Blue</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
