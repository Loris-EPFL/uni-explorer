"use client"

import styles from './page.module.css'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import QueryComponent from "../components/query-component";
import Alert from '@mui/material/Alert';
import ApolloExample from "@/graphql/thegraph/apollo";

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
    <ApolloExample>
      <main className={styles.main}>
        <div>
          <TextField
            id="outlined-basic"
            label="NFT ID"
            variant="outlined"
            value={id}
            onChange={handleInputChange}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleButtonClick}
          >
            Log Address
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {gqlInput && !error ? <QueryComponent id={gqlInput}/> : null}
        </div>
      </main>
    </ApolloExample>
  );
}

