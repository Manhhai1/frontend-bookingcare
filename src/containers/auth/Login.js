import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { handleLoginUser } from "../../services/userService"
import './Login.scss';
import { identity } from 'lodash';
import { withRouter } from 'react-router';
class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: 'HaiManh',
            password: '230720',
            showPass: false,
            message: ''
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleShowHidePassword = () => {
        this.setState({
            showPass: !this.state.showPass
        })
    }
    HandleLogin = async () => {
        this.setState({
            message: ''
        })
        try {
            let data = await handleLoginUser(this.state.username, this.state.password)
            console.log(data.dataUser)
            if (data) {
                data.dataUser.roleId === 'R1' ? this.props.history.push('/system/user-manage') : this.props.history.push('/doctor/doctor-schedule')
                this.props.userLoginSuccess(data.dataUser)

                // this.props.history.push('/system/user-manage')
            }
        } catch (error) {
            if (error.response) {
                this.setState({
                    message: error.response.data.message
                })
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="login-page">
                    <div className="form">
                        <div className="login-form">
                            <input type="text" placeholder="username" value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)} />
                            <div className="password">
                                <input type={this.state.showPass ? 'text' : 'password'} placeholder="password" value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)} />
                                <span onClick={this.handleShowHidePassword}><i className={this.state.showPass ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                            </div>
                            <div className="error" style={{ color: 'red' }}>{this.state.message}</div>
                            <button onClick={() => this.HandleLogin()}>login</button>
                            <p className="message">Not registered? <a href="#">Create an account</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSucess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
