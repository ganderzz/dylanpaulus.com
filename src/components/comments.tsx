import * as React from "react";
import Gitment from "gitment";

export function Comments() {
    const ref = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        const gitment = new Gitment({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.REPOSITORY_URL,
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