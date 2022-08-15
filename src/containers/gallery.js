import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import React from 'react';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Carousel from '../components/carousel';

const useStyles = makeStyles((theme) => {
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

const Gallery = (props) => {
  const { projectData } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const alt = `${projectData.brand} ${projectData.project}`;

  const slides = projectData.view.stills.map((item, i) => {
    const url = `${baseContentURL}${item}`;
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
          {/* INFO */}
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Gallery;
