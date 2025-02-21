import { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  error: {
    textAlign: "center",
    padding: 40,
    color: "#d32f2f",
    fontSize: 20,
    fontWeight: "bold",
  },
}));

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("ErrorBoundary caught an error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className={classes.error}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
