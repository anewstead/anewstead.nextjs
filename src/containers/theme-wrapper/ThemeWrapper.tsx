/**
 * ThemeProvider cannot go at _app level as we requires a value from redux
 * i.e can only consume redux below the class that sets the redux provider
 * note however that the EmotionCacheProvider must still be at _app level
 */

import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import themes from "../../lib/theme/theme";
import type { IRootState } from "../../lib/state/types";
import { useAppSelector } from "../../lib/state/redux";

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
