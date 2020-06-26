import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import Error from '../_error';
import Gallery from '../../containers/gallery';
import InFrame from '../../containers/inframe';
import PageLayout from '../../containers/page-layout';
import Video from '../../containers/video';

const apolloClient = new ApolloClient({
  uri: 'https://anewstead-content.netlify.app/graphql',
});

//==================================================
// SSR per request
//==================================================
// export async function getServerSideProps(context) {
//   const id = context.params.id;
//   const projectQuery = gql`
//     query {
//       project(id:${id}) {
//         id
//         client
//         brand
//         project
//         type
//         thumb
//         view {
//           type
//         }
//       }
//     }
//   `;
//   const res = await apolloClient.query({
//     query: projectQuery,
//   });
//   return { props: { data: res.data.project } };
// }
//==================================================

//==================================================
// Pre render static pages
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
  return { props: { data: res.data.project } };
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
  const { data } = props;

  const pageProps = {
    titleText: data.client,
    subtitleText: `${data.brand} - ${data.project}`,
    data,
    ...props,
  };

  let content = <></>;

  switch (data.view.type) {
    case 'gallery':
      content = <Gallery {...pageProps} />;
      break;

    case 'video':
      content = <Video {...pageProps} />;
      break;

    case 'iframe':
      content = <InFrame {...pageProps} />;
      break;

    default:
      const msg = `"unknown page template type: ${data.view.type}"`;
      return <Error statusCode={msg}></Error>;
  }

  return (
    <PageLayout headerNav="detail" data={data}>
      {/* CONTENT */}
      {content}
    </PageLayout>
  );
};

export default Project;
