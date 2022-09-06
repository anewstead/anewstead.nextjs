import "slick-carousel/slick/slick.css";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import React from "react";
import { Button } from "@mui/material";

import useStyles from "./PrevNextButton.style";

type Props = {
  direction: string;
  onClick?: () => void;
};

const PrevNextButton = (props: Props) => {
  const { direction, onClick } = props;

  const { classes } = useStyles();

  return (
    <Button
      className={`${classes.prevNextButton} ${
        direction === "prev" ? classes.prevButton : classes.nextButton
      }`}
      onClick={onClick}
      aria-label={`${direction}`}
    >
      <div className="carousel-slidebutton-icon-wrapper">
        <ArrowBackIosNewRoundedIcon fontSize="large" />
      </div>
    </Button>
  );
};

export default PrevNextButton;
