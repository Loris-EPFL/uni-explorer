import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';

export type DataItem = {
  date: string;
  principal: number;
  fees: number;
};

type ChartProps = {
  data: DataItem[];
};

export const Chart: React.FC<ChartProps> = ({ data }) => (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="principal" stroke="#FFC0CB" activeDot={{ r: 8 }} /> // Pink line
    <Line type="monotone" dataKey="fees" stroke="#0000FF" /> // Blue line
  </LineChart>
);