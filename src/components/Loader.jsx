import React from "react";

const Loader = () => {
  return (
    <div className="relative">
      <div className="loading">
        <svg width="64px" height="48px" className="stroke-2 stroke-round">
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="back"
            className="fill-none stroke-[#ff4d5033]"
          />
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front"
            className="fill-none stroke-[#ff4d4f] [stroke-dasharray:48,144] [stroke-dashoffset:192] animate-dash"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
