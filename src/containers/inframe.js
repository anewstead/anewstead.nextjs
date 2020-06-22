import DOMPurify from 'dompurify';
import React from 'react';
import adBlocker from 'just-detect-adblock';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import withLayout from '../../lib/withLayout';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
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
  const stillURL = `${baseContentURL}${data.view.still}`;
  const alt = `${data.brand} ${data.project}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  let banner;
  if (data.type === 'banner' && adBlocker.isDetected()) {
    banner = (
      <>
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
        <Paper
          style={{
            width: `${data.view.width}px`,
            height: `${data.view.height}px`,
          }}
          className={classes.still}
        >
          <img src={stillURL} alt={alt} />
        </Paper>
      </>
    );
  } else {
    banner = (
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
    <Container className={classes.root} style={{ width: data.view.width }}>
      {/* BANNER */}
      {banner}
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

export default withLayout(InFrame);
