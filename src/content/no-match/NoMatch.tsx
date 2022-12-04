import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";

import AppLayout from "../../wrappers/app-wrapper";
import useStyles from "./noMatch.style";
import { NextLinkComposed } from "../../components/next-mui-link/Link";

const NoMatch = () => {
  const { classes } = useStyles();

  return (
    <AppLayout headerNavType="detail">
      <Container className={classes.f04root}>
        <Paper className={classes.paper}>
          <Typography variant="h3">404 - Page Not Found</Typography>

          <Button
            component={NextLinkComposed}
            to="/"
            className={classes.button}
            size="large"
          >
            Go to Homepage
          </Button>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default NoMatch;
