import React from "react";

const ProgressBar = ({ step }: { step: number }) => {
  const steps = 4;
  return (
    <div className="w-full mx-auto">
      <div className="relative mt-4 mb-6">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-200 rounded-full transform -translate-y-1/2"></div>

        {/* Progress Bar */}
        <div
          className="absolute top-1/2 h-2 bg-main-blue rounded-full transform -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ width: `${(step / (steps - 1)) * 100}%` }}
        ></div>

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {[...Array(steps)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full z-10 ${
                step >= index ? "bg-main-blue" : "bg-slate-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
