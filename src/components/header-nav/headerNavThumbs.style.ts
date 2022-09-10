import type { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brandButton: {
      // textAlign: "left",
    },
    gridBrand: {
      display: "flex",
      alignItems: "center",
    },
    gridRoot: {
      minHeight: "80px",
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      maxHeight: "80px",
    },
    gridCheckboxesOpen: {
      display: "flex",
      justifyContent: "center",
    },
    expansionPanel: {
      backgroundColor: "unset",
      boxShadow: "unset",
      width: "100%",
    },
    expansionPanelSummaryContent: {
      margin: "0 !important",
    },
    expansionPanelSummaryRoot: {
      minHeight: "80px !important",
    },
  };
});

export default useStyles;
