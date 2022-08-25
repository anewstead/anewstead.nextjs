import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import React from "react";

import Gallery from "../../containers/gallery";
import InFrame from "../../containers/in-frame";
import PageLayout from "../../containers/page-layout";
import Video from "../../containers/video";
import { initializeApollo } from "../../lib/apollo-client";
import Error from "../_error";

const PROJECTS_QUERY = gql`
  query {
    projects {
      id
    }
  }
`;

const PROJECT_QUERY = (id) => {
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
export const getStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const id = ctx.params.id;
  await apolloClient.query({
    query: PROJECT_QUERY(id),
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: PROJECTS_QUERY,
  });
  const paths = res.data.projects.map((item) => {
    return {
      params: { id: item.id },
    };
  });
  return { paths, fallback: false };
};
//==================================================

const Project = (props) => {
  const router = useRouter();
  const { id } = router.query;

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

  switch (projectData.view.type) {
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
      const msg = `"unknown page template type: ${projectData.view.type}"`;
      return <Error statusCode={msg}></Error>;
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
