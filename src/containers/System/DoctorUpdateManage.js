import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import * as actions from '../../store/actions/adminActions'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorUpdateManage.scss'
import { postInformationDoctor } from '../../services/doctorService';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


// Finish!


class DoctorUpdateManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            arrDoctors: [],
            listDoctors: []
        }
    }

    componentDidMount() {
        this.props.getAllDoctors()
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
        this.props.postInformationDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHtml,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
        console.log(this.state)
    }
    render() {
        let language = this.props.language

        console.log(this.state.arrDoctors)
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
                <button type="button" class="btn btn-primary" onClick={this.handleSaveContentMarkdown}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorUpdateManage);
