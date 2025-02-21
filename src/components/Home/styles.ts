import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#081b0c",
    padding: 10,
    top: 0,
    left: 0,
    zIndex: 2,
  },
  input: {
    width: 400,
    borderRadius: 8,
    padding: 10,
  },
  message: {
    lineHeight: 32,
    color: "white",
    backgroundColor: "#344337",
    display: "flex",
    justifyContent: "center",
    fontSize: "16px",
  },
  masonry: {
    position: "relative",
    width: "100%",
    maxWidth: 500,
    marginInline: "auto",
    height: (props: { maxHeight: number }) => props?.maxHeight,
    top: 80,
    left: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
  },
});

export default useStyles;
