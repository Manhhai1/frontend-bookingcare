import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ViewInformationDoctor.scss'
import { getInformationDoctor, getScheduleDoctor, getDoctorInfor } from '../../services/doctorService';
import Footer from '../homepage/Footer/Footer';
import { LANGUAGES } from '../../utils';
import ModalBooking from './ModalBooking'
import Header from '../homepage/Header';
class ViewInformationDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                Markdown: {
                    description: '',
                    contentHTML: '',
                    contentMarkdown: ''
                }
            },
            schedule: [],
            day: '',
            doctorInfor: {},
            scheduleId: '',
            isOpenModal: false
        }
    }

    async componentDidMount() {
        let dataDoctor = await getInformationDoctor(this.props.match.params.id)
        let doctorInfor = await getDoctorInfor(this.props.match.params.id)
        console.log(doctorInfor)
        let scheduleExaminates = await getScheduleDoctor(this.props.match.params.id)
        let data = dataDoctor.data
        let day = this.getDay(0)
        this.setState({
            data: data,
            day: day,
            schedule: scheduleExaminates.data,
            doctorInfor: doctorInfor.data
        })
    }

    handleOnChangeChoiceDate = (e) => {
        this.setState({
            day: e.target.value
        })
    }
    day = (id) => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + id)
        let day = tomorrow.getDay()
        if (id === 0) day = 7
        if (id === 1) day = 8
        return day
    }
    getDay = (item) => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + item)
        let month = tomorrow.getMonth() + 1
        let day = `${tomorrow.getDate()}/${month}`
        return day
    }
    setOpenModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleOnClickOpenModalBooking = (e) => {
        console.log(e.target.value)
        this.setState({
            scheduleId: e.target.value
        })
        this.setOpenModal()
    }
    render() {
        console.log(this.state.doctorInfor)
        console.log(this.state.isOpenModal)
        let language = this.props.language
        let date = new Date()
        let day = date.getDay()
        let dayEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", 'Today', 'Tommorow']
        let dayVi = ["Chủ nhật", "Thứ hai", "Thứ ba", " Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", 'Hôm nay', "Ngày mai"]
        return (
            this.state.data && <div>
                <ModalBooking
                    doctorInfor={this.state.doctorInfor}
                    isOpenModal={this.state.isOpenModal}
                    setOpenModal={this.setOpenModal}
                    scheduleId={this.state.scheduleId}
                >
                </ModalBooking>
               <Header></Header>
                <div className="content-view-information">
                    <div className="text-information-doctor">
                        <div className='avatar-doctor'>
                            <img src={this.state.data.image} alt="" />
                        </div>
                        {
                            this.state.data && this.state.data.Markdown && <div className="information">
                                {
                                    this.state.data.positionData &&
                                    this.state.data.lastName &&
                                    this.state.data.firstName &&
                                    <h4>{`${this.state.data.positionData.valueVi} 
                                 ${this.state.data.lastName} 
                                 ${this.state.data.firstName}`}</h4>
                                }
                                <div className="doctor-summary">
                                    {this.state.data.Markdown.description}
                                </div>
                                <div className="doctor-fb">
                                    <button className='button'>Like</button>
                                    <button className='button'>Share</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="schedule-doctor">
                        <div className="schedule-examination">
                            <select name="date-examinates" id="date-examinates" onChange={(e) => this.handleOnChangeChoiceDate(e)}>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    selected
                                    value={this.getDay(0)}>
                                    {language === LANGUAGES.VI ? dayVi[this.day(0)] : dayEn[this.day(0)]} - {this.getDay(0)}</option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(1)}>
                                    {language === LANGUAGES.VI ? dayVi[this.day(1)] : dayEn[this.day(1)]} - {this.getDay(1)}
                                </option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(2)}>
                                    {language === LANGUAGES.VI ? dayVi[this.day(2)] : dayEn[this.day(2)]} - {this.getDay(2)}
                                </option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(3)}>
                                    {language === LANGUAGES.VI ? dayVi[this.day(3)] : dayEn[this.day(3)]} - {this.getDay(3)}
                                </option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(4)}>
                                    {language === LANGUAGES.VI ? dayVi[this.day(4)] : dayEn[this.day(4)]} - {this.getDay(4)}
                                </option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(5)}
                                >
                                    {language === LANGUAGES.VI ? dayVi[this.day(5)] : dayEn[this.day(5)]} - {this.getDay(5)}
                                </option>
                                <option
                                    className="option"
                                    name='data-examinates'
                                    value={this.getDay(6)}
                                >
                                    {language === LANGUAGES.VI ? dayVi[this.day(6)] : dayEn[this.day(6)]} - {this.getDay(6)}
                                </option>
                            </select>
                            <h4>LỊCH KHÁM</h4>
                            <div className="hours-examinates">
                                {this.state.schedule && this.state.schedule.length > 0 &&
                                    this.state.schedule.map((item, index) => {
                                        let day = `${item.date}/${(+item.month + 1)}`
                                        return day === this.state.day &&
                                            <button
                                                className='hour'
                                                value={item.id}
                                                onClick={e => this.handleOnClickOpenModalBooking(e)}
                                            >
                                                {language === LANGUAGES.VI ? item.Allcode.valueVi : item.Allcode.valueEn}</button>
                                    })}
                            </div>
                        </div>
                        <div className="address-examination">
                            <h5>ĐỊA CHỈ KHÁM</h5>{
                                this.state.doctorInfor && <p><b>{this.state.doctorInfor.nameClinic}</b></p>
                            }
                            {
                                this.state.doctorInfor && <p><b>{this.state.doctorInfor.addressClinic}</b></p>
                            }
                            {
                                this.state.doctorInfor && this.state.doctorInfor.priceData &&
                                <div className='price'>
                                    <h5>GIÁ KHÁM: {this.state.doctorInfor.priceData.valueVi}đ</h5>
                                </div>
                            }
                            <h5>LOẠI BẢO HIỂM ÁP DỤNG</h5>
                        </div>
                    </div>
                </div>
                {
                    this.state.data.Markdown && <div className="section-information-doctor">
                        <div dangerouslySetInnerHTML={{ __html: this.state.data.Markdown.contentHTML }}></div>
                    </div>
                }
                <Footer></Footer>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewInformationDoctor);
