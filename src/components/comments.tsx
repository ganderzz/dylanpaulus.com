import * as React from "react";
import Gitment from "gitment";

interface IProps {
  title: string;
}

export function Comments({ title = "" }: IProps) {
    const ref = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        const gitment = new Gitment({
            id: title,
            title: `Comments: ${title}`,
            desc: `Comments for ${title}`,
            owner: process.env.GATSBY_GITHUB_OWNER,
            repo: process.env.GATSBY_REPOSITORY_URL,
            oauth: {
              client_id: process.env.GATSBY_GITHUB_CLIENT_ID,
              client_secret: process.env.GATSBY_GITHUB_CLIENT_SECRET,
            },
            labels: ["comments"]
          });

          gitment.render(ref.current);
    }, []);

    return <div ref={ref} />
}