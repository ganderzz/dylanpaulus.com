import React from "preact";
import satori from "satori";

export const generateCard = async () =>
  await satori(
    <div
      style={{
        fontFamily: "Inter",
        height: "100%",
        width: "100%",
        display: "flex",
        padding: 10,
        background:
          "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
      }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",

          background:
            "linear-gradient(342deg, rgba(42,53,70,1) 0%, rgba(60,73,94,1) 100%)",
        }}></div>
    </div>,
    {
      height: 630,
      width: 1200,
      fonts: [],
    }
  );
