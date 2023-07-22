import Image from "next/image";
import { useState } from 'react'
import dynamic from "next/dynamic"
//import Wallet from "./WalletConnect";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@mui/material';
import ApolloExample from "@/graphql/thegraph/apollo";
import logo from '../images/logo.jpg'

export default function Header() {
    return (
      <Box flexGrow={1} >
        <AppBar position="fixed">
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
            <Grid container  spacing={0}>
                <Grid item xs={4} container flexGrow={1} spacing={4}>
                    
                    <Grid item  display="flex" justifyContent={'flex-start'} alignItems={'center'} >
                        
                    </Grid>
                    
                    
                </Grid>
                
                    
            </Grid> 
            
          </Toolbar>
        </AppBar>
      </Box>
    );
  }