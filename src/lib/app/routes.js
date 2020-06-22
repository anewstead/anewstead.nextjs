// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';

// import InFrame from '../../pages/inframe/inframe';
// import About from '../about/about';
// import Gallery from '../gallery/gallery';
// import Home from '../home/home';
// import NoMatch from '../no-match/no-match';
// import Video from '../video/video';

// const Routes = () => {
//   const mainData = useSelector((state) => {
//     return state.app.mainData;
//   });
//   const brand = useSelector((state) => {
//     return state.app.nav.brand;
//   });

//   return (
//     <Switch>
//       <Route
//         path="/project/:id"
//         render={(props) => {
//           const data = mainData.find((obj) => {
//             return obj.id === props.match.params.id;
//           });
//           let content;
//           if (data) {
//             const pageProps = {
//               titleText: data.client,
//               subtitleText: `${data.brand} - ${data.project}`,
//               data,
//               ...props,
//             };
//             switch (data.view.type) {
//               case 'gallery':
//                 content = <Gallery {...pageProps} />;
//                 break;

//               case 'video':
//                 content = <Video {...pageProps} />;
//                 break;

//               case 'iframe':
//                 content = <InFrame {...pageProps} />;
//                 break;

//               default:
//                 content = <NoMatch {...props} />;
//                 break;
//             }
//           } else {
//             content = <NoMatch {...props} />;
//           }
//           return content;
//         }}
//       />

//       <Route
//         path="/about"
//         render={(props) => {
//           return <About titleText={brand} {...props} />;
//         }}
//       />

//       <Route
//         path="/"
//         exact
//         render={(props) => {
//           return <Home headerNav="main" {...props} />;
//         }}
//       />

//       <Route
//         path="*"
//         render={(props) => {
//           return <NoMatch {...props} />;
//         }}
//       ></Route>
//     </Switch>
//   );
// };

// export default Routes;
