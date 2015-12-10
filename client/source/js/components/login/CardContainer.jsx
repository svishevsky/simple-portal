'use strict';
var React = require('react');
var RegistrationForm = require('./RegistrationForm');
var LoginForm = require('./LoginForm');
var SuccessRegistration = require('./SuccessRegistration');
module.exports = React.createClass({
    displayName: 'CardContainer',
    getInitialState: function () {
        return {page: "login"}
    },
    handleLinkClick: function (from) {
        var to;
        switch (from) {
            case "login":
                to = "reg";
                break;
            case "reg":
                to = "login";
                break;
            case "regSuc":
                to = "login";
                break;
        }
        this.setState({page: to});
    },
    handleLoginSubmit: function (info) {
        $.ajax({
            url: "/login",
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify(info),
            success: function (data) {
                if (data && data.url) {
                    window.location.replace(data.url)
                }
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                $.notify({
                    message: 'Bad email or password!'
                }, {
                    delay: 1,
                    type: 'danger'
                });
            }
        })
    },
    handleRegistrationSubmit: function (info) {
        $.ajax({
            url: "/registration",
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify(info),
            success: function (data) {
                //this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                if (xhr.status == 200) {
                    this.setState({page: "regSuc"})
                } else {
                    $.notify({
                        message: 'This email already registered!'
                    }, {
                        delay: 1,
                        type: 'danger'
                    });
                }
                console.log(xhr);
            }.bind(this)
        })
    },
    render: function () {
        var form = this.state.login ? <LoginForm /> : <RegistrationForm />;
        switch (this.state.page) {
            case "login":
                form = <LoginForm handleClick={this.handleLinkClick} page="login" onSubmit={this.handleLoginSubmit}/>;
                break;
            case "reg":
                form = <RegistrationForm handleClick={this.handleLinkClick} page="reg"
                                         onSubmit={this.handleRegistrationSubmit}/>;
                break;
            case "regSuc":
                form = <SuccessRegistration handleClick={this.handleLinkClick} page="regSuc"/>;
                break;
        }
        return (<div className="card card-container">
            {form}
        </div>);
    }
});