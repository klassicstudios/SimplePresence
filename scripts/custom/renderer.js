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
        var change = data['bgs'][0]['bgdelta'];
        if(change > 0){
          var sign = "+"
        }
        else {
          var sign = "-"
        }
        var directionDisplay;
        switch (data['bgs'][0]['direction']) {
          case 'DoubleDown':
            directionDisplay = '⇊';
            imageDisplay = 'doubledown';
            break;
          case 'SingleDown':
            directionDisplay = '↓';
            imageDisplay = 'singledown';
            break;
          case 'FortyFiveDown':
            directionDisplay = '↘';
            imageDisplay = 'ffdown';
            break;
          case 'FortyFiveUp':
            directionDisplay = '↗';
            imageDisplay = 'ffup';
            break;
          case 'SingleUp':
            directionDisplay = '↑';
            imageDisplay = 'singleup';
            break;
          case 'DoubleUp':
            directionDisplay = '⇈';
            imageDisplay = 'doubleup';
            break;
          case 'NOT COMPUTABLE':
            directionDisplay = '-';
            imageDisplay = 'nocompute';
            break;
          case 'RATE OUT OF RANGE':
            directionDisplay = '⇕';
            imageDisplay = 'oor';
            break;
          default:
            directionDisplay = '→';
            imageDisplay = 'flat';
            break;
        }
      var iob = data['bgs'][0]['iob'];
      document.getElementById('details')[text] = `${bg} [${sign}${change}] ${directionDisplay}`;
      document.getElementById('state')[text] = `IOB: ${iob}U`;
      document.getElementById('lkey')[text] = imageDisplay;
    }
  });
}
//this is janky, but we need to get the request once to begin with data before we loop it every 5m
getData();
//now loop it every 5m
setInterval(function () {
  getData();
}, 300000)

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
