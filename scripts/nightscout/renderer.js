const {
  webFrame
} = require('electron');
const {
  remote
} = require('electron')
const mainProcess = remote.require('./main.js');
const os = require('os');
if (os.type() !== 'Darwin') {
  document.body.style.backgroundColor = '#4C4C4C'
}

webFrame.setZoomLevelLimits(1, 1);

const config = require('../../config.json')
'use strict';
var request = require('request');
function getData() {
  request.get({
      url: config.textConfig.nsurl,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is already parsed as JSON:
        var bg = data['bgs'][0]['sgv'];
        var double = ">90 mg/dl"
        var doublemm = ">5 mmol/l"
        var single = "60-90 mg/dl"
        var singlemm = "3.3-5mmol/l"
        var ff = "30-60 mg/dl"
        var ffmm = "1.6-3.3 mmol/l"
        var flat = "1 mg/dl"
        var flatmm = "0.05 mmol"
        var unit = 'mg/dl'
        var change = data['bgs'][0]['bgdelta'];
        if (change > 0){
          var sign = "+"
        }
        else {
          var sign = ""
        }
        if (config.textConfig.mmol === true){
          unit = 'mmol/l';
          double = doublemm;
          single = singlemm;
          ff = ffmm;
          flat = flatmm;
        }
        var directionDisplay;
        switch (data['bgs'][0]['direction']) {
          case 'DoubleDown':
            directionDisplay = '⇊';
            imageDisplay = 'doubledown';
            directionDescription = `Falling Rapidly: Could Fall ${double} in 30m`;
            break;
          case 'SingleDown':
            directionDisplay = '↓';
            imageDisplay = 'singledown';
            directionDescription = `Falling Quickly: Could Fall ${single} in 30m`;
            break;
          case 'FortyFiveDown':
            directionDisplay = '↘';
            imageDisplay = 'ffdown';
            directionDescription = `Falling: Could fall ${ff} in 30m`;
            break;
          case 'FortyFiveUp':
            directionDisplay = '↗';
            imageDisplay = 'ffup';
            directionDescription = `Rising: Could rise ${ff} in 30m`;
            break;
          case 'SingleUp':
            directionDisplay = '↑';
            imageDisplay = 'singleup';
            directionDescription = `Rising Quickly: Could rise ${single} in 30m`;
            break;
          case 'DoubleUp':
            directionDisplay = '⇈';
            imageDisplay = 'doubleup';
            directionDescription = `Rising Rapidly: Could rise ${double} in 30m`;
            break;
          case 'NOT COMPUTABLE':
            directionDisplay = '-';
            imageDisplay = 'nocompute';
            directionDescription = 'Unknown: Cannot compute, please wait for next reading';
            break;
          case 'RATE OUT OF RANGE':
            directionDisplay = '⇕';
            imageDisplay = 'oor';
            directionDescription = 'Out of Range: The rate has gone out of range for the sensor';
            break;
          default:
            directionDisplay = '→';
            imageDisplay = 'flat';
            directionDescription = `Flat: Not increasing or decreasing more than ${flat} per minute`;
            break;
        }
      var iob = data['bgs'][0]['iob'];
      document.getElementById('details')[text] = `${bg} ${unit} [${sign}${change}] ${directionDisplay}`;
      document.getElementById('state')[text] = `IOB: ${iob}U`;
      document.getElementById('lkey')[text] = imageDisplay;
      document.getElementById('ltext')[text] = directionDescription;
    }
  });
}
//this is janky, but we need to get the request once to begin with data before we loop it every 1m
getData();
//now loop it every 1m
setInterval(function () {
  getData();
}, 60000)

console.log(config.textConfig.details)
console.log(config.textConfig.state)
console.log(config.imageConfig.smallText)
var text = "textContent" in document.body ? "textContent" : "innerText";
document.getElementById('stext')[text] = config.imageConfig.smallText
document.getElementById('ltext')[text] = config.imageConfig.largeText
document.getElementById('skey')[text] = config.imageConfig.smallKey
document.getElementById('lkey')[text] = config.imageConfig.largeKey
if (config.imageConfig.showButton == false) {
  document.getElementById('button').style.display = 'none'
}
if (config.timeConfig.timeType !== 'none') {
  document.getElementById('time')[text] = config.timeConfig.whatTime
} else {
  document.getElementById('divtime').style.display = 'none'
}

function upload() {
  var open = require("open");
  open('https://canary.discordapp.com/developers/applications/me/' + config.clientID.toString());
}
