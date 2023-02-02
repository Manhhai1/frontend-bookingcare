import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userIsAuthenticated } from '../../../hoc/authentication';
import { getAllcode, createNewUserFromSevice } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions/adminActions'
import './UserRedux.scss'
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkDoctor: false,
            arrGender: [],
            arrPosition: [],
            arrRole: [],

            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                gender: '',
                roleId: '',
                position: ''
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.genderReduxs !== this.props.genderReduxs) {
            this.setState({
                arrGender: this.props.genderReduxs
            })
        }
        if (prevProps.positionType !== this.props.positionType) {
            this.setState({
                arrPosition: this.props.positionType
            })
        }
        if (prevProps.roleType !== this.props.roleType) {
            this.setState({
                arrRole: this.props.roleType
            })
        }
    }
    componentDidMount() {
        console.log(this.state.user)
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        window.addEventListener('load', function () {
            document.querySelector('input[type="file"]').addEventListener('change', function () {
                if (this.files && this.files[0]) {
                    let img = document.querySelector('#myImg');
                    img.onload = () => {
                        URL.revokeObjectURL(img.src);  // no longer needed, free memory
                    }

                    img.src = URL.createObjectURL(this.files[0]); // set src to blob url
                }
            });
        });

    }
    handleRoleOnChange = (e) => {
        this.handleInputOnchange(e, 'roleId')
        if ("R2" === document.getElementById('selectRoleId').value) {
            this.setState({
                checkDoctor: true
            })
        }
        else {
            this.setState({
                checkDoctor: false
            })
        }
    }
    handleInputOnchange = (e, type) => {
        let copyUser = this.state.user
        copyUser[type] = e.target.value
        this.setState({
            ...copyUser
        })
    }
    checkInput = ()=>{
        let copyUser =this.state.user
    }
    HandleCreateNewUser = () => {
        this.checkInput()
        return new Promise(async(resolve, reject)=>{
            try {
                await createNewUserFromSevice(this.state.user)  
                resolve()
    
            } catch (error) {
                reject(error)
            }
        })
    }
    render() {

        let language = this.props.language
        return (<>
            <div className="user-redux">
                <div className="text-center" ><h4>Manage UserRedux</h4></div>
                <div class='form'>
                    <p class='field required half'>
                        <label class='label required' for='firstName'><FormattedMessage id={'manage-user.firstName'}></FormattedMessage> </label>
                        <input
                            class='text-input'
                            id='firstName' name='firstName'
                            required type='text' value={this.state.user.firstName}
                            onChange={(e) => this.handleInputOnchange(e, 'firstName')}
                        />
                    </p>
                    <p class='field required half'>
                        <label class='label required' for='lastName'><FormattedMessage id={'manage-user.lastName'}></FormattedMessage></label>
                        <input
                            class='text-input'
                            id='lastName' name='lastName'
                            required type='text'
                            value={this.state.user.lastName}
                            onChange={(e) => this.handleInputOnchange(e, 'lastName')}
                        />
                    </p>
                    <p class='field  half'>
                        <label class='label required' for='lastName'><FormattedMessage id={'manage-user.email'}></FormattedMessage></label>

                        <input
                            class='text-input'
                            id='email'
                            name='email'
                            type='email'
                            value={this.state.user.email}
                            onChange={(e) => this.handleInputOnchange(e, 'email')}
                        />
                    </p>
                    <p class='field half'>
                        <label class='label' for='password'><FormattedMessage id={'manage-user.password'}></FormattedMessage></label>
                        <input
                            class='text-input'
                            id='password'
                            name='password'
                            type='password'
                            value={this.state.user.password}
                            onChange={(e) => this.handleInputOnchange(e, 'password')}
                        />
                    </p>
                    <p class='field half'>
                        <label class='label' for='phoneNumber'><FormattedMessage id={'manage-user.phoneNumber'}></FormattedMessage></label>
                        <input
                            class='text-input'
                            name='phoneNumber'
                            id='phoneNumber'
                            type='text'
                            value={this.state.user.phoneNumber}
                            onChange={(e) => this.handleInputOnchange(e, 'phoneNumber')}
                        />
                    </p>
                    <p class='field half'>
                        <label class='label' for='address'><FormattedMessage id={'manage-user.address'}></FormattedMessage></label>
                        <input
                            class='text-input'
                            id='address'
                            name='address'
                            type='text'
                            value={this.state.user.address}
                            onChange={(e) => this.handleInputOnchange(e, 'address')} />
                    </p>
                    <p class='field half'>
                        <label class='label' for='selectGender'><FormattedMessage id={'manage-user.gender'}></FormattedMessage></label>
                        <select
                            class='select'
                            id='select'
                            value={this.state.user.gender}
                            onChange={(e) => this.handleInputOnchange(e, 'gender')}
                        >{
                                this.state.arrGender.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </p>
                    <p class='field half'>
                        <label class='label' for='select'><FormattedMessage id={'manage-user.roleId'}></FormattedMessage></label>
                        <select
                            class='select'
                            id='selectRoleId'
                            value={this.state.user.roleId}
                            onChange={(e) => this.handleRoleOnChange(e)}

                        >
                            {
                                this.state.arrRole.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>

                    </p>
                    {
                        this.state.checkDoctor && <p class='field'>
                            <label class='label' for='select'><FormattedMessage id={'manage-user.posittion'}></FormattedMessage></label>
                            <select class='select' id='selectPosition' value={this.state.user.position}
                                onChange={(e) => this.handleInputOnchange(e, 'position')}>
                                {
                                    this.state.arrPosition.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </p>
                    }

                    <p class='field half avatar'>
                        <label class='label' forHtml='image'><FormattedMessage id={'manage-user.image'}></FormattedMessage></label>
                        <label htmlFor="file" className='upload-img'>Tải ảnh lên</label>
                        <input type="file" style={{}} id='file' />
                        <div>
                            <img id="myImg" src="#"></img>
                        </div>
                    </p>

                    <p class='field '>
                        <button onClick={() => this.HandleCreateNewUser()}><FormattedMessage id={'manage-user.save'}></FormattedMessage></button>
                    </p>
                </div>

            </div>
        </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderReduxs: state.admin.genders,
        positionType: state.admin.positions,
        roleType: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
