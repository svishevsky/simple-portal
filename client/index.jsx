'use strict';
require('./source/css/index.css');
var React = require('react');
var TopMenu = require('./source/js/components/index/TopMenu');
React.render(<TopMenu />, document.getElementById('container'));