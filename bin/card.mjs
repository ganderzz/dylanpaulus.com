import satori from "satori";

export const generateCard = async ({ title, interBold, interRegular }) =>
  await satori(
    <div
      style={{
        fontFamily: "Inter",
        height: "100%",
        width: "100%",
        display: "flex",
        padding: 10,
        background:
          "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
      }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontSize: 32,
          background:
            "linear-gradient(342deg, rgba(42,53,70,1) 0%, rgba(60,73,94,1) 100%)",
          color: "#fff",
        }}>
        <h1
          style={{
            width: "100%",
            marginTop: 160,
            marginLeft: 20,
            marginRight: 20,
            fontSize: title.length < 40 ? 92 : 78,
            fontWeight: 600,
            padding: 20,
            borderTop: "2px solid rgba(255, 255, 255, 0.2)",
          }}>
          {title}
        </h1>
      </div>
    </div>,
    {
      height: 630,
      width: 1200,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
