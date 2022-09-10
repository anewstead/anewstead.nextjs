import Image from "next/image";
import React, { useMemo } from "react";
import { Button, Card, Container, Grid } from "@mui/material";

import AppLayout from "../../containers/app-layout";
import useStyles from "./home.style";
import { BASE_CONTENT_URL } from "../../app/const";
import type { ICheckbox } from "../../app/state/slice/homeState";
import type { IMainData } from "../../app/state/slice/mainDataState";
import { NextLinkComposed } from "../../components/next-mui-link/Link";
import type { RootState } from "../../app/state/store";
import { thumbHelper } from "../../app/state/slice/homeHelpers";
import { useAppSelector } from "../../app/state/store";

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
