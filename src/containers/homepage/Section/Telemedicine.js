import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick"
import './Telemedicine.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllTelemedicine } from '../../../services/telemedicineSevice';
import { LANGUAGES, path } from '../../../utils';
import { withRouter } from 'react-router';

class Telemedicine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            telemedicines: []
        }
    }
    async componentDidMount() {
        let data = await getAllTelemedicine()
        this.setState({
            telemedicines: data.telemedicines
        })
    }

    handleViewTelemedicine = (id) => {
        this.props.history.push(`/view-telemedicine/${id}`)
    }
    handleClickViewMoreTelemedicines = () => {
        this.props.history.push(path.VIEW_MORE_TELEMEDICINE)
    }
    render() {
        console.log(this.state.telemedicines)
        let language = this.props.language
        let settings = this.props.settings
        return (
            <div className='telemedicine-section'>
                <div className="text-telemedicines">
                    <h3 className='popular-telemedicine'>Bác sĩ từ xa qua Video</h3>
                    <button className='button-more' onClick={this.handleClickViewMoreTelemedicines}><h6>Xem thêm</h6></button>
                </div>
                <div className="telemedicine-content">
                    <Slider {...settings}>
                        {this.state.telemedicines && this.state.telemedicines.length > 0 &&
                            this.state.telemedicines.map((item, index) => {
                                return (
                                    <div className="img-customize" onClick={() => this.handleViewTelemedicine(item.id)}>

                                        <img src={item.image} alt="" />

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Telemedicine));
