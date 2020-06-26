import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import parse from 'html-react-parser';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Carousel from '../components/carousel/carousel';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    info: {
      padding: theme.spacing(2),
    },
  };
});

const Gallery = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const alt = `${data.brand} ${data.project}`;

  const slides = data.view.stills.map((obj, i) => {
    const url = `${baseContentURL}img/gallery/${obj}`;
    return <img src={url} alt={`${alt} ${i}`} key={obj} />;
  });

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  return (
    <Container className={classes.root} style={{ maxWidth: data.view.width }}>
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
