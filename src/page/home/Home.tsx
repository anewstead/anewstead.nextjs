import Image from "next/image";
import React from "react";
import { Button, Card, Container, Grid } from "@mui/material";

import AppLayout from "../../containers/app-layout";
import useStyles from "./Home.style";
import type { ICheckbox, IMainData, IRootState } from "../../lib/types";
import { NextLinkComposed } from "../../components/next-mui-link/Link";
import { thumbHelper } from "../../lib/helpers";
import { useAppSelector } from "../../lib/store";

type Props = {
  projects: IMainData[];
};

const Home = (props: Props) => {
  const { projects } = props;
  const { classes } = useStyles();

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });
  const checkboxes = useAppSelector((state: IRootState) => {
    return state.app.nav.checkboxes;
  }) as ICheckbox[];

  const displayThumbs = thumbHelper(projects, checkboxes);

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const url = `${baseContentURL}${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={obj.id} className={classes.gridItem}>
            <Card elevation={6}>
              <Button
                component={NextLinkComposed}
                to={`/project/${obj.id}`}
                className={classes.gridItemButton}
              >
                <Image src={url} alt={alt} width={128} height={128} />
              </Button>
            </Card>
          </Grid>
        );
      });
      content = <>{thumbs}</>;
    } else {
      content = <Card className={classes.info}>Please make a selection</Card>;
    }
  }

  return (
    <AppLayout headerNavType="thumbs">
      <Container className={classes.indexRoot}>
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Home;
