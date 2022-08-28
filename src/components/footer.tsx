import { Container } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    footer: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      height: "48px",
    },
  };
});

type IFooter = {
  brand: string;
};

const Footer: React.FC<IFooter> = (props) => {
  const { brand } = props;

  const { classes } = useStyles();
  const copyright = `© ${brand || "Brand"} ${new Date().getFullYear()}`;
  return (
    <footer className={classes.footer}>
      <Container>
        <p>{copyright}</p>
      </Container>
    </footer>
  );
};

export default Footer;
