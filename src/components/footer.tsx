import React from "react";

interface ISocialProps {
  title: string;
  icon: string;
  url: string;
}

const socialMedia: ISocialProps[] = [
  {
    title: "Github",
    icon: "github",
    url: "https://github.com/ganderzz"
  },
  {
    title: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/DylanPaulus"
  },
  {
    title: "Twitch",
    icon: "twitch",
    url: "https://www.twitch.tv/ganderzz"
  }
];

function useIsTwitchStreaming() {
  const [isOnline, setOnlineStatus] = React.useState(false);

  React.useEffect(() => {
    fetch(
      "https://api.twitch.tv/kraken/streams/ganderzz?client_id=lgeux1h60dw3jx2z09cr8puhtw9038"
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (data && data.stream) {
          setOnlineStatus(true);
        }
      });
  }, []);

  return isOnline;
}

export function Footer() {
  const isTwitchStreaming = useIsTwitchStreaming();

  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        margin: "40px auto",
        paddingTop: 20,
        width: "60%",
        textAlign: "center"
      }}
    >
      {socialMedia.map(item => {
        if (item.title === "Twitch") {
          return (
            <a
              style={{ display: "inline-grid", textDecoration: "none" }}
              className="social__icon"
              href={item.url}
              title={item.title}
            >
              <i className={`fab fa-${item.icon}`} />
              <sub
                style={{
                  color: "hsl(0, 0, 30%)",
                  fontSize: "1.2rem"
                }}
              >
                {isTwitchStreaming ? (
                  <strong style={{ color: "hsl(90, 50%, 40%)" }}>Online</strong>
                ) : (
                  <em>Offline</em>
                )}
              </sub>
            </a>
          );
        }

        return (
          <a className="social__icon" href={item.url} title={item.title}>
            <i className={`fab fa-${item.icon}`} />
          </a>
        );
      })}
    </footer>
  );
}
