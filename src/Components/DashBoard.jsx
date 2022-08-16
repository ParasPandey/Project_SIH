import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./../CSS/Dashboard.css";
import Papa from "papaparse";
import moment from "moment";
import numeral from "numeral";
import { ConvertFileToJson } from "../Helper/helper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
  AreaChart,
  Area,
} from "recharts";
import { Resizable } from "react-timeseries-charts";
import file from "../File/daily_csv.csv";

export const DashBoard = () => {
  let [inputData, setInputData] = useState([]);
  let [fileData, setFileData] = useState([]);
  let [inputFormet, setInputFormet] = useState("YYYY");

  useEffect(() => {
    ConvertFileToJson(file, setInputData, setFileData);
  }, []);
  const dateFormatter = (item) => moment(item).format(inputFormet);
  const currencyFormatter = (item) => numeral(item).format("$0,0");
  const handleFileUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      ConvertFileToJson(e.target.files[0], setInputData, setFileData);
    }
  };
  const Predict = (e) => {
    e.preventDefault();
    console.log(inputData);
  };

  const ApplyFilterOnInput = (data) => {
    if (data === " ") {
      setInputData(fileData);
    } else {
      const dataArray = data.split("-");
      if (dataArray[1] === "D") {
        setInputData(
          fileData.slice(fileData.length - dataArray[0], fileData.length)
        );
        setInputFormet("DD-MM-YYYY");
      } else if (dataArray[1] === "M") {
        setInputData(
          fileData.slice(fileData.length - 30 * dataArray[0], fileData.length)
        );
        setInputFormet("DD-MM-YYYY");
      } else if (dataArray[1] === "Y") {
        setInputData(
          fileData.slice(fileData.length - 365 * dataArray[0], fileData.length)
        );
        setInputFormet("MM-YYYY");
      }
    }
  };

  return (
    <>
      <header className="header">
        <h2>Dashboard</h2>
      </header>
      <div className="searchbar">
        <form onSubmit={Predict}>
          <label htmlFor="upload_file">Export CSV File</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            name="CSV_File"
            id="upload_file"
            onChange={handleFileUpload}
          />
          <Button variant="contained" color="primary" type="submit">
            Predict
          </Button>
        </form>
      </div>
      <hr />
      <div className="main_dash">
        <h4>Prediction Chart</h4>
        <div className="default_chart">
          {inputData?.length > 0 && (
            <>
              <Resizable>
                <AreaChart
                  width={730}
                  height={300}
                  data={inputData}
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
                  <XAxis
                    dataKey="Date"
                    tickFormatter={dateFormatter}
                    fontSize={12}
                  >
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
              <div className="filter_buttons">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput(" ")}
                >
                  Default
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("5-D")}
                >
                  5 Days
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("1-M")}
                >
                  1 Month
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("6-M")}
                >
                  6 Month
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("1-Y")}
                >
                  1 Year
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("5-Y")}
                >
                  5 Year
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => ApplyFilterOnInput("10-Y")}
                >
                  10 Year
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
