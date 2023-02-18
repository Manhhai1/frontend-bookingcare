import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllDoctors, getTopDoctorHome } from '../../../services/doctorService';
import { path } from '../../../utils';
import './ViewMoreDoctor.scss'
import Select from 'react-select'
import Header from '../Header';
class ViewMoreDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctors: [],
            arrNameDoctors: [],
            doctorSelect: {},
            allDoctors: []
        }
    }
    async componentDidMount() {
        let doctors = await getTopDoctorHome(10)
        let alldoctors = await getAllDoctors()
        console.log(alldoctors)
        this.setState({
            doctors: doctors.data,
            allDoctors: alldoctors.allDoctors
        })
        this.formatNameDoctor(alldoctors.allDoctors)
    }
    formatNameDoctor = (arr) => {
        let ar = []
        arr.length > 0 && arr.map((item, index) => {
            let obj = {}
            let fullname = `${item.lastName} ${item.firstName}`
            obj.label = fullname
            obj.value = item.id
            obj.image = item.image
            ar.push(obj)
        })
        this.setState({
            arrNameDoctors: ar
        })
    }
    
    handleClickViewDoctor = (id) => {
        this.props.history.push(`/information-doctor/${id}`)
    }
    formatDoctors = (e) => {
        return (
            <div className="doctor-option">
                <img src={e.image} alt="doctor" />
                <span>{e.label}</span>
            </div>
        )
    }
    render() {
        console.log(this.state.doctors)
        return (
            <div className="view-more-container">
                <Header name ={'Bác sĩ'}></Header>
                <div className="view-content">
                    <p>Tìm kiếm bác sĩ theo tên</p>
                    <Select className='find-doctor'
                        value={this.state.doctorSelect}
                        onChange={(e) => this.handleClickViewDoctor(e.value)}
                        options={this.state.arrNameDoctors}
                        formatOptionLabel={(e) => this.formatDoctors(e)}
                    />
                    <p>Bác sĩ nổi bật</p>
                    {

                        this.state.doctors && this.state.doctors.map((item, index) => {
                            return (
                                <div className='view-specialty' onClick={() => this.handleClickViewDoctor(item.id)}>
                                    <img className='image-specialty' src={item.image} alt="" />
                                    <div className="name-specialty">{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewMoreDoctor);
