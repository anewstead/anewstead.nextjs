import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
  return {
    videoroot: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    info: {
      padding: theme.spacing(2),
    },
    reactPlayer: {
      marginBottom: theme.spacing(3),
    },
  };
});

const Video = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const videoURL = `//drive.google.com/uc?export=download&id=${data.view.href}`;
  const posterURL = `${baseContentURL}img/poster/${data.view.poster}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  return (
    <Container
      className={classes.videoroot}
      style={{ maxWidth: data.view.width }}
    >
      <video
        className={classes.reactPlayer}
        src={videoURL}
        type="video/mp4"
        width="100%"
        height="auto"
        poster={posterURL}
        controls
        preload="none"
        controlsList="nodownload"
        disablePictureInPicture
      />
      <Paper className={classes.info}>
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

export default Video;
