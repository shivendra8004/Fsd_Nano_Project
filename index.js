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