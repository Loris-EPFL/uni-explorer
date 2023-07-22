"use client"

import styles from './page.module.css'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import { ApolloClientProvider } from "@/graphql/thegraph/apollo";
import QueryComponent from "../components/query-component";
import Alert from '@mui/material/Alert';
import ApolloExample from "@/graphql/thegraph/apollo";
import Header from '@/components/header';
import { Grid } from '@mui/material';

export default function Home() {
  const [id, setId] = useState("");
  const [gqlInput, setGqlInput] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    // Check if the input is a valid number
    if (isNaN(parseInt(id))) {
      setError('Invalid input, please enter a valid number');
      return;
    }

    console.log(id);
    setError('');
    setGqlInput(id);
  };

  const handleInputChange = (event : any) => {
    setId(event.target.value);
  };

  return (
    <>
    <ApolloExample>
      
      <main className={styles.main}>
        <Grid  container
                                                
                                                spacing={4}
                                                >
        <Grid item display="flex"
                  xs={6}
                   justifyContent={'flex-end'}
                    alignItems={'center'}>
          <TextField
            id="outlined-basic"
            label="NFT ID"
            variant="outlined"
            value={id}
            onChange={handleInputChange}
            sx={{
              border: '10px white'}}            
          />
        </Grid>
        <Grid item display="flex"
                  xs={6}
                   justifyContent={'flex-start'}
                    alignItems={'center'}>
          <Button 
            
            variant="contained" 
            color="primary"
            onClick={handleButtonClick}
          >
            Log Address
          </Button>
        </Grid>
        <Grid item display="flex"
                  xs={12}
                   justifyContent={'center'}
                    alignItems={'center'} >
          {error && <Alert severity="error">{error}</Alert>}
          {gqlInput && !error ? <QueryComponent id={gqlInput}/> : null}
        </Grid>
        </Grid>
      </main>
      </ApolloExample>
      
      </>
  );
}

