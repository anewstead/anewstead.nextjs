import { Container } from "@mui/material";
import React from "react";

import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import PageLayout from "../../containers/page-layout";
import { useAppSelector } from "../../lib/store";
import { IMainData, IRootState } from "../../lib/types";
import NoMatch from "../no-match";
import useStyles from "./project.style";

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
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={url} alt={`${alt} ${i}`} key={i} />;
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
      const width = data.view.width;
      const height = data.view.height;
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
    <PageLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      <Container className={classes.root} style={{ maxWidth: data.view.width }}>
        {content}
        <TextBlock htmlText={data.info} />
      </Container>
    </PageLayout>
  );
};

export default Project;
