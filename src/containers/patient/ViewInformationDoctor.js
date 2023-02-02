import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ViewInformationDoctor.scss'
class ViewInformationDoctor extends Component {

    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <div className="header"></div>
                <div className="content-view-information">
                    <div className="text-information-doctor">
                        <div className='avatar-doctor'>
                            <img src="https://cdn.bookingcare.vn/fr/w200/2020/03/17/114430-bshung.jpg" alt="" />
                        </div>
                        <div className="information">
                            <h4>Pho giao su Nguyen Duy Hung</h4>
                            <div className="doctor-summary">
                            Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương<br></br>
                            Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương <br />
                            Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam
                            <br></br>
                            </div>
                            <div className="doctor-fb">
                                <button className='button'>Like</button>
                                <button className='button'>Share</button>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="schedule">
                            
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewInformationDoctor);
