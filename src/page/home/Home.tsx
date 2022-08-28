import { Button, Card, Container, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

import { NextLinkComposed } from "../../components/next-mui-link";
import PageLayout from "../../containers/page-layout";
import { useAppSelector } from "../../lib/store";
import { ICheckbox, IMainData, IRootState, IThumb } from "../../lib/types";
import useStyles from "./Home.style";

const thumbHelper = (
  allThumbs: IThumb[],
  checkboxes: ICheckbox[]
): IThumb[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === "site";
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === "app";
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === "banner";
  })?.checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === "site") ||
        (showApps && obj.type === "app") ||
        (showAds && obj.type === "banner")
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};

type Props = {
  projects: IMainData[];
};

const Home: React.FC<Props> = (props) => {
  const { projects } = props;

  const { classes } = useStyles();

  const checkboxes = useAppSelector((state: IRootState) => {
    return state.app.nav.checkboxes;
  }) as ICheckbox[];

  const displayThumbs = thumbHelper(projects, checkboxes);

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj, i) => {
        const url = `${baseContentURL}${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={i} className={classes.gridItem}>
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
    <PageLayout headerNavType="thumbs">
      <Container className={classes.indexRoot}>
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Home;
