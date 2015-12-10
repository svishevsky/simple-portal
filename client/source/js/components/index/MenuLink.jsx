'use strict';
var React = require('react');
module.exports = React.createClass({
    displayName: 'MenuLink',
    render: function () {
        return (<li><a href={this.props.link}>{this.props.message}</a></li>)
    }
});