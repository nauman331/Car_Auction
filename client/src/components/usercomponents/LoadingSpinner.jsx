import React from "react";
import loader from "../../assets/images/tyre-loader.png"
import "../../assets/stylesheets/loadingspinner.scss"

const LoadingSpinner = () => {
  return (
    <div id="div">
      <img
        class="wheel"
        src={loader}
        alt="Loading..."
        border="0"
        width="300"
        height="300"
      />
    </div>
  );
};

export default LoadingSpinner;
