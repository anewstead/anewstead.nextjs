import "slick-carousel/slick/slick.css";

import React from "react";
import Slider, { Settings as SlickSettings } from "react-slick";
import { useTheme } from "@mui/material";

import PrevNextButton from "./PrevNextButton";
import useStyles from "./Carousel.style";

type ICarousel = {
  slides: JSX.Element[];
  settings?: SlickSettings;
};

const Carousel = (props: ICarousel) => {
  const { slides, settings } = props;

  const theme = useTheme();
  const { classes } = useStyles();

  const defaults: SlickSettings = {
    dots: true,
    lazyLoad: "progressive",
    adaptiveHeight: true,
    prevArrow: <PrevNextButton direction="prev" />,
    nextArrow: <PrevNextButton direction="next" />,
  };

  const config: SlickSettings = {
    ...defaults,
    ...settings,
  };

  const bmargin = config.dots ? theme.spacing(6) : theme.spacing(4);

  return (
    <div className={classes.root} style={{ marginBottom: bmargin }}>
      <Slider {...config} className={classes.slider}>
        {slides}
      </Slider>
    </div>
  );
};

export default Carousel;
