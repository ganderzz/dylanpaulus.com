import * as React from "react";
import { TagsList } from "./tagsList";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import { ReactComponent as ClockIcon } from "../icons/clock.svg";

export function FrontmatterInfo({ frontmatter, timeToRead }: { frontmatter: any; timeToRead: any }) {
  return (
    <span className="opacity-75 text-base flex items-center hidden md:block md:pb-1">
      <CalendarIcon className="mr-2" style={{ display: "inline-flex" }} />
      {frontmatter.date}
      <TagIcon className="mr-2 ml-8" style={{ display: "inline-flex" }} />
      <TagsList className="sm:inline block" tags={frontmatter.tags} />
      <ClockIcon className="mr-2 ml-4" style={{ display: "inline-flex" }} />
      {timeToRead}min
    </span>
  );
}
