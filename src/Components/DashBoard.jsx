import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./../CSS/Dashboard.css";
import {
  ConvertFileToJson,
  ConvertFileToJsonPredict,
  FillCSVEmptyValues,
  UpdateJson,
} from "../Helper/helper";
import newFile from "../File/newngp.csv";
import inputFileData from "../File/ngp_close.csv";
import LineChart from "./LineChart";
import MyAreaChart from "./MyAreaChart";
import FilterButtons from "./FilterButtons";
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

// Exponential all files
import exponential from "../File/EX/es_all.json";
import exponential5 from "../File/EX/ex5.json";
import exponential30 from "../File/EX/ex30.json";
import exponential90 from "../File/EX/ex90.json";
import exponential180 from "../File/EX/ex180.json";
import exponential365 from "../File/EX/ex365.json";
import exponential730 from "../File/EX/ex730.json";

// Arima all files
import Arima from "../File/Arima/arima_all.json";
import Arima5 from "../File/Arima/arima5.json";
import Arima30 from "../File/Arima/arima30.json";
import Arima90 from "../File/Arima/arima90.json";
import Arima180 from "../File/Arima/arima180.json";
import Arima365 from "../File/Arima/arima365.json";
import Arima730 from "../File/Arima/arima730.json";
import axios from "axios";

