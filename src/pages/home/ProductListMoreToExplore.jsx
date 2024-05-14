import React from "react";
import moreto1 from "../../images/moreto1.png";

export const ProductListMoreToExplore = () => {
  return (
    <div className="more-to-explore-main">
     
        <h3>More to Explore</h3>
        <div className="more-to-explore flex">
          <div className="more-to-explore-child">
            <div className="img">
              <img src={moreto1} alt="moreto1" />
            </div>
            <h5>Design Tour Own Ring Stack</h5>
          </div>
          <div className="more-to-explore-child">
            <div className="img">
              <img src={moreto1} alt="moreto1" />
            </div>
            <h5>Design Tour Own Ring Stack</h5>
          </div>
          <div className="more-to-explore-child">
            <div className="img">
              <img src={moreto1} alt="moreto1" />
            </div>
            <h5>Design Tour Own Ring Stack</h5>
          </div>
        </div>
      
    </div>
  );
};
