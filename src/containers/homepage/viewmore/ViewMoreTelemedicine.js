import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllTelemedicine } from '../../../services/telemedicineSevice';
import { path } from '../../../utils';
import './ViewMoreTelemedicine.scss'
import Header from '../Header';
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
    }

    handleClickViewTelemedicine = (id) => {
        this.props.history.push(`/view-telemedicine/${id}`)
    }
    render() {
        console.log(this.state.telemedicines)
        return (
            <div className="view-more-container">
                <Header name={'Chuyên khoa tư vấn từ xa qua video'}></Header>
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
