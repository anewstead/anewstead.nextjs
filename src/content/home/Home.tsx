import Image from "next/image";
import React, { useMemo } from "react";
import { Button, Card, Container, Grid } from "@mui/material";

import AppLayout from "../../wrappers/app-wrapper";
import useStyles from "./home.style";
import { BASE_CONTENT_URL } from "../../core/const";
import type { ICheckbox } from "../../core/state/home/state";
import type { IMainData } from "../../core/state/main-data/state";
import { NextLinkComposed } from "../../components/next-mui-link/Link";
import type { RootState } from "../../core/state/store";
import { thumbHelper } from "../../core/state/home/helpers";
import { useAppSelector } from "../../core/state/store";

type Props = {
  projects: IMainData[];
};

const Home = (props: Props) => {
  const { projects } = props;
  const { classes } = useStyles();

  const checkboxes = useAppSelector((state: RootState) => {
    return state.home.nav.checkboxes;
  }) as ICheckbox[];

  const displayThumbs = useMemo(() => {
    return thumbHelper(projects, checkboxes);
  }, [projects, checkboxes]);

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const url = `${BASE_CONTENT_URL}${obj.thumb}`;
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
