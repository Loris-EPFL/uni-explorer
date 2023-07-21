import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import React from "react";
import * as ReactDOM from "react-dom/client";

const polygonClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  // Replace this with your actual GraphQL API endpoint
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={polygonClient}>{children}</ApolloProvider>;
}

export default polygonClient;
