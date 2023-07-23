'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { NormalizedCacheObject } from "@apollo/client";
import { Select, MenuItem,SelectChangeEvent, Typography } from "@mui/material";
import { polygon, mainnet, celo, avalanche, Chain } from "viem/chains";
import {Box, Grid, AppBar, Toolbar, IconButton, CircularProgress} from "@mui/material";
import logo from '../../images/logo.png'
import Image from "next/image";



type ApolloExampleProps = {
  children: React.ReactNode;
};

const ApolloExample: React.FC<ApolloExampleProps> = ({ children }) => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [chain, setChain] = useState<string>("ethereum");

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

  const handleChange = (event: SelectChangeEvent) => {
    setChain(event.target.value as string);
  };

  return (
    <>
    <Box flexGrow={1}  sx={{background : 'radial-gradient(circle, rgba(245,246,252,1)  0%, rgba(200,168,255,0.5) 60%, rgba(130,71,229,0.2) 90%)'}}>
        <AppBar position="fixed" sx={{background : 'radial-gradient(circle, rgba(245,246,252,1)  0%, rgba(200,168,255,0.5) 60%, rgba(130,71,229,0.2) 90%)'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              
            >
              <Image src={logo} width={50} alt="" />
            </IconButton>
            <Grid container  spacing={0} >
                  <Grid item  display="flex" justifyContent={'flex-start'} alignItems={'center'} >
                    <Typography variant="h4"  >
                            UniExplorer
                        </Typography>
                    </Grid>
                  </Grid>
                    
                    
                    <Grid item  display="flex" justifyContent={'flex-end'} alignItems={'center'} >
                        <div className="chain">


                          <Select
                        labelId=""
                        id=""
                        value={chain}
                        label="ethereum"
                        onChange={ handleChange}
                        
                      >
                        <MenuItem value={"polygon"}>Polygon</MenuItem>
                        <MenuItem value={"ethereum"}>Ethereum</MenuItem>
                        <MenuItem value={"celo"}>Celo</MenuItem>
                        <MenuItem value={"avalanche"}>Avalanche</MenuItem>

                        </Select>
      
                        </div>
                  </Grid>   
          </Toolbar>
        </AppBar>
      </Box>
      <Box >
        <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
      </Box>
      </>
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
    return (
    <div>
      <Grid container spacing={4} marginTop={20} sx={{background : 'radial-gradient(circle, rgba(245,246,252,1)  0%, rgba(200,168,255,0.5) 60%, rgba(130,71,229,0.2) 90%)'}}>
        <Grid item xs={6} display="flex" alignItems={'center'} justifyContent={'flex-end'}>
          <CircularProgress />
        </Grid>
        <Grid item xs={6} display="flex" alignItems={'center'} justifyContent={'flex-start'}>
          <Typography  variant="h4" justifyContent={'center'}>
                      Loading...
          </Typography>
        </Grid>
      </Grid>
      {children}
    </div>);
  }

  return (
    <>
    <ApolloProvider client={client}>{children}</ApolloProvider>
    </>)

}
