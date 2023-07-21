"use client"

import Image from 'next/image'
import styles from './page.module.css'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Home() {
  const [address, setAddress] = useState("");

  const handleButtonClick = () => {
    console.log(address);
  };

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };
  return (
    
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
  )
}
