'use strict';
const simpleEmailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

var React = require('react');
module.exports = React.createClass({
    displayName: 'EmailField',
    isValid: function () {
        var email = this.refs['email'];
        var valid = email.value.length > 0 && email.value.match(simpleEmailRegex);
        if (!valid) {
            $.notify({
                message: 'Incorrect email! Please put the correct one'
            }, {
                delay: 1,
                type: 'danger'
            });
            email.select();
        }
        return valid;
    },
    render: function () {
        return (
            <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>);
    }
});