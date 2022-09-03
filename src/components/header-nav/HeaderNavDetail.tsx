import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useStyles from "./headerNavDetail.style";

type IHeaderNavDetail = {
  onThemeClick: () => unknown;
  onBackClick: () => unknown;
  titleText?: string;
  subtitleText?: string;
};

const HeaderNavDetail = (props: IHeaderNavDetail) => {
  const { onThemeClick, onBackClick, titleText, subtitleText } = props;

  const { classes } = useStyles();
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  const backButton = (
    <IconButton edge="end" aria-label="back" onClick={onBackClick} size="large">
      <HomeIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton
      edge="start"
      aria-label="theme"
      onClick={onThemeClick}
      size="large"
    >
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const title = (
    <Typography variant={isXS ? "h6" : "h5"} component="h2">
      {titleText}
    </Typography>
  );

  const subtitle = (
    <Typography variant={isXS ? "h6" : "h5"} component="h3">
      {subtitleText}
    </Typography>
  );

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isXS ? "dense" : "regular"}>
          <Grid container className={classes.gridRoot}>
            <Grid item xs={1} className={classes.gridBack}>
              {backButton}
            </Grid>
            <Grid item xs={11} sm={10} className={classes.gridTitle}>
              {title}
              {subtitle}
            </Grid>

            {isXS ? (
              ""
            ) : (
              <Grid item xs={1} className={classes.gridToggle}>
                {toggleButton}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavDetail;
