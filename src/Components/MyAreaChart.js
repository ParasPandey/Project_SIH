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

const MyAreaChart = ({ data, inputFormet, name }) => {
  data.map((d)=>{
    // console.log(d)
    d.actual = Number(d?.actual)?.toFixed(2);
    d['Confidence Interval'][0] = Number(d['Confidence Interval'][0])?.toFixed(2)
    d['Confidence Interval'][1] = Number(d['Confidence Interval'][1])?.toFixed(2)
    return d
  })
  const dateFormatter = (item) => moment(item).format(inputFormet);
  const currencyFormatter = (item) => numeral(item).format("$0,0");
  return (
    <>
      <h4 className="m-3">{name}</h4>
      <Resizable>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" tickFormatter={dateFormatter} fontSize={12}>
            <Label value="date" offset={0} position="bottom" />
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
          <Tooltip
            labelFormatter={function(value) {
              return `Date: ${value}`;
            }}
            
          />
          <Legend verticalAlign="top" height={36} />
          <Area dataKey="Confidence Interval" stroke="#8884d8" fill="#8884d8" />
          <Line type="linear" dataKey="actual" dot={false} stroke="#ff7300" />
        </ComposedChart>
      </Resizable>
    </>
  );
};

export default MyAreaChart;
// add8e6
