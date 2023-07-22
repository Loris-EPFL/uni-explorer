'use client';

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const themeR = createTheme({
  
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        light : '#FFFFFF',
        main: '#E8ECFB',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#FB118E', //uniswap purple light mode
        main: '#FB118E', //uniswap purple main mode
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#FDEAF1',
      },
      background: {
        paper: '#FFFFFF',
      },
      text: {
        primary: "#000000",
        secondary : "7780A0",
       
      }}})

  return (
    <ThemeProvider theme={themeR}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
