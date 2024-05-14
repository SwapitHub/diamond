import { useState, useEffect, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#310f4c",
  margin: "0 auto"
};

function LoaderSpinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#310f4c");  

  return (
    <div className="sweet-loading">      
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        
      />
    </div>
  );
}

export default LoaderSpinner;