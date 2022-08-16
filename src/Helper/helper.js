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
      setFileData(data);
      setInputData(data);
    },
  });
};

export { ConvertFileToJson };
