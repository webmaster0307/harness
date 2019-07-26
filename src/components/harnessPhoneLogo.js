import React from "react";

const HarnessPhoneLogo = () => (
  <svg
    style={{height:'100%'}}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 40"
  >
    <image
      height="100%"
      x="0"
      y="0"
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeWidth="1"
      transform="translate(-43 -99) translate(30 89) translate(13 10)"
      xlinkHref="data:image/png;base64,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"
    />
  </svg>
);

export default HarnessPhoneLogo
