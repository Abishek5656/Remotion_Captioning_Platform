export const getCaptionStyle = (style) => {
  switch (style) {
    case "top":
      return {
        position: "absolute",
        top: "5%",
        width: "100%",
        textAlign: "center",
        fontSize: 42,
        color: "white",
        textShadow: "0 2px 6px black",
      };

    case "karaoke":
      return {
        position: "absolute",
        bottom: "10%",
        width: "100%",
        textAlign: "center",
        fontSize: 48,
        color: "#FFD700",
        textShadow: "0 2px 8px black",
      };

    default: // bottom
      return {
        position: "absolute",
        bottom: "5%",
        width: "100%",
        textAlign: "center",
        fontSize: 42,
        color: "white",
        textShadow: "0 2px 6px black",
      };
  }
};
