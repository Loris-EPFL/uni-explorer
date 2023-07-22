import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { NormalizedCacheObject } from "@apollo/client";


type ApolloExampleProps = {
  children: React.ReactNode;
};

const ApolloExample: React.FC<ApolloExampleProps> = ({ children }) => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [chain, setChain] = useState<string>("polygon");

  useEffect(() => {
    let newClient: ApolloClient<NormalizedCacheObject> | null = null;

    if (chain === "polygon") {
      console.log("polygon");
      newClient = new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
        cache: new InMemoryCache(),
      });
    } else if (chain === "ethereum") {
      console.log("Ethereum");
      newClient = new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
        cache: new InMemoryCache(),
      });
    } else if (chain === "celo") {
      console.log("celo");
      newClient = new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo",
        cache: new InMemoryCache(),
      });
    } else if (chain === "avalanche") {
      console.log("avalanche");
      newClient = new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-avax",
        cache: new InMemoryCache(),
      });
    }
    setClient(newClient);
  }, [chain]);

  const handleChainChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setChain(event.target.value);
  };

  return (
    <div className="chain">
      <select name="" id="" value={chain} onChange={handleChainChange}>
        <option value="polygon">Polygon</option>
        <option value="ethereum">Ethereum</option>
        <option value="celo">Celo</option>
        <option value="avalanche">Avalanche</option>
      </select>
      <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
    </div>
  );
};

export default ApolloExample;

type ApolloClientProviderProps = {
  children: React.ReactNode;
  client: ApolloClient<NormalizedCacheObject> | null;
};

export function ApolloClientProvider({
  children,
  client,
}: ApolloClientProviderProps) {
  if (!client) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
