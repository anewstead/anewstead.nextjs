import React from 'react';
import {
  Button,
  Container,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link as NextLink } from 'next/link';

import PageLayout from '../containers/page-layout';

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

const Error = ({ statusCode }) => {
  const classes = useStyles();

  return (
    <PageLayout>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5">
            {statusCode
              ? `Error ${statusCode} occurred on server`
              : 'An error occurred on client'}
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
