import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePageHeader from '../homepage/HomePageHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss'
import FamousDoctorLastWeek from './Section/FamousDoctorLastWeek';
import HandBook from './Section/HandBook';
import DoctorsAndMedicalFacilities from './Section/DoctorsAndMedicalFacilities';
import AboutBookingCare from './Section/AboutBookingCare';
import Footer from './Footer/Footer';
class HomePage extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='homepage'>
                <HomePageHeader></HomePageHeader>
                <Specialty  settings={settings}></Specialty>
                <MedicalFacility  settings={settings}></MedicalFacility>
                <FamousDoctorLastWeek  settings={settings}></FamousDoctorLastWeek>
                <HandBook settings={settings}></HandBook>
                <AboutBookingCare></AboutBookingCare>
                <DoctorsAndMedicalFacilities></DoctorsAndMedicalFacilities>
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
