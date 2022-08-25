import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./../CSS/Dashboard.css";
import {
  ConvertFileToJson,
  FillCSVEmptyValues,
  UpdateJson,
} from "../Helper/helper";
import newFile from "../File/newngp.csv";
import inputFileData from "../File/ngp_close.csv";
import LineChart from "./LineChart";

import "react-datepicker/dist/react-datepicker.css";
// Dl all data read
import DLData from "../File/DL/dlall.json";
import DLData5 from "../File/DL/dl5.json";
import DLData30 from "../File/DL/dl30.json";
import DLData90 from "../File/DL/dl90.json";
import DLData180 from "../File/DL/dl180.json";
import DLData365 from "../File/DL/dl365.json";
import DLData730 from "../File/DL/dl730.json";
import MyDatePicker from "./MyDatePicker";
import exponential from "../File/Exponential.json";
import Arima from "../File/ARIMA.json";
import MyAreaChart from "./MyAreaChart";
import FilterButtons from "./FilterButtons";

export const DashBoard = () => {
  const [inputData, setInputData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [inputfile, setInputFile] = useState();
  const [inputFormet, setInputFormet] = useState("YYYY");
  const [activeBtn, setActiveBtn] = useState("Default");
  const [rangeStart, setRangeStart] = useState();
  const [exponentionData, SetExponentionData] = useState([]);
  const [machineLearning, SetMachineLearning] = useState([]);
  const [arimaData, SetArimaData] = useState([]);
  let [csvData, setCsvData] = useState([]);


  const [rangeEnd, setRangeEnd] = useState();
  // console.log(exponentionData);
  // console.log(machineLearning);
  // console.log(arimaData);
  useEffect(() => {
    ConvertFileToJson(inputFileData, setInputData, setFileData);
    SetExponentionData(exponential);
    SetMachineLearning(DLData);
    SetArimaData(Arima);
  }, []);

  const handleFileUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setInputFile(e.target.files[0]);
      ConvertFileToJson(e.target.files[0], setCsvData, null);
    }
  };
  const Predict = (e) => {
    e.preventDefault();
    let json = UpdateJson(csvData, DLData);
    console.log(json)
  };

  const ApplyFilterOnInput = (data) => {
    if (data === " ") {
      setActiveBtn("Default");
      SetExponentionData(exponential);
      SetMachineLearning(DLData);
      setInputData(fileData);
      SetArimaData(Arima);
    } else {
      const dataArray = data.split("-");
      if (dataArray[1] === "D") {
        setInputData(
          fileData.slice(fileData.length - dataArray[0], fileData.length)
        );
        SetExponentionData(exponential.slice(0, dataArray[0]));

        SetArimaData(Arima.slice(0, dataArray[0]));
        setInputFormet("DD-MM-YYYY");
        SetMachineLearning(DLData5);
        setActiveBtn("5 Days");
      } else if (dataArray[1] === "M") {
        setInputData(
          fileData.slice(fileData.length - 30 * dataArray[0], fileData.length)
        );
        SetExponentionData(exponential.slice(0, 30 * dataArray[0]));
        // SetMachineLearning(DLData.slice(0, 30 * dataArray[0]));
        SetArimaData(Arima.slice(0, 30 * dataArray[0]));
        setInputFormet("DD-MM-YYYY");
        setActiveBtn(`${dataArray[0]} Month`);
        if (dataArray[0] === "1") {
          console.log(DLData30);
          SetMachineLearning(DLData30);
        } else if (dataArray[0] === "3") {
          console.log(DLData90);
          SetMachineLearning(DLData90);
        } else if (dataArray[0] === "6") {
          console.log(DLData180);
          SetMachineLearning(DLData180);
        }
      } else if (dataArray[1] === "Y") {
        setInputData(
          fileData.slice(fileData.length - 365 * dataArray[0], fileData.length)
        );
        console.log(dataArray[0]);
        SetExponentionData(exponential.slice(0, 365 * dataArray[0]));

        SetArimaData(Arima.slice(0, 365 * dataArray[0]));
        setInputFormet("MM-YYYY");
        setActiveBtn(`${dataArray[0]} Year`);
        if (dataArray[0] === "1") {
          SetMachineLearning(DLData365);
        } else if (dataArray[0] === "2") {
          SetMachineLearning(DLData730);
        }
      }
    }
  };

  const ApplyDateFilter = () => {
    setActiveBtn(null);

    // For Natural Gas Price
    let filterdInputArray = inputData.filter((d) => {
      d.Date = d.Date.split("-").reverse().join("-");
      return (
        new Date(d.Date).getTime() >= new Date(rangeStart).getTime() &&
        new Date(d.Date).getTime() <= new Date(rangeEnd).getTime()
      );
    });
    console.log(filterdInputArray);
    setInputData(filterdInputArray);

    // For Exponention Prediction
    let filterdExponentionArray = exponentionData.filter((d) => {
      console.log(d);
      // d.Date = d.Date.split("-").reverse().join("-");
      return (
        new Date(d.date).getTime() >= new Date(rangeStart).getTime() &&
        new Date(d.date).getTime() <= new Date(rangeEnd).getTime()
      );
    });
    SetExponentionData(filterdExponentionArray);

    // For ML Prediction
    let filterdMlArray = DLData.filter((d) => {
      // console.log(d)
      // d.Date = d.date.split("-").reverse().join("-");
      return (
        new Date(d.date).getTime() >= new Date(rangeStart).getTime() &&
        new Date(d.date).getTime() <= new Date(rangeEnd).getTime()
      );
    });
    SetMachineLearning(filterdMlArray);

    // For Arima Prediction
    let filterdArimaArray = arimaData.filter((d) => {
      // console.log(d)
      // d.Date = d.date.split("-").reverse().join("-");
      return (
        new Date(d.date).getTime() >= new Date(rangeStart).getTime() &&
        new Date(d.date).getTime() <= new Date(rangeEnd).getTime()
      );
    });
    SetArimaData(filterdArimaArray);
    setInputFormet("DD-MM-YYYY");
  };

  return (
    <>
      <header className="header">
        <h2>Dashboard</h2>
      </header>
      <div className="searchbar">
        <form onSubmit={Predict}>
          <label htmlFor="upload_file">Import CSV File</label>
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
              <FilterButtons
                activeBtn={activeBtn}
                ApplyFilterOnInput={ApplyFilterOnInput}
              />
              <LineChart data={inputData} inputFormet={inputFormet} />
              <MyAreaChart
                data={machineLearning}
                inputFormet={inputFormet}
                name="Deep Learning"
              />
              <MyAreaChart
                data={exponentionData}
                inputFormet={inputFormet}
                name="Exponential Smoothing"
              />

              <MyAreaChart
                data={arimaData}
                inputFormet={inputFormet}
                name="Arima"
              />
              <h4>Collectione of Three</h4>
              {/* <LineChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
