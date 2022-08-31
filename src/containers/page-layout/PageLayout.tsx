import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import { useAppSelector } from "../../lib/store";
import themes from "../../lib/themes";
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

  const theme = useAppSelector((state: IRootState) => {
    return state.app.theme;
  });

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Box className={classes.root}>
        <HeaderNav
          navType={headerNavType}
          titleText={headerNavTitle}
          subtitleText={headerNavSubtitle}
        />
        <main className={classes.main}>{children}</main>
        <Footer brand={navBrand} />
      </Box>
    </ThemeProvider>
  );
};

export default PageLayout;
