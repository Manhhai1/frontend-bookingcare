import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { LANGUAGES , CommonUtils } from '../../utils';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { connect } from 'react-redux';
import { size } from 'lodash';
import './ModalCreateNewUser.scss'
class CreateNewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                gender: '',
                roleId: '',
                position: '',
                image: null
            },
            arrGender: [],
            arrPosition: [],
            arrRole: [],
        }
        this.listenToEmitter()
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            let copyUser = {
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
            this.setState({
                user: copyUser,
                arrRole: this.props.roleType
            })
            console.log(this.props.roleType)
        })
    }
    handleOnchangeInput = (e, type) => {
        let copyUser = this.state.user
        copyUser[type] = e.target.value

        this.setState({
            ...copyUser
        })
    }
    componentDidMount() {

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
    toggle = () => {
        this.props.setOpenModal()
    }
    onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let base64 = await CommonUtils.getBase64(img)
            console.log(base64)
            let copyUser = this.state.user
            copyUser['image'] = base64
            this.setState({
                image: URL.createObjectURL(img),
                ...copyUser
            });
        }
    };
    checkValueInput = () => {
        let type = ['email', 'firstName', 'lastName', 'password', 'address', 'gender', 'roleId', 'phoneNumber']
        for (let i = 0; i < type.length; i++) {
            if (!this.state[type[i]]) {
                return false
            }
        }
        return true
    }
    handleClickCreateNewUser = () => {
        let check = this.checkValueInput()
        console.log(this.state.user)
        if (check) {
            toast.success("create User success")
            this.props.createNewUser(this.state.user)
            this.toggle()
        }
        else {
            toast.error("have problem!!")
        }
    }
    render() {
        let language = this.props.language
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.props.setOpenModal() }}
                    size='lg'
                    centered
                >
                    <ModalHeader>Create New User</ModalHeader>
                    <ModalBody className='modal-create-user'>
                        <div className='input'>
                            <label for="email"><FormattedMessage id={'manage-user.email'}></FormattedMessage></label>
                            <input type="text"
                                id='email'
                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                value={this.state.user.email}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="firstName"><FormattedMessage id={'manage-user.firstName'}></FormattedMessage></label>
                            <input type="text"
                                id='firstName'
                                onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                value={this.state.user.firstName}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="lastName"><FormattedMessage id={'manage-user.lastName'}></FormattedMessage></label>
                            <input type="text"
                                id='lastName'
                                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                value={this.state.user.lastName}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="password"><FormattedMessage id={'manage-user.password'}></FormattedMessage></label>
                            <input type="password"
                                id='password'
                                onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                value={this.state.user.password}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="address"><FormattedMessage id={'manage-user.address'}></FormattedMessage></label>
                            <input type="text"
                                id='address'
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                value={this.state.user.address}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="gender"><FormattedMessage id={'manage-user.gender'}></FormattedMessage></label>
                            <select
                                class='select'
                                id='gender'

                                onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                value={this.state.user.gender}
                            >
                                {
                                    this.state.arrGender.map((item, index) => {

                                        return (
                                            <option key={index} value={item.keyMap} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='input'>
                            <label htmlFor="roleId"><FormattedMessage id={'manage-user.roleId'}></FormattedMessage></label>
                            <select
                                class='select'
                                id='selectRoleId'
                                onChange={(e) => this.handleOnchangeInput(e, 'roleId')}

                            >
                                {
                                    this.state.arrRole.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='input'>
                            <label htmlFor="position"><FormattedMessage id={'manage-user.position'}></FormattedMessage></label>
                            <select
                                class='select'
                                id='position'
                                value={this.state.user.position}
                                onChange={(e) => this.handleOnchangeInput(e, 'position')}

                            >
                                {
                                    this.state.arrPosition.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='input'>
                            <label htmlFor="phoneNumber"><FormattedMessage id={'manage-user.phoneNumber'}></FormattedMessage></label>
                            <input type="text"
                                id='phoneNumber'
                                onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className="input">
                            <p class='field half avatar'>
                                <label class='label' forHtml='image'><FormattedMessage id={'manage-user.image'}></FormattedMessage></label>
                                <label htmlFor="file" className='upload-img'>Tải ảnh lên</label>
                                <div>
                                    <img style={{height: '150px'}} src={this.state.image} />
                                    <input type="file" name="myImage" id='file' onChange={this.onImageChange} />
                                </div>
                            </p>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='btn' onClick={() => { this.handleClickCreateNewUser() }}>
                            <FormattedMessage id={'manage-user.save'}></FormattedMessage>
                        </Button>{' '}
                        <Button color="secondary" className='btn' onClick={() => this.toggle()} >
                            <FormattedMessage id={'manage-user.cancel'}></FormattedMessage>
                        </Button>
                    </ModalFooter>
                </Modal>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewUser);
