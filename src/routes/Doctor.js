import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorManageSchedule from '../containers/System/doctor/DoctorManageSchedule';
import Header from '../containers/Header/Header';
import UpdateInformation from '../containers/System/doctor/UpdateInformation';
import History from '../containers/System/doctor/History';
class Doctor extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>                        
                            <Route path="/doctor/doctor-schedule" component={DoctorManageSchedule} />
                            <Route path='/doctor/update-information' component={UpdateInformation}></Route>
                            <Route path={'/doctor/histories'} component={History}></Route>
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
