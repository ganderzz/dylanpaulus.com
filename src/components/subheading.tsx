import * as React from "react";

export const SubHeading = ({ children, className = "", style = {} }) => {
  return (
    <h4
      className={`text-base leading-4 mt-8 mb-6 text-primary-300 font-bold tracking-wide uppercase ${className}`}
      style={style}
    >
      {children}
    </h4>
  );
};
