import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import { editUserFromService } from '../../services/userService'
class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEdit:{}
        }
        this.componentDidMount()
    }
    handleOnchangeInput = (e, type) => {
        this.state.userEdit[type] = e.target.value
        this.setState({
            ...this.state
        }, () => {
            console.log(this.state)
        })
    }
     componentDidMount() {
         this.setState({
           userEdit: this.props.userEdit
        })
    }
    toggle = () => {
        this.props.setOpenEditModal()
    }
    checkValueInput = () => {
        let type = ['firstName', 'lastName', 'address']
        for (let i = 0; i < type.length; i++) {
            if (!this.state.userEdit[type[i]]) {
                console.log(type[i], 'is not valid')
                return false;
            }
            break
        }
        return true
    }

    handleClickEditUser = async() => {
        let check = this.checkValueInput()
        if (check) {
            await editUserFromService(this.state.userEdit)
            this.toggle()
        }

    }
    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpenEditModal}
                    toggle={() => { this.toggle() }}
                    size='lg'
                    centered
                >
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody className='modal-create-user'>
                        <div className='input'>
                            <label htmlFor="">FirstName</label>
                            <input type="text"
                                onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                value={this.state.userEdit.firstName}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="">LastName</label>
                            <input type="text"
                                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                value={this.state.userEdit.lastName}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="">Address</label>
                            <input type="text"
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                value={this.state.userEdit.address}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='btn' onClick={() => { this.handleClickEditUser() }}>
                            Edit
                        </Button>{' '}
                        <Button color="secondary" className='btn' onClick={() => this.toggle()} >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
