import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import SpecialtyImg1 from '../../../assets/images/chuyen-khoa-pho-bien/120741-tim-mach.jpg'
import '../Section/Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    render() {
        let settings =this.props.settings
        return (
            <div className="specialty-section">
                <div className="text-specialty">
                    <h3>Chuyên khoa phổ biến</h3>
                    <button>Xem thêm</button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>

                        </div>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="item">
                                <img src={SpecialtyImg1} alt="" className='img-content' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
