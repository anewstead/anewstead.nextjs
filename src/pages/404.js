import React from 'react';
import {
  Button,
  Container,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link as NextLink } from 'next/link';

import PageLayout from '../containers/PageLayout';

const useStyles = makeStyles((theme) => {
  return {
    root: {
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
const NoMatch = (props) => {
  const classes = useStyles();

  return (
    <PageLayout>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h3">404 - Page Not Found</Typography>
          <Typography variant="h4">
            <code>PAGE</code>
          </Typography>
          <Button
            component={NextLink}
            href="/"
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
