import { useEffect, useState } from "react";

import { Photo } from "@/types/photos";
import { fetchPhoto } from "@services/photoService";
import useStyles from "./styles";

const DetailPhoto: React.FC<{ id?: string }> = ({ id }) => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (id) fetchPhoto(id, setPhoto);
  }, [id]);

  if (!photo) return null;

  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <img className={classes.image} src={photo.src.large} alt={photo.alt} />
      </div>
      <div className={classes.details}>
        <h2 className={classes.title}>{photo.alt}</h2>
        <div>
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.photographer}
          >
            {photo.photographer}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailPhoto;
