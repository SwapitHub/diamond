import React, { useState } from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [active, setActive] = useState("ChooseSetting");
  return (
    <>
      <div>
        <div className="main-btn-setting">
          <div className="ring Create-Your-Ring">
            <span>Create Your Ring</span>
          </div>
          <div className="ring Choose-Setting">
            <Link to="" onClick={() => setActive("ChooseSetting")}>
              <div>1 Choose Setting</div>
              <div className="img">
                <img
                  src="https://css.brilliantearth.com/static/img/svg/setting.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className="ring Choose-Diamond">
            <Link to="#" onClick={() => setActive("LabDiamond")}>
              <div>
                <div>2 Choose Diamond</div>
                <Link to="#" className="Browse-Diamonds">
                  Browse Diamonds
                </Link>
              </div>

              <div className="img">
                <img
                  src="https://css.brilliantearth.com/static/img/svg/diamond.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className="ring Complete-Ring">
            <div>
              Complete Ring <p> Select Ring Size </p>
            </div>
            <div className="img">
              <img
                src="https://css.brilliantearth.com/static/img/svg/ring.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="">
          {/* {active === "ChooseSetting" && <ChooseSetting />} */}
          {/* {active === "LabDiamond" &&  <ChooseDiamonds/>} */}
          {/* {active === "CompleteRing" &&  <Setting title="3"/>} */}
        </div>
      </div>
    </>
  );
};
