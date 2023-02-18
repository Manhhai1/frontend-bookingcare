import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllSpecialties } from '../../../services/specialtySevice';
import { path } from '../../../utils';
import './ViewMoreSpecialty.scss'
import icon from '../../../assets/images/icon/download.png'
import Header from '../Header';
class ViewMoreSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialties: []
        }
    }
    async componentDidMount() {
        let specialties = await getAllSpecialties()
        console.log(specialties)
        this.setState({
            specialties: specialties.specialties
        })
    }
    handleClickViewSpecialty = (id) => {
        this.props.history.push(`/view-specialty/${id}`)
    }
    render() {
        console.log(this.state.specialties)
        return (
            <div className="view-more-container">
                 <Header name ={'Chuyên khoa'}></Header>
                <div className="view-content">
                    {

                        this.state.specialties && this.state.specialties.map((item, index) => {
                            return (
                                <div className='view-specialty' onClick={() => this.handleClickViewSpecialty(item.id)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewMoreSpecialty);
