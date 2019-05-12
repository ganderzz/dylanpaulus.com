import * as React from "react";
import { Link } from "@reach/router";

interface IProps {
  to: string;
  children: any;
}

export function MenuLink({ children, to }: IProps) {
  return (
    <Link
      to={to}
      className="text-white no-underline font-bold text-base text-2xl mr-4 p-4 hover:bg-brown hover:text-white"
    >
      {children}
    </Link>
  );
}
