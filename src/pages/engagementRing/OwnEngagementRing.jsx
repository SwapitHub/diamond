import React from 'react'
import { Link } from 'react-router-dom'

export const OwnEngagementRing = () => {
    return (
        <section className="own-engagment">
            <div className="container">
                <div className="inner-own-eng">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                            Design Your Own Engagement Ring
                        </h2>
                    </div>
                    <div className="ring-grid-sec">
                        <div className="grid-wrapper-bar">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="img-bar">
                                    <img src="/images/ring1.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Setting</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/engagement-rings/start-with-a-diamond">
                                <div className="img-bar">
                                    <img src="/images/ring2.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Natural Diamond</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/engagement-rings/start-with-a-diamond/lab">
                                <div className="img-bar">
                                    <img src="/images/ring3.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Lab Diamond</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="grid-wrapper-bar">
                            <Link to="/engagement-rings/start-with-a-gemstone">
                                <div className="img-bar">
                                    <img src="/images/ring4.png" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Gemstone</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="popular-engagment">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                            Popular Engagement Rings
                        </h2>
                    </div>
                    <div className="inner-polular-eng">
                        <div className="popular-grid-wrapper">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img src="/images/popRing1.png" />
                                </div>
                                <div className="text-con">
                                    <p>Secret Garden</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img src="/images/popRing2.png" />
                                </div>
                                <div className="text-con">
                                    <p>Secret Garden</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img src="/images/popRing3.png" />
                                </div>
                                <div className="text-con">
                                    <p>Secret Garden</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img src="/images/popRing4.png" />
                                </div>
                                <div className="text-con">
                                    <p>Secret Garden</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link to="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img src="/images/popRing5.png" />
                                </div>
                                <div className="text-con">
                                    <p>Secret Garden</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
