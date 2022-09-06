import React from "react";
import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./AppLayout.style";
import type { IRootState } from "../../lib/types";
import { useAppSelector } from "../../lib/store";

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
