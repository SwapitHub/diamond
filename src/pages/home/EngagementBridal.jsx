import React from "react";
import { Link } from "react-router-dom";

export const EngagementBridal = () => {
  return (
    <section className="EngagementBridal-main">
      <div className="container">
        <div className="flex common-row EngagementBridal">
          <div className="EngagementBridal-img">
            <img src="./images/eng_bridal_3.png" alt="" />
          </div>
          <div className="EngagementBridal-text">
            <h2>Engagement & Bridal</h2>
            <p>
              The diamond you choose to wear is the epitome of your love. With a
              legacy of cutting and polishing some of history’s greatest stones,
              Graff has been synonymous with the finest diamonds in the world
              for more than 60 years.
            </p>
            <Link className="button" to="/engagement-rings/start-with-a-setting">
              Discover Collections
            </Link>
          </div>
        </div>

        <div className="flex common-row EngagementBridal-2">
          <div className="EngagementBridal-2-img">
            <img src="./images/eng_bridal_2.png" alt="" />
          </div>
          <div className="EngagementBridal-2-img text">
            <p>
              Designing your dream engagement ring is now easier than ever with
              our 'Design Your Own' feature. Choose from an array of stunning
              settings, dazzling diamonds, and exquisite gemstones to craft a
              ring as unique as your love story.
            </p>
            <span>Let’s go!</span>
            <Link className="button" to="#">See to Page Design</Link>
          </div>
          <div className="EngagementBridal-2-img"><img src="./images/eng_bridal_1.png" alt="" /></div>
        </div>
      </div>
    </section>
  );
};
