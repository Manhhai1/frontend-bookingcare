import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ModalEditSpecialty from './ModalEditSpecialty'
import ModalCreateNewSpecialty from './ModalCreateNewSpecialty';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { deleteSpecialty, getAllSpecialties } from '../../../../services/specialtySevice';
import './specialtyManage.scss'
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class SpecialtyManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isOpenEditModal: false,
            idEditModal: 0,
            specialties: []
        }
    }

    async componentDidMount() {
        let data = await getAllSpecialties()
        await this.setState({
            specialties: data.specialties
        })
        await this.formatSpecialties(data.specialties)
    }
    handleClickNewSpecialty = () => {
        this.setOpenModalCreateSpecialty()
        console.log(this.state.isOpenModal)

    }
    formatSpecialties = async (specialties) => {
        await specialties.forEach((ele, index) => {
            if (ele.image) {
                const imageBuffer = new Buffer(ele.image, 'base64').toString('binary')
                ele.image = imageBuffer.toString('base64')
            }
        });
        this.setState({
            ...specialties
        })
    }
    setOpenModalCreateSpecialty = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    setHandleOpenEditSpecialtyModal = (id) => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
            idEditModal: id
        })
    }

    handleDeleteSpecialty = async (id) => {
        await deleteSpecialty(id)
        let data = await getAllSpecialties()
        await this.setState({
            specialties: data.specialties
        })
        await this.formatSpecialties(data.specialties)
        toast.success('delete specialty success')
    }

    render() {
        let language = this.props.language
        console.log(this.state.specialties)
        return (
            <div>
                <div className="title text-center"><h3>Manage Specialty</h3></div>
                <ModalCreateNewSpecialty isOpen={this.state.isOpenModal}
                    setOpenModal={this.setOpenModalCreateSpecialty}

                />
                <ModalEditSpecialty
                    isOpen={this.state.isOpenEditModal}
                    openEditModal={this.setHandleOpenEditSpecialtyModal}
                    id={this.state.idEditModal}
                >
                </ModalEditSpecialty>
                <button type="button" className="btn btn-primary mt-3 mx-2" style={{ width: '200px' }} onClick={() => this.handleClickNewSpecialty()}>Add New Specialty</button>
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
                            this.state.specialties.map((item, index) => {
                                return (
                                    <tr key={item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td className='content-specialty'>{item.description}</td>
                                        <td><img style={{ height: '120px' }} src={item.image} alt="" /></td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteSpecialty(item.id)}>Delete</button>
                                            <button type="button" onClick={() => this.setHandleOpenEditSpecialtyModal(item.id)} className="btn btn-warning">Update</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
