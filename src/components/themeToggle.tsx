import React from "react";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as SunIcon } from "../icons/sun.svg";
import useTheme from "../hooks/useTheme";
import { useSpring, useTransition, animated } from "react-spring";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const transitions = useTransition(theme === "dark", null, {
    from: { position: "absolute" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(2)" },
  });

  return (
    <a
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="text-white hover:text-gray-500 transition-colors relative text-xl ml-3 inline-block cursor-pointer"
      style={{
        top: 5,
        width: 24,
        height: 24,
      }}
    >
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            <SunIcon />
          </animated.div>
        ) : (
          <animated.div key={key} style={props}>
            <MoonIcon />
          </animated.div>
        )
      )}
    </a>
  );
}
