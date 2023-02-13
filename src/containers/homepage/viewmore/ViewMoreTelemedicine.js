import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllTelemedicine } from '../../../services/telemedicineSevice';
import { path } from '../../../utils';
import './ViewMoreTelemedicine.scss'
import icon from '../../../assets/images/icon/download.png'
class ViewMoreTelemedicine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            telemedicines: []
        }
    }
    async componentDidMount() {
        let telemedicines = await getAllTelemedicine()
        console.log(telemedicines)
        this.setState({
            telemedicines: telemedicines.telemedicines
        })
        await this.formatImage(telemedicines.telemedicines)
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
        this.props.history.push('/home')
    }
    handleClickViewTelemedicine = (id) => {
        this.props.history.push(`/view-telemedicine/${id}`)
    }
    render() {
        console.log(this.state.telemedicines)
        return (
            <div className="view-more-container">
                <div className="view-more-header">
                    <img className='icon-back' src={icon} alt="" onClick={this.handleBack} />
                    <h4>Chuyên khoa tư vấn từ xa qua video</h4>
                </div>
                <div className="view-content">
                    {
                        this.state.telemedicines && this.state.telemedicines.map((item, index) => {
                            return (
                                <div className='view-telemedicine' onClick={() => this.handleClickViewTelemedicine(item.id)}>
                                    <img className='image-telemedicine' src={item.image} alt="" />
                                    <div className="name-telemedicine">{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewMoreTelemedicine);
