import Error from 'next/error';
import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import PageLayout from '../../containers/PageLayout';

// ===============================================
// pre-get data and pre-render all pages (static).
// better if a finite sensible amount of infrequently updated pages
// as requires new build if data changes
// note. can only be run from a page
// ===============================================
// export async function getStaticProps(context) {
//   console.log('context');
//   // Call an external API endpoint to get data
//   const url =
//     'https://anewstead-content.netlify.app/.netlify/functions/alldata';
//   const res = await fetch(url);
//   const data = await res.json();

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get data
//   const url =
//     'https://anewstead-content.netlify.app/.netlify/functions/alldata';
//   const res = await fetch(url);
//   const data = await res.json();

//   // Get the paths we want to pre-render based on data
//   const paths = data.map((item) => {
//     return {
//       params: { id: item.id },
//     };
//   });

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }
// ===============================================

// ===============================================
// get data and render page on each request (SSR).
// better if there are lots/frequently changed
// note. can only be run from a page
// ===============================================
export async function getServerSideProps() {
  const url =
    'https://anewstead-content.netlify.app/.netlify/functions/alldata';
  // Fetch data from external API
  const res = await fetch(url);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
// ===============================================

// const dataURL =
//   'https://anewstead-content.netlify.app/.netlify/functions/alldata';

// export const getStaticProps = async (context) => {
//   const res = await fetch(dataURL);
//   const data = await res.json();
//   return { props: { data } };
// };

// export const getStaticPaths = async (props) => {
//   const res = await fetch(dataURL);
//   const data = await res.json();
//   const paths = data.map((item) => {
//     return {
//       params: { id: item.id },
//     };
//   });
//   return { paths, fallback: false };
// };

const Project = (props) => {
  const { data } = props;

  const router = useRouter();
  const { id } = router.query;
  // console.log('router:', router);

  // const mainData = useSelector((state) => {
  //   return state.app.mainData;
  // });
  const mainData = data;

  let content = <></>;
  if (mainData) {
    if (mainData[id]) {
      // console.log('mainData:', mainData);
      content = `project ${id}`;
    } else {
      // console.log('error:', mainData);
      // content = <Error statusCode={404} />;
    }
  } else {
    // console.log('nodata:', mainData);
  }

  // console.log('Project:', mainData);

  return (
    <PageLayout headerNav="detail" data={data}>
      {/* CONTENT */}
      {content}
    </PageLayout>
  );
};

export default Project;
