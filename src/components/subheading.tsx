import * as React from "react";

export function SubHeading({ children, className = "", style = {} }) {
  return (
    <p
      className={`text-base leading-4 mt-8 mb-6 text-primary-300 font-semibold tracking-wide uppercase ${className}`}
      style={style}
    >
      {children}
    </p>
  );
}
