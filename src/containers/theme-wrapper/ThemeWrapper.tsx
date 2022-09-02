/**
 * ThemeProvider cannot go at _app level as it requires a value from redux
 * i.e cannot consume redux at the same level the redux provider is set (_app)
 */

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

import { useAppSelector } from "../../lib/store";
import themes from "../../lib/themes";
import type { IRootState } from "../../lib/types";

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
