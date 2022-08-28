import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import React from "react";

import { initializeApollo } from "../../lib/apollo";
import { IMainData } from "../../lib/types";
import Project from "../../page/project";

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

// server side
//==================================================
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
//==================================================

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // this initial query cached to apollo by server code above
  const { data } = useQuery(PROJECT_QUERY(id));

  return <Project data={data.project} />;
};

export default ProjectPage;
