import { Box, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";

import Footer from "../components/footer";
import { useAppSelector } from "../lib/store";
import themes from "../lib/themes";
import { IRootState } from "../lib/types";
import HeaderNav from "./header-nav";

const useStyles = makeStyles()((theme) => {
  return {
    layoutRoot: {
      /*
      mobile height bug fix:
      100vh on mobile pushes page bottom/footer too low
      -webkit-fill-available doesn't work for short pages in chrome desktop
      solution: all containing elements leading to our app must have height 100%
      html > body > root (> app)
      our app then uses min-height so is responsible for overflow scroll
      on mobile we need to set min-height 100.1%
      so any short pages can still be pulled-to-refresh in chrome mobile
      */
      minHeight: "100.1%",
      [theme.breakpoints.up("sm")]: {
        minHeight: "100%",
      },

      minWidth: "320px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flexGrow: 1,
      display: "flex",
    },
  };
});

type Props = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = (props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  const theme = useAppSelector((state: IRootState) => {
    return state.app.theme;
  });

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  //https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes[theme]}>
        <CssBaseline />
        <Box className={classes.layoutRoot}>
          <HeaderNav
            navType={headerNavType}
            titleText={headerNavTitle}
            subtitleText={headerNavSubtitle}
          />
          <main className={classes.main}>{children}</main>
          <Footer brand={navBrand} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PageLayout;
