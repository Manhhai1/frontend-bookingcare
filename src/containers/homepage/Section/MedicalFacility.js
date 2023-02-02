import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MedicalFacilityImg1 from '../../../assets/images/co-so-y-te-noi-bat/114348-bv-viet-duc.jpg'
class MedicalFacility extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let settings =this.props.settings
        return (
            <div className='medical-facility-section'>
                <div className="text-specialty">
                    <h3>Cơ sở y tế nổi bật</h3>
                    <button>Xem thêm</button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>

                        </div>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={MedicalFacilityImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>

                        </div>
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
