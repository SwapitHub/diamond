import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const DepthPopup = ({ setDepthOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setDepthOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDepthOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Depth</h3>
              <Link to="#" onClick={() => setDepthOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>The height of a gemstone, from the culet to the table. Depth % is the height of the diamond as a percentage of the girdle diameter.</p>
              
            </div>
            <div className="carat-image">
                <img src="images/Bg.jpg" alt="" />
              </div>
          </div>
        </div>
      </section>
    </>
  );
};
