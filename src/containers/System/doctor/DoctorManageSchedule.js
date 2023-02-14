import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBooking, getScheduleDoctor, getScheduleDoctorJoinBooking, postHistory } from '../../../services/doctorService';
import './DoctorManageSchedule.scss'
class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            schedule: []
        }
    }
    async componentDidMount() {
        let data = await getScheduleDoctorJoinBooking(this.props.userInfo.id)
        console.log(data)
        this.setState({
            userInfo: this.props.userInfo,
            schedule: data.data
        })
    }
    handleClickSuccess = async (item) => {
        let obj = {}
        obj.doctorId = this.state.userInfo.id
        obj.patientId = item.scheduleData.patientId
        obj.date = item.scheduleData.date
        obj.description = 'Đã khám'
        await postHistory(obj)
        toast.success('Xác nhận đã khám')
        await deleteBooking(item.scheduleData.id)
        const arr = this.state.schedule
        let index = arr.indexOf(item)
        arr.splice(index, 1);
        this.setState({
            schedule: arr
        })
    }
    handleClickDeleteBooking = async (item) => {
        let obj = {}
        obj.doctorId = this.state.userInfo.id
        obj.patientId = item.scheduleData.patientId
        obj.date = item.scheduleData.date
        obj.description = 'Đã hủy'
        await postHistory(obj)
        await deleteBooking(item.scheduleData.id)
        const arr = this.state.schedule
        let index = arr.indexOf(item)
        arr.splice(index, 1);
        this.setState({
            schedule: arr
        })
        console.log(arr)
        toast.success('delete booking success')
    }
    render() {

        console.log(this.state.schedule)
        return (
            <React.Fragment>
                {
                    this.props.isLoggedIn && <div className="manage-doctor-schedule">
                        <div className="header-manage"><h5>Manage Schedule</h5></div>
                        <div className="content-manage">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã lịch hẹn</th>
                                        <th scope="col">Ngày</th>
                                        <th scope="col">Tháng</th>
                                        <th scope="col">Năm</th>
                                        <th scope="col">Giờ hẹn</th>
                                        <th scope='col'>Tên bệnh nhân</th>
                                        <th scope='col'>Số điện thoại</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Mô tả bệnh</th>
                                        <th scope='col'>Xác nhận của bệnh nhân</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.schedule.map((item, index) => {
                                            return (
                                                item.scheduleData && <tr>
                                                    <th scope="row" id={index}>{item.id}</th>
                                                    <td>{item.date}</td>
                                                    <td>{+item.month + 1}</td>
                                                    <td>{item.year}</td>
                                                    <td>{item.Allcode.valueVi}</td>
                                                    <td>{item.scheduleData.namePatient}</td>
                                                    <td>{item.scheduleData.phoneNumber}</td>
                                                    <td>{item.scheduleData.email}</td>
                                                    <td>{item.scheduleData.status}</td>
                                                    <td>{item.scheduleData.acceptBooking == true ? <div style={{ color: 'red' }}>Đã xác nhận</div> : 'Chưa xác nhận'}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-danger" onClick={() => this.handleClickDeleteBooking(item)}>Xóa cuộc hẹn</button>
                                                        {
                                                            item.scheduleData.acceptBooking == true &&
                                                            <button type="button" class="btn btn-success" onClick={() => { this.handleClickSuccess(item) }}>Đã khám xong</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
