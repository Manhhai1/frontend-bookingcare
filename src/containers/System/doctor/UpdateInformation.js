import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminActions'
import 'react-markdown-editor-lite/lib/index.css';
import './UpdateInformation.scss'
import { getInformationDoctor, postDoctorInfor, postInformationDoctor, updateInforDoctor } from '../../../services/doctorService';
import { toast } from 'react-toastify';
import { getAllcode } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


// Finish!


class DoctorUpdateInformationManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            description: '',
            contentMarkdown: '',
            contentHTML: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            count: '',
            price: [],
            payment: [],
            province: [],
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null

        }
    }

    async componentDidMount() {

        let data = await getInformationDoctor(this.props.userInfo.id)
        let allcodes = await getAllcode('all')
        console.log(allcodes)
        let price = []
        let payment = []
        let province = []
        let status = []
        await allcodes.typeCode.map((item, index) => {
            if (item.type === 'PRICE') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                if (item.keyMap === data.data.doctorData.priceId) {
                    this.setState({
                        selectedPrice: obj
                    })
                }
                price.push(obj)
            }
            if (item.type === 'PAYMENT') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                if (item.keyMap === data.data.doctorData.paymentId) {
                    this.setState({
                        selectedPayment: obj
                    })
                }
                payment.push(obj)
            }
            if (item.type === 'PROVINCE') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                if (item.keyMap === data.data.doctorData.provinceId) {
                    this.setState({
                        selectedProvince: obj
                    })
                }
                province.push(obj)
            }
            if (item.type === 'STATUS') {
                status.push(item)
            }
        })
        this.setState({
            userInfo: this.props.userInfo,
            nameClinic: data.data.doctorData.nameClinic,
            addressClinic: data.data.doctorData.addressClinic,
            specialtyId: data.data.doctorData.specialtyId,
            description: data.data.Markdown.description,
            contentHTML: data.data.Markdown.contentHTML,
            contentMarkdown: data.data.Markdown.contentMarkdown,
            price: price,
            payment: payment,
            province: province
        })
        console.log(data)
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
    }
    handleOnchangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html
        })
    }

    handleOnChangeChoicePrice = (e) => {
        this.setState({
            selectedPrice: e
        })
    }
    handleOnChangeChoicePayment = (e) => {
        this.setState({
            selectedPayment: e
        })
    }
    handleOnChangeAddressClinic = (e) => {
        this.setState({
            addressClinic: e.target.value
        })
    }
    handleOnChangeChoiceProvince = (e) => {
        console.log(e.value)
        this.setState({
            selectedProvince: e
        })
    }
    handleOnChangeNameClinic = (e) => {
        this.setState({
            nameClinic: e.target.value
        })
    }
    handleOnChangeNote = (e) => {
        this.setState({
            note: e.target.value
        })
    }
    handleOnChangeSpecialty = (e) => {
        this.setState({
            specialtyId: e.target.value
        })
    }
    handleUpdateInfor = async () => {
        let obj = {
            id: this.state.userInfo.id,
            priceId: this.state.selectedPrice.value,
            provinceId: this.state.selectedProvince.value,
            paymentId: this.state.selectedPayment.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
            count: this.state.count,
            specialtyId: this.state.specialtyId,
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHtml,
            description: this.state.description,
        }
        let arr = ['id', 'priceId', 'provinceId', 'paymentId', 'addressClinic',
            'nameClinic', 'note', 'count', 'specialtyId', 'contenMarkdown', 'contentHTML', 'description']
        let objPostDoctorInfor = {}
        arr.map((item, index) => {
            if (obj[item]) objPostDoctorInfor[item] = obj[item]
        })
        console.log(objPostDoctorInfor)
        await updateInforDoctor(objPostDoctorInfor)
        toast.success('post data success')
    }
    render() {
        let language = this.props.language
        console.log(this.state)
        return (
            <div>
                <div className="title-text-center"><h3>Update Information Doctor</h3></div>
                <div className="more-infor">
                    <div className="section-price form-group">
                        <label htmlFor="">Phương thức thanh toán</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={(e) => this.handleOnChangeChoicePayment(e)}
                            options={this.state.payment}

                        />
                    </div>
                    <div className="form-of-payment">
                        <label htmlFor="">Chọn Giá tiền</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={(e) => this.handleOnChangeChoicePrice(e)}
                            options={this.state.price}

                        />
                    </div>
                    <div className="section-province">
                        <label htmlFor="">Tỉnh thành</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={(e) => this.handleOnChangeChoiceProvince(e)}
                            options={this.state.province}

                        />
                    </div>
                    <div className="section-name-clinic width">
                        <label htmlFor="">Tên phòng khám</label>
                        <input
                            type="text"
                            class="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleOnChangeNameClinic(e)}
                        />
                    </div>
                    <div className="section-address-clinic width">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <input
                            type="text"
                            class="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            value={this.state.addressClinic}
                            onChange={(e) => this.handleOnChangeAddressClinic(e)} />
                    </div>
                    <div className="section-address-clinic width">
                        <label htmlFor="">Chuyên khoa</label>
                        <input
                            type="text"
                            class="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            value={this.state.specialtyId}
                            onChange={(e) => this.handleOnChangeSpecialty(e)} />
                    </div>
                    <div className="section-note width">
                        <label htmlFor="">Note</label>
                        <input
                            type="text"
                            class="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            onChange={(e) => this.handleOnChangeNote(e)} />
                    </div>
                    <div className="content-right">
                        <label htmlFor="" >Thông tin giới thiệu</label>
                        <textarea name=""
                            className='form-control'
                            id="" cols="30" rows="10"
                            onChange={(e) => this.handleOnchangeDescription(e)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="content">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                {

                    <button type="button" class="btn btn-primary"
                        onClick={this.handleUpdateInfor}>Update Information</button>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchGetAllDoctorsStart()),
        postInformationDoctor: (data) => dispatch(actions.fetchPostInformationDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorUpdateInformationManage);
