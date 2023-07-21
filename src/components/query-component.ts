"use client";
import styles from "./page.module.css";
import { gql, useQuery } from '@apollo/client';

const GET_OWNER = gql`
  query GetOwner {
    
        position(id: "975071") {
          owner
        }
      }
  
`;

export default function QueryComponent() {

    const { loading, error, data } = useQuery(GET_OWNER);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);
    return `success`;
    
}