import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    f04root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(4),
      border: `solid 1px ${theme.palette.text.primary}`,
    },
  };
});

export default useStyles;
