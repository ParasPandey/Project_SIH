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
  return (
    <>
      <div className="chart-box">
        <h4 className="m-3 mt-2">Natural Gas Price</h4>
        <Resizable>
          <AreaChart
            width={730}
            height={350}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
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
            <XAxis dataKey="Date" fontSize={12}>
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
      </div>
    </>
  );
};

export default LineChart;
// add8e6
