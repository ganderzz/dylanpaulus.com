import React from "https://esm.sh/react";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.2/mod.ts";

export default async (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const title = params.get("title") ?? "dylanpaulus.com";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          fontSize: 32,
          background: "#2a3546",
          color: "#fff",
        }}>
        <div style={{ fontSize: 48, fontWeight: 600 }}>{title}</div>

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="18 10 130 130">
            <path
              fill="#01F9EF"
              d="M36 77.5l21.9-21.9V38.4L18.8 77.5l39 39.1V99.4z"
            />
            <path
              fill="#F8D306"
              d="M132.5 77.5l-21.9 21.9v17.2l39.1-39.1-39-39.1v17.2z"
            />
            <path fill="#5755C9" d="M66.8 10.7H79V117H66.8z" />
            <path fill="#CB54A1" d="M89.5 38h12.2v106.3H89.5z" />
          </svg>
        </div>
      </div>
    ),
    { debug: true }
  );
};

export const config = { path: "/og-image" };
