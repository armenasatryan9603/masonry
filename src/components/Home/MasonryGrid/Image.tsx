import { Link } from "react-router";

import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { Photo } from "@/types/photos";
import useStyles from "../styles";

const LazyImageComponent: React.FC<{
  photo: Photo;
  style: React.CSSProperties;
  columnWidth: number;
}> = ({ photo, style, columnWidth }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "50px",
    threshold: 0,
  });

  const classes = useStyles();

  return (
    <div
      ref={elementRef}
      style={{
        width: columnWidth,
        height: (photo.height * columnWidth) / photo.width,
        ...style,
      }}
    >
      {isIntersecting && (
        <Link to={`/image/${photo.id}`}>
          <img
            className={classes.image}
            src={photo.src.medium}
            alt={photo.alt}
            loading="lazy"
          />
        </Link>
      )}
    </div>
  );
};

export default LazyImageComponent;
