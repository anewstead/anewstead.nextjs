import type { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    brand: {
      display: "flex",
      alignItems: "center",
    },
    gridRoot: {
      minHeight: "80px",
    },
    gridBack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    gridTitle: {
      display: "flex",
      alignItems: "flex-end",
      flexGrow: 4,
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        alignItems: "center",
      },
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  };
});

export default useStyles;
