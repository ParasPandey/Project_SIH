import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  AreaChart,
  ReferenceLine,
  Area,
  Line,
  ComposedChart,
} from "recharts";
import { Resizable } from "react-timeseries-charts";
import moment from "moment";
import numeral from "numeral";

const LineChart = ({ data, inputFormet }) => {
  const dateFormatter = (item) => moment(item).format(inputFormet);
  const currencyFormatter = (item) => numeral(item).format("$0,0");
  const rangeData = [
    {
      day: "05-01",
      temperature: [-1, 10, 20],
    },
    {
      day: "05-02",
      temperature: [2, 15, 22],
    },
    {
      day: "05-03",
      temperature: [3, 12, 18],
    },
    {
      day: "05-04",
      temperature: [4, 12, 17],
    },
    {
      day: "05-05",
      temperature: [12, 16, 22],
    },
    {
      day: "05-06",
      temperature: [5, 16, 24],
    },
    {
      day: "05-07",
      temperature: [3, 12, 20],
    },
    {
      day: "05-08",
      temperature: [0, 8, 14],
    },
    {
      day: "05-09",
      temperature: [-3, 5, 10],
    },
  ];
  const data1 = [
    {
      name: "Page A",
      actual: 5,
      temperature : [2,8]
    },
    {
      name: "Page B",
      actual: 6,
      temperature : [3,10]
    },
    {
      name: "Page C",
      actual: 9,
      temperature : [1,14]
    },
    {
      name: "Page D",
      actual: 6,
      temperature : [4,10]
    },
    {
      name: "Page E",
      actual: 7,
      temperature : [3,13]
    },
  ];
  return (
    <>
      <Resizable>
        <AreaChart
          width={730}
          height={350}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 15 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickFormatter={dateFormatter} fontSize={12}>
            <Label value="Date" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            tickFormatter={currencyFormatter}
            fontSize={12}
            domain={[0, "dataMax +2"]}
            label={{
              value: "Price",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />

          {/* <ReferenceLine
                    y={18}
                    label="Max"
                    stroke="red"
                    strokeDasharray="3 3"
                  /> */}
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="Price"
            stroke="#8884d8"
            dot={false}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </Resizable>
      <Resizable>
        <ComposedChart
          width={500}
          height={400}
          data={data1}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
          <Line type="monotone" dataKey="actual" stroke="#ff7300" />
        </ComposedChart>
      </Resizable>
    </>
  );
};

export default LineChart;
// add8e6
