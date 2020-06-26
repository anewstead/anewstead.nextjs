import React from 'react';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

import PageLayout from '../containers/page-layout';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
  };
});

const About = (props) => {
  const classes = useStyles();

  return (
    <PageLayout headerNav="detail">
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2">
            About
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component="div"
            align="justify"
          >
            <p>Frontend/UI/UX developer with over 20 years experience.</p>
            <p>
              This portfolio shows some of the productions I have been involved
              with over the years as sole or lead developer or with significant
              hands-on input as a senior team member.
            </p>
            <p>
              This site was written in React and Redux (hooks) as a single page
              application using Create-React-App for a webpack setup and
              Material-UI components for a quick start, in my commercial work
              everything is typically created bespoke from scratch. <br />
              You are welcome to view the source code at this{' '}
              <a
                href="https://github.com/anewstead/anewstead.cra-mui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git repository
              </a>
              .
            </p>
          </Typography>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default About;
