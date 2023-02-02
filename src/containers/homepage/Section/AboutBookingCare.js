import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './AboutBookingCare.scss'
class AboutBookingCare extends Component {

    render() {
        return (
            <div className='about-bookingcare'>
                <h2>Truyền thông nói về BookingCare</h2>
                <div className="item">
                    <div className="content">
                    <iframe
                    src="https://www.youtube.com/embed/FyDQljKtWnI" 
                    title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                    </iframe>
                    </div>
                    <img src="" alt="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutBookingCare);
