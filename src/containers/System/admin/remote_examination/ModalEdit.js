import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ModalCreate.scss'
import { LANGUAGES, CommonUtils } from '../../../../utils';
import { toast } from 'react-toastify';
import { getTelemedicineById, updateTelemedicine } from '../../../../services/telemedicineSevice';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEditSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialty: {

            },
            id: '',
            name: '',
            description: '',
            descriptionMarkdown: '',
            image: '',
            imageBase64: ''
        }
    }
    handleOnchangeItem = (e, type) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEditorChange = (e) => {
        console.log(e)
        this.setState({
            description: e.text,
            descriptionMarkdown: e.html
        });
    };
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
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.id !== this.props.id) {
            if (this.props.id) {
                let data = await getTelemedicineById(this.props.id)
                console.log(data)
                if (data.telemedicine.image) {
                    const imageBuffer = new Buffer(data.telemedicine.image, 'base64').toString('binary')
                    data.telemedicine.image = imageBuffer.toString('base64')
                }

                this.setState({
                    description: data.telemedicine.description,
                    descriptionMarkdown: data.telemedicine.descriptionMarkdown,
                    imageBase64: data.telemedicine.image,
                    image: data.telemedicine.image,
                    name: data.telemedicine.name,
                    id: this.props.id
                })
            }

        }
    }
    toggle = () => {
        this.props.openEditModal()
    }
    checkValueInput = () => {

    }

    handleClickModalEditSpecialty = async () => {

    }
    handleEditTelemedicine = async () => {
        let obj = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            descriptionMarkdown: this.state.descriptionMarkdown,
            imageBase64: this.state.imageBase64
        }
        console.log(obj)
        await updateTelemedicine(obj)
        toast.success('update specialty success')
        this.toggle()
    }
    handleCancel = () => {
        this.toggle()
    }
    render() {
        console.log(this.props.id)
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    size='lg'
                    centered
                >
                    <ModalHeader><h4>Edit Telemedicine</h4></ModalHeader>
                    <ModalBody className='modal-create-specialty'>
                        <input type="text"
                            className='form-control'
                            style={{ height: '40px' }}
                            placeholder='Name Specialty'
                            value={this.state.name}
                            onChange={(e) => this.handleOnchangeItem(e, 'name')}
                        />
                        <MdEditor style={{ height: '250px', width: '100%' }} className='editor-description'
                            renderHTML={text => mdParser.render(text)}
                            value={this.state.description}
                            onChange={(e) => this.handleEditorChange(e)} />

                        <div className='avatar-specialty'>

                            <label id='label-avatar' for="file">Tải ảnh lên</label>
                            <img style={{ height: '130px' }} src={this.state.image} />
                            <input type="file" name="myImage" id='file' onChange={this.onImageChange} className='avatar-input' />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleEditTelemedicine}>Cập nhật</Button>
                        <Button onClick={this.handleCancel}>Hủy bỏ</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSpecialty);
