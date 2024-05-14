import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const TablePopup = ({ setTableOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setTableOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setTableOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Table</h3>
              <Link to="#" onClick={() => setTableOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>The largest facet of a gemstone, located at the top. Table % is the table width as a percentage of the girdle diameter.</p>
              
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
