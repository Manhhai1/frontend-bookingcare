import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpecialtyById, getAllDoctorsFromSpecialty } from '../../services/specialtySevice';
import { LANGUAGES } from '../../utils';
import Footer from '../homepage/Footer/Footer';
import './ViewSpecialty.scss'
import RoleBookingCare from './RoleBookingCare';
import { withRouter } from 'react-router'
import ModalBooking from './ModalBooking';
import Header from '../homepage/Header';
class ViewSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            specialty: {
                id: '',
                description: '',
                name: '',
                descriptionMarkdown: ''
            },
            allDoctors: [],
            viewMoreActive: false,
            schedule: [],
            day: '',
            openRole: false,
            doctorInfor: {},
            isOperModalBooking: false,
            scheduleBooking: ''
        }
    }
    async componentDidMount() {
        let id = this.props.match.params.id
        let data = await getAllDoctorsFromSpecialty(id)
        console.log(data)
        let schedule = data.allScheduleOfDoctor
        let specialty = await getSpecialtyById(id)
        console.log(data.allDoctorsFromSpecialty)
        let obj = {
            description: specialty.specialty.description,
            name: specialty.specialty.name,
            descriptionMarkdown: specialty.specialty.descriptionMarkdown
        }
        await this.setState({
            allDoctors: data.allDoctorsFromSpecialty,
            specialty: obj,
            schedule: schedule,
            day: this.getDay(0)
        })
    }

    handleViewMoreDescription = async () => {
        let description = document.getElementById('description-content')
        await this.setState({
            viewMoreActive: !this.state.viewMoreActive
        })
        if (this.state.viewMoreActive) {
            description.style.height = "auto"
        } else {
            description.style.height = '200px'
        }
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
    handleOnChangeChoiceDate = (e) => {
        console.log(e.target.value)
        this.setState({
            day: e.target.value
        })
    }
    handleOpenRoleBookingCare = () => {
        this.setState({
            openRole: !this.state.openRole
        })
    }
    handleViewDoctor = (id) => {
        this.props.history.push(`/information-doctor/${id}`)
        console.log(id)
    }
    handleBooking = (item, scheduleId) => {
        console.log(item, scheduleId)
        this.setState({
            doctorInfor: item,
            scheduleBooking: scheduleId
        })
        this.setOpenModal()
    }
    setOpenModal = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }
    render() {
        let dayVi = ["Ch??? nh???t", "Th??? hai", "Th??? ba", " Th??? t??", "Th??? n??m", "Th??? s??u", "Th??? b???y", 'H??m nay', "Ng??y mai"]
        let dayEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", 'Today', 'Tommorow']
        let date = new Date()
        let day = date.getDay()
        let language = this.props.language
        return (
            <div className="container-specialty" >
              <Header></Header>
                <div className="specialty-body" >
                    < div className="section-specialty-description" >
                        <h4 className='specialty-name' >{this.state.specialty.name}</h4>
                        <div className="description-content" id='description-content' >
                            <div dangerouslySetInnerHTML={{ __html: this.state.specialty.descriptionMarkdown }}></div>
                        </div>
                    </div>
                    <div className="view-more"
                        onClick={this.handleViewMoreDescription} > {this.state.viewMoreActive === true ? 'Thu g???n' : 'Xem th??m'} </div>
                    <div className="section-doctors">
                        {
                            this.state.allDoctors && this.state.allDoctors.length > 0 &&
                            this.state.allDoctors.map((item, index) => {
                                return (
                                    <div className='doctor-section'>
                                        {
                                            <ModalBooking
                                                isOpenModal={this.state.isOpenModalBooking}
                                                setOpenModal={this.setOpenModal}
                                                doctorInfor={this.state.doctorInfor}
                                                scheduleId ={this.state.scheduleBooking}
                                            >
                                              
                                            </ModalBooking>
                                        }
                                        <div className="avatar-doctor" onClick={() => this.handleViewDoctor(item.doctorId)}>{
                                            item.doctorData &&
                                            <img className='avatar' src={item.doctorData.image} alt="" />
                                        }
                                        </div>
                                        <div className="description-doctor">{
                                            item.doctorData && <h5>{`${item.doctorData.positionData.valueVi} ${item.doctorData.lastName} ${item.doctorData.firstName}`}</h5>
                                        }
                                            <div className="description-content">
                                                {
                                                    item.markdownData && <div dangerouslySetInnerHTML={{ __html: item.markdownData.description }}></div>
                                                }
                                                <div className="province">
                                                    <p>{item.provinceData.valueVi}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="schedule-doctor">
                                            <select name="schedule" id="schedule-id" onChange={(e) => this.handleOnChangeChoiceDate(e)}>
                                                <option className='option' value={this.getDay(0)}>{language === LANGUAGES.VI ? dayVi[this.day(0)] : dayEn[this.day(0)]} - {this.getDay(0)}</option>
                                                <option className='option' value={this.getDay(1)}>{language === LANGUAGES.VI ? dayVi[this.day(1)] : dayEn[this.day(1)]} - {this.getDay(1)}</option>
                                                <option className='option' value={this.getDay(2)}>{language === LANGUAGES.VI ? dayVi[this.day(2)] : dayEn[this.day(2)]} - {this.getDay(2)}</option>
                                                <option className='option' value={this.getDay(3)}>{language === LANGUAGES.VI ? dayVi[this.day(3)] : dayEn[this.day(3)]} - {this.getDay(3)}</option>
                                                <option className='option' value={this.getDay(4)}>{language === LANGUAGES.VI ? dayVi[this.day(4)] : dayEn[this.day(4)]} - {this.getDay(4)}</option>
                                                <option className='option' value={this.getDay(5)}>{language === LANGUAGES.VI ? dayVi[this.day(5)] : dayEn[this.day(5)]} - {this.getDay(5)}</option>
                                                <option className='option' value={this.getDay(6)}>{language === LANGUAGES.VI ? dayVi[this.day(6)] : dayEn[this.day(6)]} - {this.getDay(6)}</option>
                                            </select>
                                            <h6>L???CH KH??M</h6>
                                            <div className="hours">
                                                {
                                                    this.state.schedule.length > 0 && item.doctorData && this.state.schedule.map((item1, index) => {
                                                        let day
                                                        if (item1.scheduleDoctor) day = `${item1.scheduleDoctor.date}/${(+item1.scheduleDoctor.month + 1)}`
                                                        if (item1.doctorId == item.doctorData.id && day == this.state.day) {
                                                            return (item1.scheduleDoctor && <button className='btn-hour' onClick={() => this.handleBooking(item, item1.scheduleDoctor.id)}>{item1.scheduleDoctor.Allcode.valueVi}</button>)
                                                        }
                                                    })
                                                }
                                            </div>
                                            <div className="address">
                                                <h6>?????A CH??? KH??M</h6>
                                                {item && <p>{item.nameClinic}</p>}
                                                {item && <p>{item.addressClinic}</p>}
                                            </div>
                                            <div className="price">
                                                <h6>GI?? KH??M: {item.priceData.valueVi}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='button-role' onClick={this.handleOpenRoleBookingCare}>Vai tr?? c???a Booking care</div>
                    {this.state.openRole && <RoleBookingCare></RoleBookingCare>}
                </div>
                <Footer > </Footer>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSpecialty));