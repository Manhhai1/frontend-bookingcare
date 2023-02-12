import React, { Component } from 'react';
import { connect } from "react-redux";
import { postAcceptBookingFromPatient } from '../../services/patientSevice';
class AcceptBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const token = urlParams.get('token')
        await postAcceptBookingFromPatient(token)
        console.log(token)
    }
    render() {

        return (
            <React.Fragment>
                <h4 style={{color:'red'}}>Xác nhận lịch khám bệnh thành công</h4>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptBooking);
