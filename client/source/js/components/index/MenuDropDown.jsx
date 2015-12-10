'use strict';
var React = require('react');
var MenuLink = require('./MenuLink');
module.exports = React.createClass({
    displayName: 'MenuDropDown',
    render: function () {
        return (<li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                    <span>{this.props.menuName}</span>
                    <span className="caret"/>
                </a>
                <ul role="menu" className="dropdown-menu">
                    {this.props.children}
                </ul>
            </li>
        )
    }
});