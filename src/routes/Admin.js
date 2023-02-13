import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/admin/UserManage';
import UserRedux from '../containers/System/admin/UserRedux';
import Header from '../containers/Header/Header';
import DoctorUpdateInformationManage from '../containers/System/admin/DoctorUpdateManage';
import DoctorScheduleManage from '../containers/System/admin/DoctorScheduleManage';
import SpecialtyManage from '../containers/System/admin/specialty/SpecialtyManage'
import RemoteExamninationManage from '../containers/System/admin/remote_examination/RemoteExamninationManage';
import ScheduleTeledoctorManage from '../containers/System/admin/specialty/schedule_teledoctor/ScheduleTeledoctorManage';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-information-doctors" component={DoctorUpdateInformationManage} />
                            <Route path="/system/manage-schedule-doctors" component={DoctorScheduleManage} />
                            <Route path='/system/manage-schedule-teledoctors' component={ScheduleTeledoctorManage}></Route>
                            <Route path='/system/manage-specailty' component={SpecialtyManage}></Route>
                            <Route path='/system/manage-remote-examination' component={RemoteExamninationManage}></Route>
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
