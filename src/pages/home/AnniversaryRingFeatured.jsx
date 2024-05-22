import React from "react";
import { Link } from "react-router-dom";

export const AnniversaryRingFeatured = () => {
  return (
    <section className="AnniversaryRing-main own-engagment education p-t">
      <div className="container">
        <div className="inner-own-eng gemstone">
          <div className="heading-sec">
            <h3 className="heading-text" style={{ color: "#310F4C" }}>
              Anniversary Rings <span>Featured</span>
            </h3>
          </div>
          <div className="ring-grid-sec">
            <div className="grid-wrapper-bar">
              <div className="img-bar">
                <img src="/images/aniversary_ring_1.png" alt="client-img" />
              </div>
              <div className="contant-bar">
                <h3>Anniversary Rings</h3>
                <p>
                  Generations of the Graff family have devoted their lives to
                  crafting diamonds of great beauty, rarity and perfection.
                  Discover why a Graff diamond engagement ring is the ultimate
                  expression of your love and commitment.
                </p>
                <Link to="/engagement-rings/start-with-a-setting">Discover</Link>
              </div>
            </div>
            <div className="grid-wrapper-bar">
              <div className="img-bar">
                <img src="/images/aniversary_ring.png" alt="client-img" />
              </div>
              <div className="contant-bar">
                <h3>The Sama Difference</h3>
                <p>
                 With a legacy of cutting and polishing some of history’s greatest gems, discover why our diamonds are considered the finest in the world.

                </p>
                <Link to="/engagement-rings/start-with-a-diamond">Discover</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
