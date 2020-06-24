import * as React from "react";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import GitalkComponent from "gitalk/dist/gitalk-component";

interface IProps {
  title: string;
}

export function Comments({ title = "" }: IProps) {
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
        createIssueManually: true,
      }}
    />
  );
}
