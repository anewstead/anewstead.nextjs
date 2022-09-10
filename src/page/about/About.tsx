import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

import AppLayout from "../../containers/app-layout";
import useStyles from "./about.style";
import { BRAND } from "../../app/const";

const About = () => {
  const { classes } = useStyles();

  return (
    <AppLayout headerNavType="detail" headerNavTitle={BRAND}>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2">
            About
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component={Box}
            align="justify"
          >
            <p>Frontend/UI/UX developer</p>
            <p>
              This site shows some of the productions I have been involved with
              over the years.
            </p>
            <p>
              It also serves to show some non-client code, which in brief is
              React and Typescript. <br />
            </p>
            <p>
              It uses Material-UI components basically becasue I wanted to try
              it out.
              <br />
              In client work all components and CSS were almost entirely created
              bespoke from scratch.
            </p>
            <p>You can get all your tech insights here:</p>
            <p>
              <a
                href="https://github.com/anewstead/anewstead.cra-mui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git: SPA React
              </a>
              <br />
              <a
                href="https://github.com/anewstead/anewstead.nextjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git: SSR NextJS
              </a>
            </p>
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default About;
