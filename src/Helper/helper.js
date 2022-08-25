import Papa from "papaparse";

const ConvertFileToJson = (fileName, setInputData, setFileData) => {
  var data = [];
  Papa.parse(fileName, {
    download: true,
    complete: function (results) {
      let xAxis = results.data[0][0];
      let yAxis = results.data[0][1];
      results.data = results.data.slice(1, results.data.length - 1);
      results.data.forEach((d) => {
        d[1] = Number(d[1]).toFixed(2);
        let obj = {
          [xAxis]: d[0],
          [yAxis]: Number(d[1]),
        };
        data.push(obj);
      });
      if (setFileData) {
        setFileData(data);
      }
      setInputData(data);
    },
  });
};

const FillCSVEmptyValues = async (newFile, setCsvData) => {
  var data = [];
  await Papa.parse(newFile, {
    download: true,
    complete: function (results) {
      console.log(results);
      let xAxis = results.data[0][0];
      let yAxis = results.data[0][1];
      results.data = results.data.slice(1, results.data.length - 1);
      results.data.forEach((d) => {
        d[1] = Number(d[1]).toFixed(2);
        let obj = {
          [xAxis]: d[0],
          [yAxis]: Number(d[1]),
        };
        data.push(obj);
      });
      setCsvData(data);
    },
  });
};

const UpdateJson = (data, DLData) => {
  data.forEach((d) => {
    d.Date = d.Date.split("-").reverse().join("-");
    if(d.Price ===0){
      DLData.forEach(dl=>{
        if (new Date(d.Date).getTime() === new Date(dl.date).getTime()){
          d.Price = dl.actual
        }
      })
    }
  });
  console.log(data)
  return data
};

export { ConvertFileToJson, FillCSVEmptyValues, UpdateJson };
