import Image from 'next/image';
import React from 'react';
import { Button, Card, Container, Grid, Link } from '@mui/material';
import { gql } from '@apollo/client';
import { makeStyles } from 'tss-react/mui';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import NextLinkComposed from '../lib/next-mui-link';
import PageLayout from '../containers/page-layout';
import { initializeApollo } from '../lib/apollo-client';

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

export const getStaticProps = async (ctx) => {
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
      '& img': {
        width: 80,
        height: 80,
        [theme.breakpoints.up('sm')]: {
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

const thumbHelper = (allThumbs, checkboxes) => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === 'site';
  }).checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === 'app';
  }).checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === 'banner';
  }).checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === 'site') ||
        (showApps && obj.type === 'app') ||
        (showAds && obj.type === 'banner')
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};

const Home = (props) => {
  // this initial query cached to apollo by server code above
  const { data } = useQuery(THUMB_QUERY);

  const { classes } = useStyles();

  const checkboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const displayThumbs = thumbHelper(data.projects, checkboxes);

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      content = displayThumbs.map((obj, i) => {
        const url = `${baseContentURL}${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={i} className={classes.gridItem}>
            <Card elevation={6}>
              <Button
                component={NextLinkComposed}
                href={`/project/${obj.id}`}
                className={classes.gridItemButton}
              >
                <Image src={url} alt={alt} width={128} height={128} />
              </Button>
            </Card>
          </Grid>
        );
      });
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
