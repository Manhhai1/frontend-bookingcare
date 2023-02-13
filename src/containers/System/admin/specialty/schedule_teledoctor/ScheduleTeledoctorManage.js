import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../../../store/actions/adminActions'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ScheduleTeledoctorManage.scss'
import { getAllcode } from '../../../../../services/userService';
import { toast } from 'react-toastify';
import { postScheduleTeleDoctor } from '../../../../../services/doctorService';
import { LANGUAGES } from '../../../../../utils';
class ScheduleTeledoctorManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            arrDoctors: [],
            listDoctors: [],
            startDate: new Date(),
            data: [],
            scheduleExaminates: [],

        }
    }
    handleChangeOptionDoctor = selectedOption => {
        this.setState({ selectedOption });
        console.log(selectedOption)
    };
    handleChangeDate = (date) => {
        this.setState({
            startDate: date
        })
    }
    handle = () => {
        console.log(this.state.startDate)
    }
    async componentDidMount() {
        this.props.getAllDoctors()
        let data = await getAllcode('TIME')
        this.setState({
            data: data.typeCode
        })
        if (this.state.data && this.state.data.length > 0) {
            let newArr = this.state.data.map((item, index) => ({
                ...item, isActive: false
            }))
            this.setState({
                data: newArr
            })
        }
    }
    buildDataInputSelect = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {}
                obj.label = `${item.lastName} ${item.firstName}`
                obj.value = item.id
                result.push(obj)
            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.arrDoctors !== this.props.arrDoctors) {
            let options = this.buildDataInputSelect(this.props.arrDoctors.allDoctors)
            this.setState({
                arrDoctors: this.props.arrDoctors.allDoctors,
                listDoctors: options
            })
        }

    }
    handleAddHoursExamination = (e, item) => {
        console.log(item)
        item.isActive = !item.isActive
        if (item.isActive === true) {
            e.target.className = 'hours active'
        }
        else e.target.className = 'hours'

    }
    handleSaveOnChanges = async () => {
        if (this.state.selectedOption) {
            let arr = []
            await this.state.data.map((item, index) => {
                if (item.isActive) {
                    let obj = {}
                    obj.keyMap = item.keyMap
                    obj.date = this.state.startDate.getDate()
                    obj.month = this.state.startDate.getMonth()
                    obj.year = this.state.startDate.getFullYear()
                    obj.day = this.state.startDate.getDay()
                    obj.doctorId = this.state.selectedOption.value
                    arr.push(obj)
                }
            })
            this.setState({
                scheduleExaminates: arr
            })
            console.log(this.state.scheduleExaminates)
            await postScheduleTeleDoctor(this.state.scheduleExaminates)
            toast.success('post data success')
        }
        else {
            toast.error('Save Information error')
        }
    }
    render() {
        console.log(this.state.data)
        let language = this.props.language
        return (
            <React.Fragment>
                <h4>Manage Schedule Teledoctor</h4>

                <div className='manage-schedule'>
                    <div className="choice-doctor ">
                        <label htmlFor=""> <h5>Chọn bác sĩ</h5></label>{
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeOptionDoctor}
                                options={this.state.listDoctors}
                            />
                        }
                    </div>
                    <div className="schedule-date-examination ">
                        <h5>Ngày khám</h5>
                        <DatePicker className='form-control'
                            selected={this.state.startDate}
                            onChange={this.handleChangeDate}
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                        />

                    </div>
                </div>
                <div className="schedule-hours-examination">
                    <h5>Các khung giờ khám</h5>
                    <div className="schedule-hours">
                        {
                            this.state.data && this.state.data.length > 0 && this.state.data.map((item, index) => {
                                return (
                                    <button className={'hours'} value={item.keyMap} onClick={(e) => this.handleAddHoursExamination(e, item)} id={item.id}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                )
                            }
                            )
                        }
                    </div>
                    <button type="button" onClick={this.handleSaveOnChanges} className=" form-control save-schedule">Save</button>
                </div>


            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        arrDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchGetAllDoctorsStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTeledoctorManage);
