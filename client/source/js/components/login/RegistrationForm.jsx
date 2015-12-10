'use strict';
var React = require('react');
var EmailInput = require('./EmailInput');
var PasswordInput = require('./PasswordInput');
var LoginParagraph = require('./LoginParagraph');
var LoginAnchor = require('./LoginAnchor');
module.exports = React.createClass({
    displayName: 'RegistrationForm',
    componentDidMount: function () {
        React.findDOMNode(this.refs.email).focus();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (this.refs['email'].isValid() && this.refs['pass'].isValid() && this.refs['confirm'].isValid()) {
            if (React.findDOMNode(this.refs.pass).value == React.findDOMNode(this.refs.confirm).value) {
                this.props.onSubmit({
                    username: React.findDOMNode(this.refs.email).value,
                    password: React.findDOMNode(this.refs.pass).value
                });
            } else {
                $.notify({
                    message: 'Password are not same!'
                }, {
                    delay: 1,
                    type: 'danger'
                });
            }
        }
    },
    render: function () {
        return (<div>
                <LoginParagraph message="Registration"/>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <EmailInput ref="email"/>
                    <PasswordInput inputId="inputPassword" inputPlaceholder="Password" ref="pass"/>
                    <PasswordInput inputId="confirmPassword" inputPlaceholder="Confirm password" ref="confirm"/>
                    <input className="btn btn-lg btn-primary btn-block btn-signin" type="submit" value="Registration"/>
                </form>
                <LoginAnchor message="Back to Login" handleClick={this.props.handleClick} page={this.props.page}/>
            </div>
        );
    }
});