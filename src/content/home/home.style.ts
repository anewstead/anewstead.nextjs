import type { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    indexRoot: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
    gridItem: {
      "& img": {
        width: "80px !important",
        height: "80px !important",
        [theme.breakpoints.up("sm")]: {
          width: "128px !important",
          height: "128px !important",
        },
      },
    },
    gridItemButton: {
      padding: 0,
    },
    info: {
      padding: theme.spacing(4),
    },
  };
});

export default useStyles;
