import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const CaratPopup = ({ setIsOpen }) => {
  const [carat, setCarat] = useState(0);

  const handleChange = (value) => {
    setCarat(value);
  };

  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Carat</h3>
              <Link to="#" onClick={() => setIsOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              A carat is the unit used to measure a diamond's weight. One carat
              equals 200 milligrams or 0.2 grams. Although carat weight and the
              size of a diamond are related, the carat does not directly measure
              diamond size.
            </div>
            <div className="carat-image">
              <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/DiamondHand.png" alt="hand" />
            </div>
            <div className="carat-slider">
              <Slider
                min={0.25}
                max={2.0}
                value={carat}
                onChange={handleChange}
                step={0.01}
              >
              </Slider>
                <div>Selected Carat: {carat} CT</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
