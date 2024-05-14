import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const CutPopup = ({ setCutOpen }) => {
  const [carat, setCarat] = useState(0);

  const handleChange = (value) => {
    setCarat(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setCutOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCutOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Cut</h3>
              <Link to="#" onClick={() => setCutOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            The cut refers to the angles and proportions of a diamond. The cut of a diamond—its depth and width, and the uniformity of the facets—determines its beauty. The skill with which a diamond is cut determines how well it reflects and refracts light.
            </div>
            <div className="carat-image">
              <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Diamond-5.png" alt="hand" />
            </div>
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={carat}
                onChange={handleChange}
                step={25}
                marks={26}
              >
              </Slider>
            </div>
            <div className="cut-list">
                <ul>
                    <li>Fair</li>
                    <li>Good</li>
                    <li>Very Good</li>
                    <li>Ideal</li>
                    <li>Super Ideal</li>
                </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
