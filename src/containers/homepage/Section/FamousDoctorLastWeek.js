import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './FamousDoctorLastWeek.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions/adminActions'
import { withRouter } from 'react-router';
class FamousDoctorLastWeek extends Component {
    convertTypeImage = (image) => {
        let imageConvert
        if (image) {
            const imageBuffer = new Buffer(image, 'base64').toString('binary');
            imageConvert = imageBuffer.toString('base64')
        }
        return imageConvert;
    }
    componentDidMount = () => {
        this.props.getTopDoctorHome()
    }
    handleViewInformationDoctor = (doctor) => {
        console.log(doctor)
        this.props.history.push(`/information-doctor/${doctor.id}`)
    }
    render() {
        console.log(this.props.doctorData)
        let topDoctors = this.props.doctorData.data
        if (topDoctors && topDoctors.length > 0) {
            topDoctors = topDoctors.concat(topDoctors).concat(topDoctors).concat(topDoctors)
        }
        let language = this.props.language
        const { isLoggedIn } = this.props;
        const settings = {
            dots: true,
            infinite: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        return (
            <div className='famous-doctor-lastweek-section'>
                <div className="text-specialty">
                    <h3>Bác sĩ nổi bật tuần qua</h3>
                    <button><h4>Xem them</h4></button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>

                        {topDoctors && topDoctors.length > 0 &&
                            topDoctors.map((item, index) => {
                                return (
                                    <div className="img-customize" onClick={() => this.handleViewInformationDoctor(item)}>

                                        <img src={this.convertTypeImage(item.image)} alt="" />

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
