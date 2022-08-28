import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import React from "react";

import Gallery from "../../containers/gallery";
import InFrame from "../../containers/in-frame";
import PageLayout from "../../containers/page-layout";
import Video from "../../containers/video";
import { initializeApollo } from "../../lib/apollo-client";
import { IMainData } from "../../lib/types";
import NoMatch from "../404";

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

const Project: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // this initial query cached to apollo by server code above
  const { data } = useQuery(PROJECT_QUERY(id));
  const projectData = data.project;

  const titleText = projectData.client;

  let subtitleText = "";
  if (projectData.brand && projectData.project) {
    subtitleText = `${projectData.brand} - ${projectData.project}`;
  } else if (projectData.brand) {
    subtitleText = projectData.brand;
  } else if (projectData.project) {
    subtitleText = projectData.project;
  }

  let content = <></>;
  console.log("projectData.view.type", projectData.view.type);

  switch (`${projectData.view.type}`) {
    case "gallery":
      content = <Gallery projectData={projectData} />;
      break;

    case "video":
      content = <Video projectData={projectData} />;
      break;

    case "iframe":
      content = <InFrame projectData={projectData} />;
      break;

    default:
      //404 page not found
      return <NoMatch statusCode={404} />;
  }

  return (
    <PageLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      {content}
    </PageLayout>
  );
};

export default Project;
