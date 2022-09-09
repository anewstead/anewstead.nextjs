/**
 * ThemeProvider cannot go at _app level as we requires a value from redux
 * i.e can only consume redux below the class that sets the redux provider
 * note however that the EmotionCacheProvider must still be at _app level
 */

import React, { useEffect } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import themes from "../../app/theme/theme";
import {
  INIT_THEME,
  useAppDispatch,
  useAppSelector,
} from "../../app/state/redux";
import type { IRootState } from "../../app/state/types";

type Props = {
  children: React.ReactNode;
};

const ThemeWrapper = (props: Props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const themeName = useAppSelector((state: IRootState) => {
    return state.app.themeName;
  });

  useEffect(() => {
    dispatch(INIT_THEME());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes[themeName]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
