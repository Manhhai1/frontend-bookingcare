import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import { withRouter } from 'react-router';
import icon from '../../assets/images/icon/download.png'
class Header extends Component {
    handleBack = () => {
        this.props.history.push('/home');
    }
    render() {
        return (
            <div className="header">
                <img className='icon-back' src={icon} alt="" onClick={this.handleBack} />
                <h4>{ this.props.name}</h4>
            </div>
        )

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
