import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Container, Grid } from "@mui/material";
import Image from "next/image";
import { GetStaticProps, NextPage } from "next/types";
import React from "react";
import { makeStyles } from "tss-react/mui";

import PageLayout from "../containers/page-layout";
import { initializeApollo } from "../lib/apollo-client";
import { NextLinkComposed } from "../lib/next-mui-link";
import { useAppSelector } from "../lib/store";
import { ICheckbox, IRootState, IThumb } from "../lib/types";

const THUMB_QUERY = gql`
  query {
    projects {
      id
      client
      brand
      project
      type
      thumb
      view {
        type
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: THUMB_QUERY,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

const useStyles = makeStyles()((theme) => {
  return {
    indexRoot: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
    gridItem: {
      "& img": {
        width: 80,
        height: 80,
        [theme.breakpoints.up("sm")]: {
          width: 128,
          height: 128,
        },
      },
    },
    gridItemButton: {
      padding: 0,
    },
    info: {
      padding: theme.spacing(4),
    },
  };
});

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

const Home: NextPage = () => {
  // this initial query cached to apollo by server code above
  const { data } = useQuery(THUMB_QUERY);

  const { classes } = useStyles();

  const checkboxes = useAppSelector((state: IRootState) => {
    return state.app.nav.checkboxes;
  }) as ICheckbox[];

  const displayThumbs = thumbHelper(data.projects, checkboxes);

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
