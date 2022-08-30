import { Button, Container, Paper, Typography } from "@mui/material";
import React from "react";

import { NextLinkComposed } from "../../components/next-mui-link";
import PageLayout from "../../containers/page-layout";
import useStyles from "./noMatch.style";

const NoMatch = () => {
  const { classes } = useStyles();

  return (
    <PageLayout headerNavType="detail">
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
    </PageLayout>
  );
};

export default NoMatch;
