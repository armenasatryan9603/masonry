import { useParams } from "react-router";

import Nav from "@components/Details/Nav";
import DetailPhoto from "@components/Details/DetailPhoto";
import useStyles from "./styles";

const DetailedView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Nav />
      <DetailPhoto id={id} />
    </div>
  );
};

export default DetailedView;
