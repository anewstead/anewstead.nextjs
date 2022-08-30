import { Paper, Typography } from "@mui/material";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

import useStyles from "./textBlock.style";

type ITextBlock = {
  htmlText: string;
};
const TextBlock: React.FC<ITextBlock> = (props) => {
  const { htmlText } = props;

  const { classes } = useStyles();

  // safelySetInnerHTML :)
  const html = parse(DOMPurify.sanitize(htmlText));

  return (
    <Paper className={classes.root}>
      <Typography variant="body2" gutterBottom component="div" align="justify">
        {html}
      </Typography>
    </Paper>
  );
};

export default TextBlock;
