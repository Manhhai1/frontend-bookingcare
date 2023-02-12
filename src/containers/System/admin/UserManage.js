import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateNewUser from './ModalCreateNewUser'
import { getAllUsers, createNewUserFromSevice, deleteUserFromService } from '../../../services/userService'
import './UserManage.scss'
import { emitter } from '../../../utils/emitter';
import EditUser from './ModalEditUser'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers()
    }
    getAllUsers = async () => {
        let response = await getAllUsers('all');
        await response.allusers.forEach((ele, index) => {
            if (ele.image) {
                const imageBuffer = new Buffer(ele.image, 'base64').toString('binary')
                ele.image = imageBuffer.toString('base64')
            }
        });
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.allusers
            }, () => { console.log(this.state.arrUsers) })
        }
    }
    handleClickNewUser = () => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
        this.setState({
            isOpenModal: true
        })
    }
    setModalUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    setHandleOpenEditUserModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }
    createNewUser = async (data) => {
        try {
            await createNewUserFromSevice(data)
            this.getAllUsers()
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteUser = async (user) => {
        try {
            await deleteUserFromService(user)
            toast.success("Delete User suceess")
            this.getAllUsers()
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser = async (user) => {
        await this.setState({
            isOpenEditModal: true,
            userEdit: user
        })
    }

    render() {
        let language = this.props.language
        return (
            <div>
                <div className="title text-center">Manage users</div>
                <CreateNewUser isOpen={this.state.isOpenModal}
                    setOpenModal={this.setModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModal &&
                    <EditUser
                        isOpenEditModal={this.state.isOpenEditModal}
                        setOpenEditModal={this.setHandleOpenEditUserModal}
                        userEdit={this.state.userEdit}
                    />
                }
                <button type="button" className="btn btn-primary mt-3 mx-2" style={{ width: '200px' }} onClick={() => this.handleClickNewUser()}>Add New Users</button>
                <table id="customers" className="mt-3 mx-2 table-wrapper-scroll-y my-custom-scrollbar " >
                    <thead>
                        <tr>

                            <th><FormattedMessage id={'manage-user.firstName'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.lastName'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.email'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.phoneNumber'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.address'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.gender'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.roleId'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.position'}></FormattedMessage></th>
                            <th><FormattedMessage id={'manage-user.image'}></FormattedMessage></th>
                            <th>SpecialtyId</th>
                            <th><FormattedMessage id={'manage-user.action'}></FormattedMessage></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.roleId}</td>
                                        <td>{item.positionId}</td>
                                        <td><img style={{ height: '70px' }} src={item.image} alt="" /></td>
                                        <td>{item.specialtyId}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning"
                                                onClick={() => { this.handleEditUser(item) }}>Edit</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
