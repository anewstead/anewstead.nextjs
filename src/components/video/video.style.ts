import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      marginBottom: theme.spacing(3),
    },
  };
});

export default useStyles;
