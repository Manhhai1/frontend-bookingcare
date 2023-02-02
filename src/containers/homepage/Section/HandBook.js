import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HandBook.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HandBookImg1 from '../../../assets/images/cam-nang/145306-cat-tri-bao-nhieu-tien.png'
class HandBook extends Component {

    render() {
        let settings =this.props.settings
        return (
            <div className='handbook-section'>
                <div className="text-specialty">
                    <h3>Cẩm nang</h3>
                    <button>Tất cả bài viết</button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={HandBookImg1} alt="" className='img-content' />
                                <h5>Cắt trĩ bao nhiêu tiền? Bảng giá tại 5 Địa chỉ uy tín TPHCM</h5>
                            </div>
                            <div className="item">
                                <img src={HandBookImg1} alt="" className='img-content' />
                                <h5>Cắt trĩ bao nhiêu tiền? Bảng giá tại 5 Địa chỉ uy tín TPHCM</h5>
                            </div>
                        </div>
                        <div className='img-customize'>
                            <div className="item">
                                <img src={HandBookImg1} alt="" className='img-content' />
                                <h5>Cắt trĩ bao nhiêu tiền? Bảng giá tại 5 Địa chỉ uy tín TPHCM</h5>
                            </div>
                            <div className="item">
                                <img src={HandBookImg1} alt="" className='img-content' />
                                <h5>Cắt trĩ bao nhiêu tiền? Bảng giá tại 5 Địa chỉ uy tín TPHCM</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
