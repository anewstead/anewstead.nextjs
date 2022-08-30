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
    <>
      <video
        className={classes.root}
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
    </>
  );
};

export default Video;
