import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

interface IProps {
  to: string;
}

const MenuLinkItem = styled(Link)`
  font-size: 1.4rem;
  padding: 0 12px;
  text-decoration: none;
  color: ${(props) => props.theme.header.font};
`;

export function MenuLink({ children, to }: React.PropsWithChildren<IProps>) {
  return <MenuLinkItem to={to}>{children}</MenuLinkItem>;
}
