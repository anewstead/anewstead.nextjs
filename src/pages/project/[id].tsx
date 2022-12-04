import React from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import Project from "../../content/project";
import type { IMainData } from "../../core/state/main-data/state";
import { initializeApollo } from "../../core/services/apollo";

const PROJECTS_QUERY = gql`
  query {
    projects {
      id
    }
  }
`;

const PROJECT_QUERY = (id: string) => {
  return gql`
    query {
      project(id:${id}) {
        client
        brand
        project
        type
        info
        view {
          type
          width
          height
          href
          poster
          stills
          adblock
        }
      }
    }
  `;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const id = context?.params?.id;
  await apolloClient.query({
    query: PROJECT_QUERY(id as string),
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: PROJECTS_QUERY,
  });
  const paths = res.data.projects.map((item: IMainData) => {
    return {
      params: { id: item.id },
    };
  });
  return { paths, fallback: false };
};

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // this initial query cached to apollo by SSR code above
  const { data } = useQuery(PROJECT_QUERY(id));

  return <Project data={data.project} />;
};

export default ProjectPage;
