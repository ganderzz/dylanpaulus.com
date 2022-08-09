import * as React from "react";
import { Link } from "gatsby";

interface IProps {
  to: string;
}

export const MenuLink = ({ children, to }: React.PropsWithChildren<IProps>) => {
  return (
    <Link
      to={to}
      activeClassName="bg-gray-700 bg-opacity-50 text-opacity-100"
      className="rounded text-white no-underline font-bold text-2xl mr-4 p-4 transition-colors hover:bg-gray-800 hover:text-white text-opacity-75"
    >
      {children}
    </Link>
  );
};
