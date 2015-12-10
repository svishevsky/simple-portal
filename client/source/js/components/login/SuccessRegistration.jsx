'use strict';
var React = require('react');
var LoginAnchor = require('./LoginAnchor');
module.exports = React.createClass({
    displayName: 'SuccessRegistration',
    render: function () {
        return (<div>
            <div className="well">
                <h1>Thank you for registration!</h1>
                <span>Instructions on how to activate your account have beem emailed to you. Please check your email.</span>
            </div>
            <LoginAnchor message="Go to Login" handleClick={this.props.handleClick} page={this.props.page}/>
        </div> )
    }
});