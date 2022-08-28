import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { GetStaticProps, NextPage } from "next/types";
import React from "react";

import { initializeApollo } from "../lib/apollo";
import Home from "../page/home";

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

const HomePage: NextPage = () => {
  // this initial query cached to apollo by server code above
  const { data } = useQuery(THUMB_QUERY);

  return <Home projects={data.projects} />;
};

export default HomePage;
