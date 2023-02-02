import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
class Header extends Component {

    handleClickChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo)
        return (
            <div className="header-container">

                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className='button'>
                    <div className="text"><FormattedMessage id={"home-header.welcome"}></FormattedMessage>
                        <div className="name">{userInfo && userInfo.firstName ? userInfo.firstName : ''}</div>
                    </div>
                    <div className="language">
                        <div className={language === 'vi' ? 'language-VI active' : 'language-VI'}
                            onClick={() => this.handleClickChangeLanguage(LANGUAGES.VI)}>Vi</div>
                        <div className={language === 'en' ? 'language-EN active' : 'language-EN'}
                            onClick={() => this.handleClickChangeLanguage(LANGUAGES.EN)}>En</div>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className={"fas fa-sign-out-alt"}></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
