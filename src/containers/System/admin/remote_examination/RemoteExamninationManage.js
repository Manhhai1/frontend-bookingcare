import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ModalEdit from './ModalEdit'
import ModalCreate from './ModalCreate';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './RemoteExamninationManage.scss'
import { deleteTelemedicine, getAllTelemedicine } from '../../../../services/telemedicineSevice';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class RemoteExamninationManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isOpenEditModal: false,
            idEditModal: 0,
            telemedicines: []
        }
    }

    async componentDidMount() {
        let data = await getAllTelemedicine()
        this.setState({
            telemedicines: data.telemedicines
        })
        this.formatImage(data.telemedicines)
    }
    handleClickNewTelemedicine = () => {
        this.setOpenModalCreate()

    }
    formatImage = (images) => {
        images.forEach((ele, index) => {
            if (ele.image) {
                const imageBuffer = new Buffer(ele.image, 'base64').toString('binary')
                ele.image = imageBuffer.toString('base64')
            }
        });
        this.setState({
            ...images
        })
    }
    setOpenModalCreate = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    setHandleOpenEdit = (id) => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
            idEditModal: id
        })
    }

    handleDeleteTelemedicine = async (id) => {
        await deleteTelemedicine(id)
        let data = await getAllTelemedicine()
        this.formatImage(data.telemedicines)
        this.setState({
            telemedicines: data.telemedicines
        })
        toast.success('delete specialty success')
    }

    render() {
        let language = this.props.language
        return (
            <div>
                <div className="title text-center"><h3>Manage Telemedicine</h3></div>
                <ModalCreate isOpen={this.state.isOpenModal}
                    setOpenModal={this.setOpenModalCreate}

                />
                <ModalEdit
                    isOpen={this.state.isOpenEditModal}
                    openEditModal={this.setHandleOpenEdit}
                    id={this.state.idEditModal}
                />
                <button type="button" className="btn btn-primary mt-3 mx-2" style={{ width: '200px' }} onClick={() => this.handleClickNewTelemedicine()}>Add New Telemedicine</button>
                <table id="customers" className="mt-3 mx-2 table-wrapper-scroll-y my-custom-scrollbar " >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            this.state.telemedicines && this.state.telemedicines.map((item, index) => {
                                return (
                                    <tr key={item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td className='content-specialty'>{item.description}</td>
                                        <td><img style={{ height: '120px' }} src={item.image} alt="" /></td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteTelemedicine(item.id)}>Delete</button>
                                            <button type="button" onClick={() => this.setHandleOpenEdit(item.id)} className="btn btn-warning">Update</button>
                                        </td>
                                    </tr>
                                )

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

export default connect(mapStateToProps, mapDispatchToProps)(RemoteExamninationManage);
