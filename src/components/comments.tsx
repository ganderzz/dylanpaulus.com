import * as React from "react";
import "gitalk/dist/gitalk.css";
import { default as gt } from "gitalk/dist/gitalk-component";

interface IProps {
  title: string;
}

const GitalkComponent = gt as any;

export function Comments({ title = "" }: IProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <GitalkComponent
      options={{
        id: title,
        title: `Comments: ${title}`,
        desc: `Comments for ${title}`,
        clientID: process.env.GATSBY_GITHUB_CLIENT_ID,
        clientSecret: process.env.GATSBY_GITHUB_CLIENT_SECRET,
        repo: process.env.GATSBY_REPOSITORY_URL,
        owner: process.env.GATSBY_GITHUB_OWNER,
        admin: [process.env.GATSBY_GITHUB_OWNER],
        labels: ["discussion", "post"],
      }}
    />
  );
}
