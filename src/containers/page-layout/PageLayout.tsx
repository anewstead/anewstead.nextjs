import { Box } from "@mui/material";
import React from "react";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import { useAppSelector } from "../../lib/store";
import { IRootState } from "../../lib/types";
import useStyles from "./pageLayout.style";

type IPageLayout = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children: React.ReactNode;
};

const PageLayout = (props: IPageLayout) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  return (
    <Box className={classes.root}>
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />
      <main className={classes.main}>{children}</main>
      <Footer brand={navBrand} />
    </Box>
  );
};

export default PageLayout;
