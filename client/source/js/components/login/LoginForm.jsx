'use strict';
var React = require('react');
var EmailInput = require('./EmailInput');
var PasswordInput = require('./PasswordInput');
var LoginParagraph = require('./LoginParagraph');
var LoginAnchor = require('./LoginAnchor');
module.exports = React.createClass({
    displayName: 'LoginForm',
    componentDidMount: function () {
        React.findDOMNode(this.refs.email).focus();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (this.refs['email'].isValid() && this.refs['pass'].isValid()) {
            this.props.onSubmit({
                username: React.findDOMNode(this.refs.email).value,
                password: React.findDOMNode(this.refs.pass).value
            });
        }
    },
    render: function () {
        return (<div>
            <LoginParagraph message="Login"/>
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <EmailInput ref="email"/>
                <PasswordInput inputId="inputPassword" inputPlaceholder="Password" ref="pass"/>
                <input className="btn btn-lg btn-primary btn-block btn-signin" type="submit" value="Sign In"/>
            </form>
            <LoginAnchor message="Registration" handleClick={this.props.handleClick} page={this.props.page}/>
        </div>);
    }
});