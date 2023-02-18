import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './FamousDoctorLastWeek.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES, path } from '../../../utils';
import * as actions from '../../../store/actions/adminActions'
import { withRouter } from 'react-router';
import { getTopDoctorHome } from '../../../services/doctorService';
class FamousDoctorLastWeek extends Component {
    componentDidMount = async () => {
        this.props.getTopDoctorHome()
        console.log(getTopDoctorHome(10))
    }
    handleViewInformationDoctor = (doctor) => {
        console.log(doctor)
        this.props.history.push(`/information-doctor/${doctor.id}`)
    }
    handleViewMoreDoctors = () => {
        this.props.history.push(path.VIEW_MORE_DOCTOR)
    }
    render() {
        console.log(this.props.doctorData)
        let topDoctors = this.props.doctorData.data
        if (topDoctors && topDoctors.length > 0) {
            topDoctors = topDoctors
        }
        let language = this.props.language
        let settings = this.props.settings
        return (
            <div className='famous-doctor-lastweek-section'>
                <div className="text-famous-doctors">
                    <h3 className='famous-doctor'>Bác sĩ nổi bật tuần qua</h3>
                    <button className='button-more' onClick={this.handleViewMoreDoctors}><h6>Xem thêm</h6></button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>

                        {topDoctors && topDoctors.length > 0 &&
                            topDoctors.map((item, index) => {
                                return (
                                    <div className="img-customize" onClick={() => this.handleViewInformationDoctor(item)}>

                                        <img src={item.image} alt="" />

                                        {
                                            item.positionData && <h6>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</h6>
                                        }
                                        <h6>{`${item.lastName} ${item.firstName}`}</h6>
                                    </div>

                                )
                            })
                        }

                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorData: state.admin.dataDoctorHomePage,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorHome: () => dispatch(actions.fetchTopDoctorHomePageStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FamousDoctorLastWeek));
