import React from "react";
import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./appWrapper.style";
import { BRAND } from "../../app/const";

type IAppWrapper = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children: React.ReactNode;
};

const AppWrapper = (props: IAppWrapper) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />
      <main className={classes.main}>{children}</main>
      <Footer brand={BRAND} />
    </Box>
  );
};

export default AppWrapper;
