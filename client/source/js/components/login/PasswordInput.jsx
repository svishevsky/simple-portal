'use strict';
const simplePasswordRegex = /^([a-zA-Z0-9]{5,})$/;

var React = require('react');
module.exports = React.createClass({
    displayName: 'PasswordField',
    isValid: function () {
        var pass = this.refs['password'];
        var valid = pass.value.length > 0 && pass.value.match(simplePasswordRegex);
        if (!valid) {
            $.notify({
                message: 'Incorrect password! Put at least 5 characters or digits'
            }, {
                delay: 1,
                type: 'danger'
            });
            pass.select();
        }
        return valid;
    },
    render: function () {
        return (
            <input type="password" className="form-control" id={this.props.inputId} placeholder={this.props.inputPlaceholder} ref="password"/>);
    }
});