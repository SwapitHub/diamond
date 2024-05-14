import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const ClarityPopup = ({ setClarityOpen }) => {
  const [clarity, setClarity] = useState(0);

  const handleChange = (value) => {
    setClarity(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setClarityOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setClarityOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Clarity</h3>
              <Link to="#" onClick={() => setClarityOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              A diamond’s clarity refers to the presence of impurities on and
              within the stone. When a rough stone is extracted from carbon deep
              beneath the earth, tiny traces of natural elements are almost
              always trapped inside. These elements are called flaws or
              inclusions because they are formed naturally and are unique to
              each stone.
            </div>
            <div className="carat-image">
              <img src="https://s3-sama.s3.us-east-2.amazonaws.com/frontend/images/Damage-7.png" alt="hand" />
            </div>
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={clarity}
                onChange={handleChange}
                step={15}
                marks={16}
              ></Slider>
            </div>
            <div className="clarity-list">
              <ul>
                <li>Si2</li>
                <li>SI1</li>
                <li>VS2</li>
                <li>VS1</li>
                <li>WS2</li>
                <li>WS1</li>
                <li>IF</li>
                <li>FL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
