import satori from "satori";

export const generateText = async ({ title, interBold, interRegular }) =>
  await satori(
    <h1
      style={{
        width: "100%",
        marginTop: 160,
        marginLeft: 20,
        marginRight: 20,
        fontSize: title.length < 40 ? 92 : 78,
        fontWeight: 600,
        padding: 20,
        fontSize: title.length > 62 ? 64 : 82,
        color: "#fff",
        textShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        borderTop: "2px solid rgba(255, 255, 255, 0.2)",
      }}>
      {title}
    </h1>,
    {
      height: 630,
      width: 1180,
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
