import React from "react";
import { Link } from "react-router-dom";

export const RingSizer = () => {
  return (
    <section className="ring-sizer-main">
      <div className="container">
        <div className="ring-sizer">
          <p>
            We are happy to help you find your size. Request a complimentary
            ring sizer or view the ring size guide below.
          </p>
          <h3>Ring Sizer</h3>
          <p>
            SAMA offers each customer one complimentary Ring Sizer. Ring sizers
            shipped to the US will arrive within five to seven business days.
          </p>
          <div><Link to="#">Order Ring Sizer</Link></div>
        </div>
      </div>
    </section>
  );
};
