import React from "react";
import loader from "../../assets/images/Logo-Animation.gif"
import "../../assets/stylesheets/loadingspinner.scss"

const LoadingSpinner = () => {
  return (
    <div id="div">
      <img
        class="wheel"
        src={loader}
        alt="Loading..."
        border="0"
      />
    </div>
  );
};

export default LoadingSpinner;
