import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
  return {
    videoRoot: {
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
  const { projectData } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const videoURL = `//drive.google.com/uc?export=download&id=${projectData.view.href}`;
  const posterURL = `${baseContentURL}${projectData.view.poster}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(projectData.info));

  return (
    <Container
      className={classes.videoRoot}
      style={{ maxWidth: `${projectData.view.width}px` }}
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
