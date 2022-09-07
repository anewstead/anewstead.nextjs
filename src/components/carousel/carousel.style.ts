import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      position: "relative",
      width: "100%",
    },
    slider: {
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      width: "100%",
      marginBottom: theme.spacing(4),
      "& .slick-dots": {
        position: "absolute",
        display: "flex !important", // because slick sets block via js
        width: "100%",
        justifyContent: "center",
        listStyle: "none",
        padding: "0",
        marginTop: theme.spacing(),
        marginBottom: theme.spacing(),
        "& li": {},
        "& button": {
          border: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          borderRadius: "10px",
          height: "20px",
          width: "20px",
          outline: "none",
          lineHeight: "0px",
          fontSize: "0px",
          color: "transparent",
          padding: "0px",
          margin: "0px 2px",
          "&:hover, &:focus": {
            outline: "none",
            backgroundColor: theme.palette.action.focus,
            "&:before": {
              opacity: "0.8",
            },
          },
          "&:before": {
            content: '""',
            borderRadius: "3px",
            height: "6px",
            width: "6px",
            backgroundColor: `${theme.palette.text.primary}`,
            opacity: "0.3",
          },
        },
        "& .slick-active button:before": {
          opacity: "0.8",
        },
      },
      "& .slick-slide": {
        "& > div > *": {
          display: "block !important", // because slick sets inline-block via js
        },
        "& img": {
          width: "100%", // make sure image scales to carousel width
        },
      },
    },
  };
});

export default useStyles;
