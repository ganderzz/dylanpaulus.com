import * as React from "react";
import styled from "styled-components";
import { TagsList } from "./tagsList";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import { ReactComponent as ClockIcon } from "../icons/clock.svg";

const Container = styled.aside`
  display: flex;
  align-items: center;

  svg:first-of-type {
    margin-left: 0;
  }
  > svg {
    margin-left: 1.5rem;
    margin-right: 0.5rem;
  }
`;

export function FrontmatterInfo({
  frontmatter,
  timeToRead,
}: {
  frontmatter: any;
  timeToRead: any;
}) {
  return (
    <Container>
      <CalendarIcon style={{ display: "inline-flex" }} />
      {frontmatter.date}
      <ClockIcon style={{ display: "inline-flex" }} />
      {timeToRead}min
      <TagIcon style={{ display: "inline-flex" }} />
      <TagsList tags={frontmatter.tags} />
    </Container>
  );
}
