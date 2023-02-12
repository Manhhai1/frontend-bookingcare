import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import { size } from 'lodash';
import './ModalCreateNewSpecialty.scss'
import { postInforSpecialty } from '../../../../services/specialtySevice';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalCreateNewSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            descriptionMarkdown: '',
            image: '',
            imageBase64: '',
            name: ''
        }

    }

    handleOnchangeInput = (e, type) => {

    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }
    toggle = () => {
        this.props.setOpenModal()
    }
    onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let base64 = await CommonUtils.getBase64(img)
            console.log(base64)
            this.setState({
                image: URL.createObjectURL(img),
                imageBase64: base64

            });
        }
    };
    checkValueInput = () => {

    }
    handleClickModalCreateNewSpecialty = async () => {
    }
    handleOnClickCancel = () => {
        this.toggle()
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            description: text,
            descriptionMarkdown: html
        });
    };
    handleCreateNewSpecialty = async () => {
        let arr = ['name', 'descriptionMarkdown', 'imageBase64','description']
        let text = ['Name', 'DescriptionMarkdown', 'Image', 'Description']
        let check = true
        let dataPost = {}
        await arr.map((item, index) => {
            dataPost[item] = this.state[item]
            if (!dataPost[item]) {
                toast.error(`Trường ${text[index]} không được để trống `)
                check = false
            }
        })
        console.log(dataPost)
        console.log(this.state.imageBase64)
        if (check) {
            console.log(1)
            await postInforSpecialty(dataPost)
            toast.success('post specialty success')
            this.toggle()
        }
    }
    handleOnChangeItem = (item, e) => {
        let state = this.state
        state[item] = e.target.value
        this.setState({
            ...state
        })
    }
    render() {
        let language = this.props.language
        console.log(this.state.imageBase64)
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size='lg'
                    centered
                >
                    <ModalHeader><h4>Create New Specialty</h4></ModalHeader>
                    <ModalBody className='modal-create-specialty'>
                        <input type="text"
                            className='form-control'
                            style={{ height: '40px' }}
                            placeholder='Name Specialty'
                            onChange={(e) => this.handleOnChangeItem('name', e)}
                        />
                        <MdEditor style={{ height: '250px', width: '100%' }} className='editor-description'
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />

                        <div className='avatar-specialty'>

                            <label id='label-avatar' for="file">Tải ảnh lên</label>
                            <img style={{ height: '130px' }} src={this.state.image} />
                            <input type="file" name="myImage" id='file' onChange={this.onImageChange} className='avatar-input' />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleCreateNewSpecialty}>Tạo mới</Button>
                        <Button onClick={this.handleOnClickCancel}>Hủy bỏ</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateNewSpecialty);
