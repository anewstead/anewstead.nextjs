import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    footer: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      height: "48px",
    },
  };
});

export default useStyles;
