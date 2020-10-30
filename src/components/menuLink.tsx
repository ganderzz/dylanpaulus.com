import * as React from "react";
import { Link } from "gatsby";

interface IProps {
  to: string;
  children: any;
}

export function MenuLink({ children, to }: IProps) {
  return (
    <Link
      to={to}
      className="text-white no-underline font-bold text-2xl mr-4 p-4 transition-colors hover:bg-gray-800 hover:text-white"
    >
      {children}
    </Link>
  );
}
