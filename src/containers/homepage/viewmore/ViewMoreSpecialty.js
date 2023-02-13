import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllSpecialties } from '../../../services/specialtySevice';
import { path } from '../../../utils';
import './ViewMoreSpecialty.scss'
import icon from '../../../assets/images/icon/download.png'
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
        await this.formatImage(specialties.specialties)
    }
    formatImage = async (images) => {
        await images.forEach((ele, index) => {
            if (ele.image) {
                const imageBuffer = new Buffer(ele.image, 'base64').toString('binary')
                ele.image = imageBuffer.toString('base64')
            }
        });
        this.setState({
            ...images
        })
    }
    handleBack = () => {
        this.props.history.push('/home');
    }
    handleClickViewSpecialty = (id) => {
        this.props.history.push(`/view-specialty/${id}`)
    }
    render() {
        console.log(this.state.specialties)
        return (
            <div className="view-more-container">
                <div className="view-more-header">
                    <img className='icon-back' src={icon} alt="" onClick={this.handleBack} />
                    <h4>Chuyên khoa</h4>
                </div>
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
