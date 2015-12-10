'use strict';

var React = require('react');
module.exports = React.createClass({
    displayName: 'LoginAnchor',
    handleClick: function (e) {
        this.props.handleClick(this.props.page);
    },
    render: function () {
        return (
            <a className="link-signin" onClick={this.handleClick}>{this.props.message}</a>)
    }
});