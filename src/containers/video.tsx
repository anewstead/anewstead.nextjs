import { Container, Paper, Typography } from "@mui/material";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import { makeStyles } from "tss-react/mui";

import { useAppSelector } from "../lib/store";
import { IMainData, IRootState } from "../lib/types";

const useStyles = makeStyles()((theme) => {
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

type Props = {
  projectData: IMainData;
};

const Video: React.FC<Props> = (props) => {
  const { projectData } = props;

  const { classes } = useStyles();

  const baseContentURL = useAppSelector((state: IRootState) => {
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
        width="100%"
        height="auto"
        poster={posterURL}
        controls
        preload="none"
        controlsList="nodownload"
        disablePictureInPicture
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <Paper className={classes.info}>
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

export default Video;
