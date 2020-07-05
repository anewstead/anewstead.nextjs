import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import Error from '../_error';
import Gallery from '../../containers/gallery';
import InFrame from '../../containers/in-frame';
import PageLayout from '../../containers/page-layout';
import Video from '../../containers/video';

const apolloClient = new ApolloClient({
  uri: 'https://anewstead-content.netlify.app/graphql',
});

// SSR
//==================================================
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const projectQuery = gql`
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
        }
      }
    }
  `;
  const res = await apolloClient.query({
    query: projectQuery,
  });
  return { props: { projectData: res.data.project } };
};

export const getStaticPaths = async (props) => {
  const projectsQuery = gql`
    query {
      projects {
        id
      }
    }
  `;
  const res = await apolloClient.query({
    query: projectsQuery,
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
  const { projectData } = props;

  let content = <></>;

  switch (projectData.view.type) {
    case 'gallery':
      content = <Gallery projectData={projectData} />;
      break;

    case 'video':
      content = <Video projectData={projectData} />;
      break;

    case 'iframe':
      content = <InFrame projectData={projectData} />;
      break;

    default:
      const msg = `"unknown page template type: ${projectData.view.type}"`;
      return <Error statusCode={msg}></Error>;
  }

  return (
    <PageLayout headerNavType="detail" projectData={projectData}>
      {/* CONTENT */}
      {content}
    </PageLayout>
  );
};

export default Project;
