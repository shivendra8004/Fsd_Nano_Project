const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (temval, orgval) => {
    let temperature = temval.replace('{%tempval%}',orgval.main.temp);
    temperature = temperature.replace('{%tempmin%}',orgval.main.temp_min);
    temperature = temperature.replace('{%tempmax%}',orgval.main.temp_max);
    temperature = temperature.replace('{%city%}',orgval.name);
    temperature = temperature.replace('{%country%}',orgval.sys.country);
    temperature = temperature.replace('{%tempstatus%}',orgval.weather[0].main);
    return temperature;
  };
  const server = http.createServer((req, res) => {
    if (req.url == "/") {
      requests(
        "http://api.openweathermap.org/data/2.5/weather?q=guna&units=metric&appid=cffecceafab4795d98bde4086c0332bb"
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          //   console.log(arrData[0].main.temp);
          
          const realTimeData = arrData.map((val)=> replaceVal(homeFile, val)).join(" ");
           
          res.write(realTimeData)
          // console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
    }
  });