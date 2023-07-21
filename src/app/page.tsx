
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ApolloClientProvider } from "@/graphql/thegraph/apollo";
import QueryComponent from "../components/query-component";


export default function Home() {
  const [address, setAddress] = useState("");

  const handleButtonClick = () => {
    console.log(address);
  };

  const handleInputChange = (event : any) => {
    setAddress(event.target.value);
  };

  return (
    <ApolloClientProvider>
    <QueryComponent />
    <main className={styles.main}>
      <div>
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        value={address}
        onChange={handleInputChange}
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleButtonClick}
      >
        Log Address
      </Button>
    </div>
    </main>
    </ApolloClientProvider>
  );
}
