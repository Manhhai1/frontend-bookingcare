import React, { Component } from 'react';
import { connect } from "react-redux";
import './ModalBooking.scss'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { postBookingFromPatient } from '../../services/patientSevice';
class ModalBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            paymentId: '',
            genderId: 'M',
            namePatient: null,
            phoneNumber: '',
            doctorId: '',
            patientId: '',
            scheduleId: '',
            provinceId: 'PRO1',
            dayofbirth: '',
            address: ''
        }
    }
    handleOnChangeItem(item, e) {
        let state = this.state
        state[item] = e.target.value
        this.setState({
            ...state
        })
    }
    handleOnChangePhoneNumber(e) {
        let state = this.state
        state['phoneNumber'] = e.target.value
        state['patientId'] = e.target.value
        this.setState({
            ...state
        })
    }
    handleCancel = (e) => {
        this.toggle()
    }
    checkData = async () => {
        let arr = ['namePatient', 'phoneNumber', 'dayofbirth', 'address']
        let check = true
        await arr.forEach((item, index) => {
            if (!this.state[item]) {
                check = false
            }
        })
        return check
    }
    handleAccept = async (e) => {
        this.setState({
            scheduleId: this.props.scheduleId,
            paymentId: this.props.doctorInfor.paymentId,
            doctorId: this.props.doctorInfor.doctorId
        })
        let checkData = await this.checkData()
        if (checkData === true) {
            postBookingFromPatient(this.state)
            console.log(this.state)
            toast.success("Đặt lịch khám hoàn tất")
            this.toggle()

        }
        else {
            let arr = ['namePatient', 'phoneNumber', 'dayofbirth', 'address']
            let arr1 = ['Trường tên bệnh nhân', 'Trường số điện thoại', 'Trường ngày sinh', 'Trường địa chỉ']
            await arr.forEach((item, index) => {
                if (!this.state[item]) {
                    toast.error(arr1[index] + ' không được để trống')
                }
            })
        }
    }
    toggle = () => {
        this.props.setOpenModal()
    }
    componentDidMount() {

    }
    render() {
        console.log(this.props.doctorInfor)
        console.log(this.props.isOpenModal)
        return (
            <React.Fragment>

                <Modal
                    isOpen={this.props.isOpenModal}
                    size='lg'
                    centered
                    toggle={() => this.toggle()}
                >
                    <ModalHeader><h4>Đặt lịch khám</h4>{
                        this.props.doctorInfor && this.props.doctorInfor.priceData && <h5>Giá tiền:  {this.props.doctorInfor.priceData.valueVi}</h5>
                    }
                    </ModalHeader>
                    <ModalBody >
                        <input type="text"
                            className="form-control input"
                            placeholder="Họ tên bệnh nhân (Bắt buộc)"
                            onChange={(e) => this.handleOnChangeItem('namePatient', e)}
                        />
                        {
                            this.props.genders.typeCode && <select id="gender" className='input form-control'
                                onChange={e => this.handleOnChangeItem('genderId', e)}>
                                {
                                    this.props.genders.typeCode.map((item, index) => {
                                        return <option value={item.keyMap}>{item.valueVi}</option>
                                    }
                                    )
                                }
                            </select>
                        }
                        <input
                            type="text"
                            className="form-control input"
                            placeholder="Số điện thoại liên hệ (bắt buộc)"
                            onChange={(e) => this.handleOnChangePhoneNumber(e)}
                        />
                        <input
                            type="text"
                            className="form-control input"
                            placeholder="Ngày/tháng/năm sinh (Bắt buộc)"
                            onChange={(e) => this.handleOnChangeItem('dayofbirth', e)}
                        />
                        {
                            this.props.provinces.typeCode && <select id="province" className='input form-control'
                                onChange={e => this.handleOnChangeItem('provinceId', e)}>
                                {
                                    this.props.provinces.typeCode.map((item, index) => {
                                        return <option value={item.keyMap}>{item.valueVi}</option>
                                    }
                                    )
                                }
                            </select>

                        }
                        < input
                            type="text"
                            className="form-control input"
                            placeholder="Địa chỉ"
                            onChange={e => this.handleOnChangeItem('address', e)}
                        />
                        {
                            this.props.doctorInfor && this.props.doctorInfor.paymentData &&
                            <input
                                type="text"
                                className="form-control input"
                                value={'Hình thức thanh toán: ' + this.props.doctorInfor.paymentData.valueVi} />
                        }

                        <input
                            type="text"
                            className="form-control "
                            placeholder="Lý do khám"
                            style={{ height: '80px' }}
                            onChange={e => this.handleOnChangeItem('status', e)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={(e) => { this.handleAccept(e) }}>Xác nhận</Button>
                        <Button onClick={(e) => { this.handleCancel(e) }}>Hủy bỏ</Button>
                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        genders: state.admin.genders,
        provinces: state.admin.provinces,
        payments: state.admin.payments
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
