// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://anewstead-content.netlify.app/graphql", // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(),
  });
}

// use to access client in getStaticProps, getStaticPaths, getServerSideProps
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// use to setup <ApolloProvider>
export function useApollo(initialState) {
  const store = useMemo(() => {
    return initializeApollo(initialState);
  }, [initialState]);
  return store;
}
