import React from "react";
import { Link } from "react-router-dom";

const LoveBrilliance = () => {
  return (
    <section className="love-bri-section">
      <div className="container">
        <div
          className="loves-inner"
          style={{ backgroundImage: "url(./images/love-ring-back.png)" }}
        >
          <div className="love-left-image">
            <img src="./images/love-sec-ring.png" alt="" />
          </div>

          <div className="love-right-content">
            <h4>wedding jewerllery</h4>
            <h3>Love’s Brilliance</h3>
            <p>
              Design your engagement ring your way. Start with a ring setting
              and then add the perfect center stone - or vice versa. It’s really
              up to you!
            </p>

            <Link class="btn explore" to="/engagement-rings/start-with-a-setting">
              Explore Engagment Rings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveBrilliance;
