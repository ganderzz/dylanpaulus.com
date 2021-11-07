import React from "react";

export function TimelineContent({
  title,
  children,
}: React.PropsWithChildren<{ title: string | JSX.Element }>) {
  return (
    <>
      <strong>{title}</strong>
      <div className="text-gray-600 dark:text-gray-400 -mt-2">{children}</div>
    </>
  );
}

export function TimelineItem({
  className,
  isActive = false,
  children,
}: React.PropsWithChildren<{ className?: string; isActive?: boolean }>) {
  return (
    <li className={`mb-8 relative ${className}`}>
      <div className="flex items-center mb-1">
        <div
          className={`rounded-full h-4 w-4 absolute top-2 z-20 ${
            isActive ? "bg-green-300 shadow pulse" : "bg-gray-400"
          }`}
        />
        <div className="flex-1 ml-8 font-base">{children}</div>
      </div>
    </li>
  );
}

export function Timeline({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative ml-4">
      <div
        className="border-r-2 border-secondary-400 dark:border-gray-600 absolute h-full top-0 z-10"
        style={{ left: 7 }}
      ></div>

      <ul className="list-none m-0 p-0">{children}</ul>
    </div>
  );
}
