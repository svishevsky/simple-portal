'use strict';
var React = require('react');
var MenuLink = require('./MenuLink');
var MenuDropDown = require('./MenuDropDown');
module.exports = React.createClass({
    displayName: 'TopMenu',
    render: function () {
        return (<nav role="navigation" className="navbar navbar-default navbar-inverse">
            <div className="container-fluid">
                <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                        <MenuDropDown menuName="Menu 1">
                            <MenuLink link="#" message="Menu 1-1"/>
                            <MenuLink link="#" message="Menu 1-2"/>
                            <MenuLink link="#" message="Menu 1-3"/>
                            <MenuLink link="#" message="Menu 1-4"/>
                        </MenuDropDown>
                        <MenuDropDown menuName="Menu 2">
                            <MenuLink link="#" message="Menu 2-1"/>
                            <MenuLink link="#" message="Menu 2-2"/>
                            <MenuLink link="#" message="Menu 2-3"/>
                            <MenuLink link="#" message="Menu 2-4"/>
                        </MenuDropDown>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <MenuLink link="logout" message="Logout"/>
                    </ul>
                </div>
            </div>
        </nav> )
    }
});