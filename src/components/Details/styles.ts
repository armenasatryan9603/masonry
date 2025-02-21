import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "15px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #e0e0e0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  backButton: {
    width: 24,
    height: 24,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "#333",
  },
  link: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    maxHeight: 400,
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  details: {
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
    color: "#333",
  },
  photographer: {
    fontSize: 16,
    color: "#007aff",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease-in-out",
    "&:hover": {
      color: "#0056b3",
    },
  },
}));

export default useStyles;
