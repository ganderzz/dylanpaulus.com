import * as React from "react";
import { BookRating } from "../interfaces/IBookResponse";

export function RatingBadge({ children }: { children: BookRating }) {
  const [isShowingPopover, setShowingPopover] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>();
  const calculatedXPosition = React.useMemo(() => {
    if (ref.current) {
      return ref.current.clientWidth + 10;
    }

    return 110;
  }, [ref.current]);

  return (
    <span style={{ position: "relative" }}>
      <button
        ref={ref}
        onClick={() => setShowingPopover(!isShowingPopover)}
        className="text-lg rounded bg-gray-700 p-2 text-white no-underline font-semibold mr-2 opacity-75"
      >
        Rating: {children} <i className={"fa fa-question-circle ml-2"} />
      </button>

      {isShowingPopover && (
        <div
          className="text-xl shadow-lg animated fadeIn has-arrow"
          style={{
            position: "absolute",
            top: -5,
            left: calculatedXPosition,
            background: "#333",
            color: "#FFF",
            padding: 10,
            borderRadius: 4,
            width: 400
          }}
        >
          <sub className="text-lg opacity-75">
            The classic rating scales can be vague. What does a 4/5 mean? How is
            a 3/4 different than a 4/5? I've decided on a simplified rating
            system of three choices:
          </sub>
          <ul className="mt-6">
            <li>
              <strong>Avoid It:</strong>{" "}
              <span className="opacity-75">Not worth the read</span>
            </li>
            <li>
              <strong>Read It:</strong>{" "}
              <span className="opacity-75">Recommended</span>
            </li>
            <li>
              <strong>Commit to Memory:</strong>{" "}
              <span className="opacity-75">Take the content to heart</span>
            </li>
          </ul>
        </div>
      )}
    </span>
  );
}
