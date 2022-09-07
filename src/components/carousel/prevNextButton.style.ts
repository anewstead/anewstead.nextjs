import { Theme } from "@mui/material";
import { isMobile } from "react-device-detect";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    prevNextButton: {
      position: "absolute",
      zIndex: "1",
      top: "0",
      height: "100%",
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      opacity: "0",
      "&:hover, &:focus-visible": {
        opacity: `${isMobile ? "0" : "1"}`,
      },
      "& div:first-of-type": {
        padding: "12px",
        display: "flex",
        position: "relative",
        "&:before": {
          content: '""',
          borderRadius: "36px",
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
          position: "absolute",
          top: "0",
          left: "0",
          opacity: "0.6",
        },
      },
      "& .MuiSvgIcon-root": {
        zIndex: "1",
      },
      "& .MuiTouchRipple-root": {
        opacity: "0.1",
        backgroundColor: theme.palette.background.paper,
      },
    },
    prevButton: {
      left: "0",
    },
    nextButton: {
      right: "0",
      "& svg": {
        transform: "rotate(180deg)",
      },
    },
  };
});

export default useStyles;
