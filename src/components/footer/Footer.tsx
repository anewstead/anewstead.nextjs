import { Container } from "@mui/material";
import React from "react";

import useStyles from "./footer.style";

type IFooter = {
  brand: string;
};

const Footer = (props: IFooter) => {
  const { brand } = props;

  const { classes } = useStyles();
  const text = `© ${brand || "Brand"} ${new Date().getFullYear()}`;
  return (
    <footer className={classes.footer}>
      <Container>
        <p>{text}</p>
      </Container>
    </footer>
  );
};

export default Footer;
