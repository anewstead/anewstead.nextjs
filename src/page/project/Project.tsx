import React, { Fragment } from "react";
import { Container } from "@mui/material";

import AppLayout from "../../containers/app-layout";
import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import NoMatch from "../no-match";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import useStyles from "./project.style";
import type { IMainData, IRootState } from "../../lib/types";
import { useAppSelector } from "../../lib/store";

type Props = {
  data: IMainData;
};

const Project = (props: Props) => {
  const { data } = props;
  const { classes } = useStyles();

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

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

  switch (`${data.view.type}`) {
    case "gallery": {
      const slides = data.view.stills.map((item: string, i: number) => {
        const url = `${baseContentURL}${item}`;
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
      const videoURL = `//drive.google.com/uc?export=download&id=${data.view.href}`;
      const posterURL = `${baseContentURL}${data.view.poster}`;
      content = <Video videoURL={videoURL} posterURL={posterURL} />;
      break;
    }

    case "iframe": {
      const { width } = data.view;
      const { height } = data.view;
      const iframeURL = `${baseContentURL}${data.view.href}`;
      const failOverImageURL = `${baseContentURL}${data.view.still}`;
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
