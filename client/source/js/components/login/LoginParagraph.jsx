'use strict';

var React = require('react');
module.exports = React.createClass({
    displayName: 'LoginParagraph',
    render: function () {
        return (<p id="profile-name" className="profile-name-card">{this.props.message}</p>)
    }
});