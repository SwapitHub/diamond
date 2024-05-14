import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const ColorPopup = ({ setColorOpen }) => {
  const [color, setColor] = useState(0);

  const handleChange = (value) => {
    setColor(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setColorOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setColorOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Color</h3>
              <Link to="#" onClick={() => setColorOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            Color is the natural color visible in a diamond and does not change over time. Colorless diamonds allow more light to pass through than a colored diamond, releasing more sparkle and fire.
            </div>
            <div className="carat-image">
              <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Shine-5.png" alt="hand" />
            </div>  
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={color}
                onChange={handleChange}
                step={17}
                marks={18}
              >
              </Slider>
            </div>
            <div className="color-list">
                <ul>
                    <li>J</li>
                    <li>I</li>
                    <li>H</li>
                    <li>G</li>
                    <li>F</li>
                    <li>E</li>
                    <li>D</li>
                </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