export const DashBoard = () => {
  const [inputData, setInputData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [inputfile, setInputFile] = useState();
  const [inputFormet, setInputFormet] = useState("YYYY");
  const [activeBtn, setActiveBtn] = useState("Default");
  const [rangeStart, setRangeStart] = useState();
  const [presentData, setPresentData] = useState();
  const [exponentionData, SetExponentionData] = useState([]);
  const [machineLearning, SetMachineLearning] = useState([]);
  const [arimaData, SetArimaData] = useState([]);
  let [csvData, setCsvData] = useState([]);
  let [dlMax, setDLMax] = useState(0);
  let [expoMax, setExpoMax] = useState(0);
  let [arimaMax, setArimaMax] = useState(0);

  const [rangeEnd, setRangeEnd] = useState();
  const FindMax = (data, update) => {
    let max = 0;
    data.forEach((d) => {
      if (Number(d.actual) > Number(max)) {
        max = Number(d.actual);
      }
    });
    max = Math.ceil(max);
    update(max);
  };
  useEffect(() => {
    // ConvertFileToJson(inputFileData, setInputData, setFileData);
    fetchPresentData();
    SetExponentionData(exponential);
    SetMachineLearning(DLData);
    SetArimaData(Arima);
    FindMax(exponential, setExpoMax);
    FindMax(DLData, setDLMax);
    FindMax(Arima, setArimaMax);
  }, []);

  useEffect(() => {
    if (presentData?.data.length > 0) {
      ConvertFileToJson(presentData, setInputData, setFileData);
    }
  }, [presentData]);

  const fetchPresentData = async () => {
    try {
      const data = await axios.get("/getPresentPriceData");
      console.log(data);
      setPresentData(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (presentData?.data.length > 0) {
      ConvertFileToJson(presentData, setInputData, setFileData);
    }
  }, [presentData]);

  const fetchPresentData = async () => {
    try {
      const data = await axios.get("/getPresentPriceData");
      console.log(data);
      setPresentData(data);
    } catch (error) {}
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setInputFile(e.target.files[0]);
      ConvertFileToJsonPredict(e.target.files[0], setCsvData, null);
    }
  };
  const Predict = async (e) => {
    e.preventDefault();
    let json = UpdateJson(csvData, DLData);
    const response = await axios.post("excel/download", { json });
    if (response.data) {
      window.open(`http://localhost:5000/excel/download/${response.data}`);
      window.location.reload();
    }
  };

  const ApplyFilterOnInput = (data) => {
    if (data === " ") {
      setActiveBtn("Default");
      SetExponentionData(exponential);
      SetMachineLearning(DLData);
      setInputData(fileData);
      SetArimaData(Arima);
      FindMax(exponential, setExpoMax);
      FindMax(DLData, setDLMax);
      FindMax(Arima, setArimaMax);
    } else {
      const dataArray = data.split("-");
      if (dataArray[1] === "D") {
        setInputData(
          fileData.slice(fileData.length - dataArray[0], fileData.length)
        );
        SetMachineLearning(DLData5);
        SetExponentionData(exponential5);
        SetArimaData(Arima5);
        setInputFormet("DD-MM-YYYY");
        setActiveBtn("5 Days");
        FindMax(DLData5, setExpoMax);
        FindMax(DLData5, setDLMax);
        FindMax(Arima5, setArimaMax);
      } else if (dataArray[1] === "M") {
        setInputData(
          fileData.slice(fileData.length - 30 * dataArray[0], fileData.length)
        );
        setInputFormet("DD-MM-YYYY");
        setActiveBtn(`${dataArray[0]} Month`);
        if (dataArray[0] === "1") {
          SetMachineLearning(DLData30);
          SetExponentionData(exponential30);
          SetArimaData(Arima30);
          FindMax(DLData30, setExpoMax);
          FindMax(DLData30, setDLMax);
          FindMax(Arima30, setArimaMax);
        } else if (dataArray[0] === "3") {
          SetMachineLearning(DLData90);
          SetExponentionData(exponential90);
          SetArimaData(Arima90);
          FindMax(exponential90, setExpoMax);
          FindMax(DLData90, setDLMax);
          FindMax(Arima90, setArimaMax);
        } else if (dataArray[0] === "6") {
          SetMachineLearning(DLData180);
          SetExponentionData(exponential180);
          SetArimaData(Arima180);
          FindMax(exponential180, setExpoMax);
          FindMax(DLData180, setDLMax);
          FindMax(Arima180, setArimaMax);
        }
      } else if (dataArray[1] === "Y") {
        setInputData(
          fileData.slice(fileData.length - 365 * dataArray[0], fileData.length)
        );

        setInputFormet("MM-YYYY");
        setActiveBtn(`${dataArray[0]} Year`);
        if (dataArray[0] === "1") {
          SetMachineLearning(DLData365);
          SetExponentionData(exponential365);
          SetArimaData(Arima365);
          FindMax(exponential365, setExpoMax);
          FindMax(DLData365, setDLMax);
          FindMax(Arima365, setArimaMax);
        } else if (dataArray[0] === "2") {
          // FindMax(exponential730, setExpoMax);
          console.log(exponential730[0].max);
          setExpoMax(Math.floor(exponential730[0].max));
          SetMachineLearning(DLData730);
          SetExponentionData(exponential730.slice(1, exponential730.length));
          SetArimaData(Arima730);
          FindMax(DLData730, setDLMax);
          FindMax(Arima730, setArimaMax);
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

      <div className="main_dash">
        <div className="default_chart">
          <h4 className="mt-4">Prediction Chart</h4>
          {inputData?.length > 0 && (
            <>
              <div className="date_picker">
                <div className="start_date">
                  <span>From </span> :{"       "}
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
                  <span>To </span> :{"       "}
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
                  onClick={ApplyDateFilter}>
                  Apply
                </Button>
              </div>

              <LineChart data={inputData} inputFormet={inputFormet} />
              <FilterButtons
                activeBtn={activeBtn}
                ApplyFilterOnInput={ApplyFilterOnInput}
              />
              <MyAreaChart
                data={machineLearning}
                inputFormet={inputFormet}
                name="Deep Learning"
                max={dlMax}
                value={2}
              />
              <MyAreaChart
                data={exponentionData}
                inputFormet={inputFormet}
                name="Exponential Smoothing"
                max={expoMax}
                value={3}
              />

              <MyAreaChart
                data={arimaData}
                inputFormet={inputFormet}
                name="Arima"
                max={arimaMax}
                value={1}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
