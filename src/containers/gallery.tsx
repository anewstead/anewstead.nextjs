import { Container, Paper, Typography } from "@mui/material";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import { makeStyles } from "tss-react/mui";

import Carousel from "../components/carousel";
import { useAppSelector } from "../lib/store";
import { IMainData } from "../lib/types";

const useStyles = makeStyles()((theme) => {
  return {
    galleryRoot: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    info: {
      padding: theme.spacing(2),
    },
  };
});

type Props = {
  projectData: IMainData;
};

const Gallery: React.FC<Props> = (props) => {
  const { projectData } = props;

  const { classes } = useStyles();

  const baseContentURL = useAppSelector((state) => {
    return state.app.baseContentURL;
  });

  const alt = `${projectData.brand} ${projectData.project}`;

  const slides = projectData.view.stills.map((item, i) => {
    const url = `${baseContentURL}${item}`;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={`${alt} ${i}`} key={item} />;
  });

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(projectData.info));

  return (
    <Container
      className={classes.galleryRoot}
      style={{ maxWidth: `${projectData.view.width}px` }}
    >
      <Carousel slides={slides} />
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

export default Gallery;
