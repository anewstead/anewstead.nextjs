import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import adBlocker from 'just-detect-adblock';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
  return {
    root: {
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
      border: 'none',
      backgroundColor: theme.palette.background.paper,
    },
  };
});

const InFrame = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const iframeURL = `${baseContentURL}${data.view.href}`;
  const stillURL = `${baseContentURL}${data.view.poster}`;
  const alt = `${data.brand} ${data.project}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  let display;

  if (process.browser && data.type === 'banner' && adBlocker.isDetected()) {
    // because this rewrites server rendered content on page load if adblocker is detected
    // we need to tell react the change is intentional by adding suppressHydrationWarning
    display = (
      <>
        <Paper
          suppressHydrationWarning={true}
          style={{
            width: `${data.view.width}px`,
            height: `${data.view.height}px`,
          }}
          className={classes.still}
        >
          <img src={stillURL} alt={alt} />
        </Paper>

        <Paper
          className={classes.info}
          style={{
            width: `${data.view.width}px`,
          }}
        >
          <Typography variant="body2" gutterBottom component="div">
            Ad Blocker Detected, you will need to pause it to view full content
          </Typography>
        </Paper>
      </>
    );
  } else {
    display = (
      <iframe
        title={alt}
        src={iframeURL}
        width={data.view.width}
        height={data.view.height}
        className={classes.iframe}
      />
    );
  }

  return (
    <Container
      className={classes.root}
      style={{ width: data.view.width }}
      suppressHydrationWarning={true}
    >
      {/* DISPLAY */}
      {display}
      <Paper
        className={classes.info}
        style={{
          width: `${data.view.width}px`,
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          align="justify"
        >
          {/* INFO */}
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default InFrame;
