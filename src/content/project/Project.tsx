import React, { Fragment } from "react";
import { Container } from "@mui/material";

import AppLayout from "../../wrappers/app-wrapper";
import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import NoMatch from "../no-match";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import useStyles from "./project.style";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../core/const";
import type { IMainData } from "../../core/state/main-data/state";

type Props = {
  data: IMainData;
};

const Project = (props: Props) => {
  const { data } = props;
  const { classes } = useStyles();

  const titleText = data.client;

  let subtitleText = "";
  if (data.brand && data.project) {
    subtitleText = `${data.brand} - ${data.project}`;
  } else if (data.brand) {
    subtitleText = data.brand;
  } else if (data.project) {
    subtitleText = data.project;
  }

  let content = <></>;

  switch (data.view.type) {
    case "gallery": {
      const slides = data.view.stills.map((item: string, i: number) => {
        const url = `${BASE_CONTENT_URL}${item}`;
        const alt = `${data.brand} ${data.project} image ${i}`;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`${alt} ${i}`} />
          </Fragment>
        );
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case "video": {
      const videoURL = `${BASE_VIDEO_URL}${data.view.href}`;
      const posterURL = `${BASE_CONTENT_URL}${data.view.poster}`;
      content = <Video videoURL={videoURL} posterURL={posterURL} />;
      break;
    }

    case "iframe": {
      const { width } = data.view;
      const { height } = data.view;
      const iframeURL = `${BASE_CONTENT_URL}${data.view.href}`;
      const failOverImageURL = `${BASE_CONTENT_URL}${data.view.still}`;
      const title = `${data.brand} ${data.project}`;
      const checkAdBlock = data.type === "banner";
      content = (
        <InFrame
          title={title}
          width={width}
          height={height}
          iframeURL={iframeURL}
          failOverImageURL={failOverImageURL}
          checkAdBlock={checkAdBlock}
        />
      );
      break;
    }

    default:
      return <NoMatch />;
  }

  return (
    <AppLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      <Container className={classes.root} style={{ maxWidth: data.view.width }}>
        {content}
        <TextBlock htmlText={data.info} />
      </Container>
    </AppLayout>
  );
};

export default Project;
