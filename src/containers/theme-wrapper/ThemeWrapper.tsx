/**
 * ThemeProvider cannot go at _app level as we requires a value from redux
 * i.e can only consume redux below the class that sets the redux provider
 * note however that the EmotionCacheProvider must still be at _app level
 */

import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import themes from "../../app/theme/theme";
import type { IRootState } from "../../app/state/types";
import { useAppSelector } from "../../app/state/redux";

type Props = {
  children: React.ReactNode;
};

const ThemeWrapper = (props: Props) => {
  const { children } = props;

  const themeName = useAppSelector((state: IRootState) => {
    return state.app.themeName;
  });

  return (
    <ThemeProvider theme={themes[themeName]}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
