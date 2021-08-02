import React from "react";

export function TimelineContent({
  title,
  children,
}: React.PropsWithChildren<{ title: string | JSX.Element }>) {
  return (
    <>
      <strong>{title}</strong>
      <div>{children}</div>
    </>
  );
}

export function TimelineItem({
  className,
  isActive = false,
  children,
}: React.PropsWithChildren<{ className?: string; isActive?: boolean }>) {
  return (
    <li className={className ?? "mb-8"}>
      <div>
        <div
          className={`rounded-full h-4 w-4 relative z-20 ${
            isActive ? "bg-green-300 shadow pulse" : "bg-secondary-500"
          }`}
        />
        <div>{children}</div>
      </div>
    </li>
  );
}

export function Timeline({ children }: React.PropsWithChildren<{}>) {
  return (
    <div class="relative ml-4">
      <div style={{ left: 7 }}></div>

      <ul>{children}</ul>
    </div>
  );
}
