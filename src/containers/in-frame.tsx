import { Container, Paper, Typography } from "@mui/material";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import adBlocker from "just-detect-adblock";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    inFrameRoot: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
      padding: 0,
    },
    info: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    still: {
      marginBottom: theme.spacing(3),
    },
    iframe: {
      marginBottom: theme.spacing(3),
      border: "none",
      backgroundColor: theme.palette.background.paper,
    },
  };
});

const InFrame = (props) => {
  const { projectData } = props;

  const { classes } = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const iframeURL = `${baseContentURL}${projectData.view.href}`;
  const stillURL = `${baseContentURL}${projectData.view.adblock}`;
  const alt = `${projectData.brand} ${projectData.project}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(projectData.info));

  let mainContent;

  if (
    process.browser &&
    projectData.type === "banner" &&
    adBlocker.isDetected()
  ) {
    // because this rewrites server rendered content on page load if adblocker is detected
    // we need to tell react the change is intentional by adding suppressHydrationWarning
    mainContent = (
      <>
        <Paper
          suppressHydrationWarning={true}
          style={{
            width: `${projectData.view.width}px`,
            height: `${projectData.view.height}px`,
          }}
          className={classes.still}
        >
          <Image
            src={stillURL}
            alt={alt}
            width={projectData.view.width}
            height={projectData.view.height}
          />
        </Paper>
        <Paper
          className={classes.info}
          style={{
            width: `${projectData.view.width}px`,
          }}
        >
          <Typography variant="body2" gutterBottom component="div">
            Ad Blocker Detected, you will need to pause it to view full content
          </Typography>
        </Paper>
      </>
    );
  } else {
    mainContent = (
      <iframe
        title={alt}
        src={iframeURL}
        width={projectData.view.width}
        height={projectData.view.height}
        className={classes.iframe}
      />
    );
  }

  return (
    <Container
      className={classes.inFrameRoot}
      style={{ width: `${projectData.view.width}px` }}
      suppressHydrationWarning={true}
    >
      {mainContent}
      <Paper
        className={classes.info}
        style={{
          width: `${projectData.view.width}px`,
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          align="justify"
        >
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default InFrame;
