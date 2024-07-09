import React from "react";
import Image from "next/image";
const LoadingSpinner = () => {
  return (
    <div className="loader-container">
      <Image
        src="/assets/svg/GacaFooter.svg"
        width={200}
        height={100}
        style={{ marginRight: "50px" }}
      />
      <span class="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
