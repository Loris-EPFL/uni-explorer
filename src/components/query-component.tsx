import { gql, useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import {Chart, DataItem} from '../components/chart';


// Sample data
const chartTest : DataItem[] = [
  { date: '2021', principal: 4000, fees: 4500},
  { date: '2022', principal: 3000, fees: 4800 },
  { date: '2023', principal: 2000, fees: 9800},
  { date: '2024', principal: 2000, fees: 33333},
];


// TODO: Check if transaction is not the latest transaction made to the NFT (does transfer, close, or top up make it change timestamp?)

const GET_TiMESTAMPS = gql`
  query GetTimestamps($id: String!) {
    _meta {
      block {
        timestamp
      }
    }
    position(id: $id) {
      transaction {
        timestamp
      }
    }
  }
`;

const GET_POSITION_DATA = gql`
  query GetPositionData($id: String!, $date_lte: Int!, $date_gte: Int!) {
    _meta {
      block {
        timestamp
      }
    }
    position(id: $id) {
      transaction {
        timestamp
      }
      token0 {
        symbol
        tokenDayData(where: {date_lte: $date_lte, date_gte: $date_gte}) {
          date
          priceUSD
        }
      }
    }
  }
`;


interface QueryComponentProps {
  id: string;
}

export default function QueryComponent({ id }: QueryComponentProps) {
  const { loading, error, data } = useQuery(GET_TiMESTAMPS, {
    variables: { id: id },
  });
  if (loading) return <Typography>Loading Timestamps...</Typography>;
  if (error) return <Typography>Error! {error.message}</Typography>;

  console.log(data)


  return(
    <Box>
      <Typography>days active : {(data._meta.block.timestamp - parseInt(data.position.transaction.timestamp)) / 3600 / 24}</Typography>
      <PriceFeed id={id} date_lte={data._meta.block.timestamp} date_gte={parseInt(data.position.transaction.timestamp)}></PriceFeed>
    </Box>
  );
}

interface PriceFeedProps {
  id: string;
  date_lte: number;
  date_gte: number;
}

function PriceFeed({ id, date_lte, date_gte}: PriceFeedProps) {
  const { loading, error, data } = useQuery(GET_POSITION_DATA, {
    variables: { id: id, date_lte: date_lte, date_gte: date_gte },
  });
  

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error! {error.message}</Typography>;

  // Convert JSON data to a string
  const dataString = JSON.stringify(data, null, 2);

  return (
    <Box sx={{ p: 2, bgcolor: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Success
      </Typography>
      <Box 
        sx={{ 
          p: 2, 
          borderRadius: 2, 
          color: 'black',
          bgcolor: 'white'
        }}
      >
        <Typography variant="body1">
          {dataString}
        </Typography>
        <Chart data={chartTest}/>
      </Box>
    </Box>
  );
}