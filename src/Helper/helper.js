const ConvertFileToJson = (presentData, setInputData, setFileData) => {
  var data = [];
  let xAxis = "Date";
  let yAxis = "Price";
  console.log(xAxis, yAxis);
  presentData.data = presentData.data.slice(1, presentData.data.length - 1);
  presentData.data.forEach((d) => {
    d[1] = Number(d[1]).toFixed(2);
    let obj = {
      [xAxis]: d[0],
      [yAxis]: Number(d[1]),
    };
    data.push(obj);
  });
  console.log(data);
  setFileData(data);
  setInputData(data);
};

export { ConvertFileToJson };
