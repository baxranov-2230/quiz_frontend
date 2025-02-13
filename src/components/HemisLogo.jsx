import React from "react";

function HemisLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-xl font-bold">HEMIS</span>
      <span className="text-sm ml-2">Student</span>
    </div>
  );
}

export default HemisLogo;
