import React, { useState } from "react";
import { ChooseSetting } from "../../ChooseSettingPage/ChooseSetting";
import { ChooseDiamonds } from "../../ChooseDiamondPage/ChooseDiamonds";
import { Link } from "react-router-dom";

export const DiemondPageTabe2 = () => {
    const [active, setActive] = useState("ChooseSetting");
  return (
    <>
      <div>
        <div className="main-btn-setting">
        <button>  <Link to="" onClick={()=> setActive("ChooseSetting")}>1 Choose Setting <span>Ring icon</span> </Link></button>
        <button> <Link to="" onClick={()=> setActive("LabDiamond")}>2 Choose Diamond <span>Diamond icon</span><br/> <Link to="" className="Browse-Diamonds">Browse Diamonds</Link></Link></button>
          <button>Complete Ring <span>complete ring icon</span> <br/> <p> Select Ring Size </p></button>
        </div>

        <div className="">
            {active === "ChooseSetting" &&  <ChooseSetting/>}       
            {active === "LabDiamond" &&  <ChooseDiamonds/>}
            {/* {active === "CompleteRing" &&  <Setting title="3"/>} */}
        </div>
      </div>
    </>
  );
};
