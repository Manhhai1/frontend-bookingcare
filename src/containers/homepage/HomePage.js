import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePageHeader from '../homepage/HomePageHeader';
import Specialty from './Section/Specialty';
import './HomePage.scss'
import FamousDoctorLastWeek from './Section/FamousDoctorLastWeek';
import AboutBookingCare from './Section/AboutBookingCare';
import Footer from './Footer/Footer';
import Telemedicine from './Section/Telemedicine';
class HomePage extends Component {

    render() {
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
            <div className='homepage'>
                <HomePageHeader></HomePageHeader>
                <Telemedicine settings={settings}></Telemedicine>
                <Specialty settings={settings}></Specialty>
                <FamousDoctorLastWeek settings={settings}></FamousDoctorLastWeek>
                <AboutBookingCare></AboutBookingCare>
                <Footer></Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
