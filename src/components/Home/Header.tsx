import useStyles from "./styles";

type HeaderProps = {
  query: string;
  setQuery: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <input
        className={classes.input}
        value={query}
        name="searchQuery"
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder="Search string here"
      />
    </div>
  );
};

export default Header;
