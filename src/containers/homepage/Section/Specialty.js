import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick"
import './Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialties } from '../../../services/specialtySevice';
import { LANGUAGES, path } from '../../../utils';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialties: []
        }
    }
    async componentDidMount() {
        let data = await getAllSpecialties()
        this.setState({
            specialties: data.specialties
        })
    }
    convertTypeImage = (image) => {
        let imageConvert
        if (image) {
            const imageBuffer = new Buffer(image, 'base64').toString('binary');
            imageConvert = imageBuffer.toString('base64')
        }
        return imageConvert;
    }
    handleViewSpecialty = (id) => {
        this.props.history.push(`/view-specialty/${id}`)
    }
    handleClickViewMoreSpecialties = () => {
        this.props.history.push(path.VIEW_MORE_SPECIALTY)
    }
    render() {
        console.log(this.state.specialties)
        let language = this.props.language
        let settings = this.props.settings
        return (
            <div className='specialty-section'>
                <div className="text-specialties">
                    <h3 className='popular-specialty'>Chuyên khoa phổ biến</h3>
                    <button className='button-more' onClick={this.handleClickViewMoreSpecialties}><h6>Xem thêm</h6></button>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>
                        {this.state.specialties && this.state.specialties.length > 0 &&
                            this.state.specialties.map((item, index) => {
                                return (
                                    <div className="img-customize" onClick={() => this.handleViewSpecialty(item.id)}>

                                        <img src={this.convertTypeImage(item.image)} alt="" />

                                        {
                                        }
                                        <h6>{`${item.name}`}</h6>
                                    </div>

                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
