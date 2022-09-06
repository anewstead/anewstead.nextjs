/* eslint-disable react/no-unknown-property */
import React from "react";

import useStyles from "./video.style";

type IVideo = {
  videoURL: string;
  posterURL: string;
};

const Video = (props: IVideo) => {
  const { videoURL, posterURL } = props;

  const { classes } = useStyles();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className={classes.root}
      width="100%"
      height="auto"
      poster={posterURL}
      controls
      preload="none"
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
    >
      <source src={videoURL} type="video/mp4" />
    </video>
  );
};

export default Video;
