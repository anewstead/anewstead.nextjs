import { Button, Container, Paper, Typography } from "@mui/material";
import { NextPage } from "next/types";
import React from "react";
import { makeStyles } from "tss-react/mui";

import PageLayout from "../containers/page-layout";
import { NextLinkComposed } from "../lib/next-mui-link";

const useStyles = makeStyles()((theme) => {
  return {
    f04root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(4),
      border: `solid 1px ${theme.palette.text.primary}`,
    },
  };
});

type Props = {
  statusCode?: number;
};

const NoMatch: NextPage<Props> = () => {
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
