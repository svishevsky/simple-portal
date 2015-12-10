'use strict';
require('./source/css/base.css');
var React = require('react');
var CardContainer = require('./source/js/components/login/CardContainer');
React.render(<CardContainer />, document.getElementById('container'));