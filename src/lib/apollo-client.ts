// https://github.com/vercel/next.js/tree/canary/examples/with-apollo-and-redux

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";

type InitialState = NormalizedCacheObject | null;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://anewstead-content.netlify.app/graphql", // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: InitialState = null) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => {
        return [
          ...sourceArray,
          ...destinationArray.filter((d) => {
            return sourceArray.every((s) => {
              return !isEqual(d, s);
            });
          }),
        ];
      },
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: InitialState) {
  const store = useMemo(() => {
    return initializeApollo(initialState);
  }, [initialState]);
  return store;
}
