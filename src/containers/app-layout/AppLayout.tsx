import React from "react";
import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./appLayout.style";
import type { IRootState } from "../../app/state/types";
import { useAppSelector } from "../../app/state/redux";

type IAppLayout = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children: React.ReactNode;
};

const AppLayout = (props: IAppLayout) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  const { classes } = useStyles();

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

export default AppLayout;
