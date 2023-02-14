import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePageHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, path } from '../../utils'
import { changeLanguage } from '../../store/actions'
import { withRouter } from 'react-router';
class HomePageHeader extends Component {

    ChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    handleClickViewMoreSpecialties = () => {
        this.props.history.push(path.VIEW_MORE_SPECIALTY)
    }
    handleViewMoreTelemedicines = () => {
        this.props.history.push(path.VIEW_MORE_TELEMEDICINE)
    }
    handleViewMoreTopDoctor = () => {
        this.props.history.push(path.VIEW_MORE_DOCTOR)
    }
    render() {
        let language = this.props.language
        let settings = this.props.settings
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">

                            <div className="logo">

                            </div>
                        </div>
                        <div className="mid-content">
                            <div className="mid-content-left" onClick={this.handleClickViewMoreSpecialties}>
                                <h6><FormattedMessage id={"home-header.speciality"} /></h6>
                                <p>Tìm bác sĩ theo chuyên khoa</p>
                            </div>
                            <div className="mid-content-left" onClick={this.handleViewMoreTelemedicines}>
                                <h6>Khám từ xa</h6>
                                <p>Chọn Bác sĩ giỏi</p>
                            </div>
                            <div className="mid-content-left" onClick={this.handleViewMoreTopDoctor}>
                                <h6><FormattedMessage id={"home-header.doctor"} /></h6>
                                <p><FormattedMessage id={"home-header.select-doctor"} /></p>
                            </div>
                            <div className="mid-content-left">
                                <h6><FormattedMessage id={"home-header.fee"} /></h6>
                                <p><FormattedMessage id={"home-header.check-health"} /></p>
                            </div>
                        </div>
                        <div className="right-content">
                            <h5><FormattedMessage id={"home-header.support"} /></h5>
                            <div className={language === 'vi' ? 'language-VN active' : 'language-VN'} onClick={() => this.ChangeLanguage(LANGUAGES.VI)}>VN</div>
                            <div className={language === 'en' ? 'language-EN active' : 'language-EN'} onClick={() => this.ChangeLanguage(LANGUAGES.EN)}>EN</div>
                        </div>
                    </div>
                    <div className="home-header-banner">
                        <div className="text-banner">
                            <div className="text-child-1">
                                <h1><FormattedMessage id={"banner.title1"} /></h1>
                            </div>
                            <div className="text-child-2">
                                <h1><FormattedMessage id={"banner.title2"} /></h1>
                            </div>
                        </div>
                        <div className="search-banner">
                            <div className="input-search">
                                <input type="text" />
                            </div>

                        </div>
                        <div className="options-banner">
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child1"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child2"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child3"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child4"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child5"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child6"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child7"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child8"} /></div>
                            </div>
                            <div className="option">
                                <div className="icon"></div>
                                <div className="text"><FormattedMessage id={"banner.child9"} /></div>
                            </div>


                        </div>
                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguage(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageHeader));
