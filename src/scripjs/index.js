"use strict";

var _fields = require("./components/fields.js");
var _Popup = require("./components/Popup.js");
var _projectList = require("./components/projectList.js");
new _fields.Fields();
new _projectList.projects("initial");
new _projectList.projects("active");
new _projectList.projects("finished");
new _Popup.Popup();