import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

export const ShapePopup = ({ setShapeOpen }) => {
  const [carat, setCarat] = useState(0);

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setShapeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShapeOpen]);
  return (
    <>
      <section className="new-popups">
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Shape</h3>
              <Link to="#" onClick={() => setShapeOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              Diamond cut should not be confused with shape. Shape refers to the
              general outward appearance of the diamond, not its reflective
              qualities. Brilliant Earth currently carries the following shapes:
            </div>
            <div className="shapes-image">
              <div>
                <img src="/images/Round.png" alt="hand" />
                <p className="shapes-name">Round</p>
              </div>
              <div>
                <img src="/images/Oval.png" alt="hand" />
                <p className="shapes-name">Oval</p>
              </div>
              <div>
                <img src="/images/Pear.png" alt="hand" />
                <p className="shapes-name">Pear</p>
              </div>
              <div>
                <img src="/images/Princess.png" alt="hand" />
                <p className="shapes-name">Princess</p>
              </div>
              <div>
                <img src="/images/Asscher.png" alt="hand" />
                <p className="shapes-name">Asscher</p>
              </div>
              <div>
                <img src="/images/Cushion.png" alt="hand" />
                <p className="shapes-name">Cushion</p>
              </div>
              <div>
                <img src="/images/Emerald-2.png" alt="hand" />
                <p className="shapes-name">Emerald</p>
              </div>
              <div>
                <img src="/images/Marquise.png" alt="hand" />
                <p className="shapes-name">Marquise</p>
              </div>
              <div>
                <img src="/images/Radiant.png" alt="hand" />
                <p className="shapes-name">Radiant</p>
              </div>
              <div>
                <img src="/images/Heart.png" alt="hand" />
                <p className="shapes-name">Heart</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
