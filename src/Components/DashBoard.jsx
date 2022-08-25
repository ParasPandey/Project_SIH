import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./../CSS/Dashboard.css";
import { ConvertFileToJson } from "../Helper/helper";
import file from "../File/daily_csv.csv";
import LineChart from "./LineChart";

import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "./MyDatePicker";

export const DashBoard = () => {
  let [inputData, setInputData] = useState([]);
  let [fileData, setFileData] = useState([]);
  let [inputfile, setInputFile] = useState();
  let [inputFormet, setInputFormet] = useState("YYYY");
  let [activeBtn, setActiveBtn] = useState("Default");

  const [rangeStart, setRangeStart] = useState();

  const [rangeEnd, setRangeEnd] = useState();
  useEffect(() => {
    ConvertFileToJson(file, setInputData, setFileData);
  }, []);

  const handleFileUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setInputFile(e.target.files[0]);
    }
  };
  const Predict = (e) => {
    e.preventDefault();
    ConvertFileToJson(inputfile, setInputData, setFileData);
  };

  const ApplyFilterOnInput = (data) => {
    if (data === " ") {
      setActiveBtn("Default");
      setInputData(fileData);
    } else {
      const dataArray = data.split("-");
      if (dataArray[1] === "D") {
        setInputData(
          fileData.slice(fileData.length - dataArray[0], fileData.length)
        );
        setInputFormet("DD-MM-YYYY");
        setActiveBtn("5 Days");
      } else if (dataArray[1] === "M") {
        setInputData(
          fileData.slice(fileData.length - 30 * dataArray[0], fileData.length)
        );
        setInputFormet("DD-MM-YYYY");
        setActiveBtn(`${dataArray[0]} Month`);
      } else if (dataArray[1] === "Y") {
        setInputData(
          fileData.slice(fileData.length - 365 * dataArray[0], fileData.length)
        );
        setInputFormet("MM-YYYY");
        setActiveBtn(`${dataArray[0]} Year`);
      }
    }
  };

  const ApplyDateFilter = () => {
    setActiveBtn(null);
    let filterdArray = inputData.filter(
      (d) =>
        new Date(d.Date).getTime() >= new Date(rangeStart).getTime() &&
        new Date(d.Date).getTime() <= new Date(rangeEnd).getTime()
    );
    setInputData(filterdArray);
    setInputFormet("DD-MM-YYYY");
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
              <div className="date_picker">
                <div className="start_date">
                  <span>FROM </span> :{"       "}
                  <MyDatePicker
                    selectsStart={true}
                    selectsEnd={false}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    setRange={setRangeStart}
                    selected={rangeStart}
                    minDate={new Date("01-07-1997")}
                    maxDate={new Date()}
                  />
                </div>
                <div className="end_date">
                  <span>TO </span> :{"       "}
                  <MyDatePicker
                    selectsStart={false}
                    selectsEnd={true}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    setRange={setRangeEnd}
                    selected={rangeEnd}
                    minDate={new Date(rangeStart)}
                    maxDate={new Date()}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={ApplyDateFilter}
                >
                  Apply
                </Button>
              </div>
              <LineChart data={inputData} inputFormet={inputFormet} />
              
              <div className="filter_buttons">
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "5 Days" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("5-D")}
                >
                  5 Days
                </button>
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "1 Month" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("1-M")}
                >
                  1 Month
                </button>
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "1 Year" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("3-M")}
                >
                  3 Month
                </button>
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "6 Month" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("6-M")}
                >
                  6 Month
                </button>

                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "5 Year" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("1-Y")}
                >
                  1 Year
                </button>
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "10 Year" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput("5-Y")}
                >
                  5 Year
                </button>
                <button
                  type="button"
                  className={`btn btn${
                    activeBtn === "Default" ? "" : "-outline"
                  }-primary`}
                  onClick={() => ApplyFilterOnInput(" ")}
                >
                  All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
