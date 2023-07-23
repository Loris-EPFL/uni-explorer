import { gql, useQuery } from '@apollo/client';
import { Box, Typography, radioClasses } from '@mui/material';
import { Chart, DataItem } from '../components/chart';
import { Position, Pool, TickMath } from '@uniswap/v3-sdk'
import { Token, BigintIsh } from '@uniswap/sdk-core'

const CHAIN_ID = 137; // Polygon


// Sample data
const chartTest: DataItem[] = [
  { date: '2021', principal: 4000, fees: 4500 },
  { date: '2022', principal: 3000, fees: 4800 },
  { date: '2023', principal: 2000, fees: 9800 },
  { date: '2024', principal: 2000, fees: 33333 },
];


// TODO: Check if transaction is not the latest transaction made to the NFT (does transfer, close, or top up make it change timestamp?)

const GET_TIMESTAMPS = gql`
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

const GET_POSITION_INFOS = gql`
  query GetPositionInfos($id: String!) {
    position(id: $id) {
      liquidity
      tickLower {
        tickIdx
      }
      tickUpper {
        tickIdx
      }
      pool {
        feeTier
      }
      token0 {
        id
        symbol
        decimals
        name
      }
      token1 {
        id
        symbol
        decimals
        name
      }
    }
  }
`;

const GET_POSITION_HISTORY = gql`
  query GetPositionData($id: String!, $date_lte: Int!, $date_gte: Int!) {
    position(id: $id) {
      token0 {
        tokenDayData(where: {date_lte: $date_lte, date_gte: $date_gte}) {
          date
          priceUSD
        }
      }
      token1{
        tokenDayData(where: {date_lte: $date_lte, date_gte: $date_gte}) {
          priceUSD
        }
      }
      pool {
        poolDayData(where: {date_lte: $date_lte, date_gte: $date_gte}) {
          liquidity
          sqrtPrice
          tick   
        }
      }
    }
  }
`;



interface QueryComponentProps {
  id: string;
}

export default function QueryComponent({ id }: QueryComponentProps) {
  const { loading, error, data } = useQuery(GET_TIMESTAMPS, {
    variables: { id: id },
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_POSITION_INFOS, {
    variables: { id: id },
  });

  if (loading || loading2) return <Typography>Loading Timestamps...</Typography>;
  if (error) return <Typography>Error! {error.message}</Typography>;
  if (error2) return <Typography>Error! {error2.message}</Typography>;

  const feeTier = parseInt(data2.position.pool.feeTier);
  const token0 = new Token(CHAIN_ID, data2.position.token0.id, parseInt(data2.position.token0.decimals), data2.position.token0.symbol, data2.position.token0.name);
  const token1 = new Token(CHAIN_ID, data2.position.token1.id, parseInt(data2.position.token1.decimals), data2.position.token1.symbol, data2.position.token1.name);

  console.log("liquidity :" + data2.position.liquidity)
  return (
    <Box >
      <Typography>pool : {data2.position.token0.symbol}/{data2.position.token1.symbol}, {feeTier / 10000}%</Typography>
      <Typography>days active : {(data._meta.block.timestamp - parseInt(data.position.transaction.timestamp)) / 3600 / 24}</Typography>
      <PriceFeed
        id={id}
        date_lte={data._meta.block.timestamp}
        date_gte={parseInt(data.position.transaction.timestamp)}
        feeTier={feeTier}
        liquidity={data2.position.liquidity as BigintIsh}
        token0={token0}
        token1={token1}
        tickLower={parseInt(data2.position.tickLower.tickIdx)}
        tickUpper={parseInt(data2.position.tickUpper.tickIdx)} ></PriceFeed>
    </Box>
  );
}



interface PriceFeedProps {
  id: string;
  date_lte: number;
  date_gte: number;
  feeTier: number;
  liquidity: BigintIsh;
  token0: Token;
  token1: Token;
  tickUpper: number;
  tickLower: number;
}

function PriceFeed({ id, date_lte, date_gte, feeTier, liquidity, token0, token1, tickUpper, tickLower }: PriceFeedProps) {
  const { loading, error, data } = useQuery(GET_POSITION_HISTORY, {
    variables: { id: id, date_lte: date_lte, date_gte: date_gte },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error! {error.message}</Typography>;

  //const pool = new Pool(token0, token1, feeTier, sqrtRatioX96, liquidity, tickCurrent);
  //const position = new Position({ pool: pool, liquidity: data.position.liquidity, tickLower: tickLower, tickUpper: tickUpper });

  const [positionValueHistory, dates, hodlStratHistory] = getPositionValue(data, token0, token1, feeTier, liquidity, tickLower, tickUpper)

  const chart = positionValueHistory.map((principal: any, index: any) => {
    let date = new Date(dates[index] * 1000)
    return {
      date: date.toLocaleDateString(),
      principal,
      fees: 0,
      hodlStrat: hodlStratHistory[index]
    };
  });

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
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
        <Chart data={chart} />
      </Box>
    </Box>
  );
}

// gets the value of the positions principal in USDC : 
function getPositionValue(data: any, token0: Token, token1: Token, fee: number, positionLiquidity: BigintIsh, tickLower: number, tickUpper: number) {
  const poolHistory = data.position.pool.poolDayData.map((item: any) => {
    const sqrtPriceX96 = item.sqrtPrice as BigintIsh;
    const poolLiquidity = item.liquidity as BigintIsh;
    const tick = parseInt(item.tick);




    const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);
    return new Pool(
      token0,
      token1,
      //fee,
      fee,
      sqrtRatioX96.toString(),
      //poolLiquidity,
      poolLiquidity.toString(),
      //tick
      tick

    );
  })

  console.log(poolHistory)

  if (tickLower > tickUpper) {
    let temp = tickLower;
    tickLower = tickUpper;
    tickUpper = temp;
  }


  const positionHistory = poolHistory.map((pool: any) => {
    //console.log(pool, positionLiquidity, tickLower, tickUpper)
    //console.log("pool tick : ", pool.tickCurrent)
    return new Position({ pool, liquidity: positionLiquidity, tickLower, tickUpper })
  })

  const token0PriceHistory = data.position.token0.tokenDayData.map((item: any) => {
    return (item.priceUSD as BigintIsh);
  })

  const token1PriceHistory = data.position.token1.tokenDayData.map((item: any) => {
    return (item.priceUSD as BigintIsh);
  })

  const positionValue = positionHistory.map((position: any, index: number) => {
    const token0Price = token0PriceHistory[index];
    const token1Price = token1PriceHistory[index];
    const token0Value = parseFloat(position.amount0.toSignificant(6)) * token0Price;
    const token1Value = parseFloat(position.amount1.toSignificant(6)) * token1Price;
    return token0Value + token1Value;
  })
  const initAmount0 = parseFloat(positionHistory[0].amount0.toSignificant(6));
  const initAmount1 = parseFloat(positionHistory[0].amount1.toSignificant(6));

  const hodlStratHistory = positionHistory.map((position: any, index: number) => {
    const token0Price = token0PriceHistory[index];
    const token1Price = token1PriceHistory[index];
    const token0Value = initAmount0 * token0Price;
    const token1Value = initAmount1 * token1Price;
    return token0Value + token1Value;
  })

  const dates = data.position.token0.tokenDayData.map((item: any) => {
    return (item.date as BigintIsh);
  })

  return [positionValue, dates, hodlStratHistory];
}