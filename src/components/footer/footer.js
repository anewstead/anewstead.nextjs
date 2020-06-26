import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      height: '48px',
    },
  };
});

const Footer = (props) => {
  const { brand } = props;

  const classes = useStyles();
  const copyright = `© ${brand || 'Brand'} ${new Date().getFullYear()}`;
  return (
    <footer className={classes.footer}>
      <Container>
        <p>
          {/* COPYRIGHT */}
          {copyright}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
