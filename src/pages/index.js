import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Button, Card, Container, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import NextMuiLink from '../lib/nextMuiLink';
import PageLayout from '../containers/page-layout';

const apolloClient = new ApolloClient({
  uri: 'https://anewstead-content.netlify.app/graphql',
});

export const getStaticProps = async (context) => {
  const thumbsQuery = gql`
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
  const res = await apolloClient.query({
    query: thumbsQuery,
  });
  return { props: { data: res.data.projects } };
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
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

const Home = (props) => {
  const classes = useStyles();

  const { data } = props;

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const checkboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const showSites = checkboxes.find((obj) => {
    return obj.id === 'site';
  }).checked;

  const showApps = checkboxes.find((obj) => {
    return obj.id === 'app';
  }).checked;

  const showAds = checkboxes.find((obj) => {
    return obj.id === 'banner';
  }).checked;

  let displayData = [];
  let content = <></>;

  if (data) {
    displayData = data
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

    if (displayData.length) {
      content = displayData.map((obj, i) => {
        const url = `${baseContentURL}img/thumbs/${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={i} className={classes.gridItem}>
            <Card elevation={6}>
              <Button
                component={NextMuiLink}
                href={`/project/[id]`}
                as={`/project/${obj.id}`}
                className={classes.gridItemButton}
              >
                <img src={url} alt={alt} />
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
    <PageLayout headerNav="main">
      <Container className={classes.root}>
        <Grid container spacing={2} justify="center">
          {/* CONTENT */}
          {content}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Home;
