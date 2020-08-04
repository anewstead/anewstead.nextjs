import React from 'react';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

import PageLayout from '../containers/page-layout';

const useStyles = makeStyles((theme) => {
  return {
    aboutroot: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
  };
});

const About = () => {
  const classes = useStyles();

  const data = {
    brand: 'Andrew Newstead',
  };

  return (
    <PageLayout headerNav="detail" data={data}>
      <Container className={classes.aboutroot}>
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
            <p>Frontend/UI/UX developer</p>
            <p>
              This portfolio shows some of the productions I have had
              significant hands on involvement either as sole developer, lead
              developer or as a senior team member.
            </p>
            <p>
              This site was written in React (hooks) with Next.js for
              server-side rendering and GraphQL for data. It also uses
              Material-UI components for a quick start, in my commercial work
              components are typically created bespoke from scratch. <br />
            </p>
            <p>
              You can view the source code at this{' '}
              <a
                href="https://github.com/anewstead/anewstead.nextjs"
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
