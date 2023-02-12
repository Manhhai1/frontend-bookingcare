import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminActions'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorUpdateInformationManage.scss'
import { postInformationDoctor, postDoctorInfor } from '../../../services/doctorService';
import { toast } from 'react-toastify';
import { getAllcode } from '../../../services/userService';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


// Finish!


class DoctorUpdateInformationManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: {},
            selectedPrice: {},
            selectedPayment: {},
            selectedProvince: {},
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            arrDoctors: [],
            listDoctors: [],
            price: [],
            addressClinic: '',
            nameClinic: '',
            note: '',
            count: '',
            payment: [],
            province: [],
            status: []
        }
    }

    async componentDidMount() {
        await this.props.getAllDoctors()
        let data = await getAllcode('all')
        let price = []
        let payment = []
        let province = []
        let status = []
        await data.typeCode.map((item, index) => {
            if (item.type === 'PRICE') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                price.push(obj)
            }
            if (item.type === 'PAYMENT') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                payment.push(obj)
            }
            if (item.type === 'PROVINCE') {
                let obj = {}
                obj.value = item.keyMap
                obj.label = item.valueVi
                province.push(obj)
            }
            if (item.type === 'STATUS') {
                status.push(item)
            }
        })
        this.setState({
            price: price,
            payment: payment,
            province: province,
            status: status,

        })
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.arrDoctors !== this.props.arrDoctors) {
            let options = this.buildDataInputSelect(this.props.arrDoctors.allDoctors)
            this.setState({
                arrDoctors: this.props.arrDoctors.allDoctors,
                listDoctors: options
            })
        }
    }
    buildDataInputSelect = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {}
                obj.label = `${item.lastName} ${item.firstName}`
                obj.value = item.id
                result.push(obj)
            })
        }
        console.log(result)
        return result
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
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
    handleSaveContentMarkdown = () => {
        try {
            let obj1 = {
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHtml,
                description: this.state.description,
                doctorId: this.state.selectedOption.value
            }
            let obj = {
                doctorId: this.state.selectedOption.value,
                priceId: this.state.selectedPrice.value,
                provinceId: this.state.selectedProvince.value,
                paymentId: this.state.selectedPayment.value,
                addressClinic: this.state.addressClinic,
                nameClinic: this.state.nameClinic,
                note: this.state.note,
                count: this.state.count
            }
            let arr = ['doctorId', 'priceId', 'provinceId', 'paymentId', 'addressClinic', 'nameClinic', 'note', 'count']
            let arr1 = ['doctorId', 'contentMarkdown', 'contentHTML', 'description']
            let objPostDoctorInfor = {}
            let objPostMarkdown = {}
            arr.map((item, index) => {
                if (obj[item]) objPostDoctorInfor[item] = obj[item]
            })
            postDoctorInfor(objPostDoctorInfor)
            arr1.map((item, index) => {
                if (obj1[item]) objPostMarkdown[item] = obj1[item]
            })
            console.log(objPostMarkdown)
            console.log(objPostDoctorInfor)
            postInformationDoctor(objPostMarkdown)
        } catch (error) {
            console.log(error)
        }

        toast.success('post data success')

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
    render() {
        let language = this.props.language
        console.log(this.state)
        return (
            <div>
                <div className="title-text-center"><h3>Manage Update Information Doctor</h3></div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label htmlFor="">Chọn Bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}

                        />

                    </div>
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
                            onChange={(e) => this.handleOnChangeAddressClinic(e)} />
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
                        onChange={this.handleEditorChange} />
                </div>
                {

                    <button type="button" class="btn btn-primary"
                        onClick={this.handleSaveContentMarkdown}>Save</button>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchGetAllDoctorsStart()),
        postInformationDoctor: (data) => dispatch(actions.fetchPostInformationDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorUpdateInformationManage);
