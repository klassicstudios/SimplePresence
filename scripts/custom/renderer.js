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
//this is janky, but we need to get the request once before we loop it every 5m
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
      document.getElementById('details')[text] = data[0]['sgv'];
      document.getElementById('state')[text] = data[0]['direction'];
    }
});
//now loop it every 5m
setInterval(function () {
  request.get({
      url: 'https://klassbg.herokuapp.com/api/v1/entries/sgv.json',
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is already parsed as JSON:
        document.getElementById('details')[text] = data[0]['sgv'];
        document.getElementById('state')[text] = data[0]['direction'];
      }
  });
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
