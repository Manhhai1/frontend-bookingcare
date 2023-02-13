import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';

import * as actions from '../store/actions/adminActions'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../containers/auth/Login';
import Header from './Header/Header';
import System from '../routes/Admin';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import CustomScrollbars from '../components/CustomScrollbars';
import HomePage from '../containers/homepage/HomePage'
import ViewInformationDoctor from './patient/ViewInformationDoctor';
import Doctor from '../routes/Doctor';
import AcceptBooking from './patient/AcceptBooking';
import ViewSpecialty from './patient/ViewSpecialty';
import ViewMoreSpecialty from './homepage/viewmore/ViewMoreSpecialty';
import ViewMoreTelemedicine from './homepage/viewmore/ViewMoreTelemedicine';
import ViewMoreDoctor from './homepage/viewmore/ViewMoreDoctor';
import ViewTelemedicine from './patient/ViewTelemedicine';
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"></link>

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        this.props.getProvinceStart()
        this.props.getPayMent()

    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', witdh: '100%' }}>


                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)}></Route>
                                    <Route path='/information-doctor/:id' component={ViewInformationDoctor}></Route>
                                    <Route path={path.TELEMEDICINE} component={ViewTelemedicine}></Route>
                                    <Route path={path.SPECIALTY} component={ViewSpecialty}></Route>

                                    <Route path={path.VIEW_MORE_DOCTOR} component={ViewMoreDoctor}></Route>
                                    <Route path={path.VIEW_MORE_SPECIALTY} component={ViewMoreSpecialty}></Route>
                                    <Route path={path.VIEW_MORE_TELEMEDICINE} component={ViewMoreTelemedicine}></Route>
                                    <Route path={path.ACCEPT_BOOKING} component={AcceptBooking}></Route>
                                </Switch>
                            </CustomScrollbars>
                        </span>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
        getPayMent: () => dispatch(actions.fetchPaymentStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);