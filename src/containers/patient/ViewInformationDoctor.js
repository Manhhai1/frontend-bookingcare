import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ViewInformationDoctor.scss'
import { getInformationDoctor } from '../../services/doctorService';
class ViewInformationDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                Markdown: {
                    description: '',
                    contentHTML: '',
                    contentMarkdown: ''
                }
            }
        }
    }

    async componentDidMount() {
        let dataDoctor = await getInformationDoctor(this.props.match.params.id)
        let data = dataDoctor.data
        this.setState({
            data: data
        })
    }
    convertTypeImage = (image) => {
        let imageConvert
        if (image) {
            const imageBuffer = new Buffer(image, 'base64').toString('binary');
            imageConvert = imageBuffer.toString('base64')
        }
        return imageConvert;
    }
    render() {
        console.log(this.props.match.params.id)
        console.log(this.state.data)
        return (
            this.state.data && <div>
                <div className="header"></div>
                <div className="content-view-information">
                    <div className="text-information-doctor">
                        <div className='avatar-doctor'>
                            <img src={this.convertTypeImage(this.state.data.image)} alt="" />
                        </div>
                        <div className="information">
                            {
                                this.state.data.positionData &&
                                this.state.data.lastName &&
                                this.state.data.firstName &&
                                <h4>{`${this.state.data.positionData.valueVi} 
                                ${this.state.data.lastName} 
                                ${this.state.data.firstName}`}</h4>
                            }
                            <div className="doctor-summary">
                                {this.state.data.Markdown.description}
                            </div>
                            <div className="doctor-fb">
                                <button className='button'>Like</button>
                                <button className='button'>Share</button>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="schedule-examination">
                            <select name="date-examinates" id="date-examinates">
                                <option className="option" name='data-examinates' value="">Hom nay -2/2</option>
                                <option className="option" name='data-examinates' value="">Hom nay -2/2</option>
                                <option className="option" name='data-examinates' value="">Hom nay -2/2</option>
                                <option className="option" name='data-examinates' value="">Hom nay -2/2</option>
                            </select>
                            <h4>LICH KHAM</h4>
                            <div className="hours-examinates">
                                <button className='hour'>14:00 - 14:30</button>
                                <button className='hour'>14:00 - 14:30</button>
                                <button className='hour'>14:00 - 14:30</button>
                                <button className='hour'>14:00 - 14:30</button>
                                <button className='hour'>14:00 - 14:30</button>
                                <button className='hour'>14:00 - 14:30</button>
                            </div>
                        </div>
                        <div className="address-examination">
                            <h5>ĐỊA CHỈ KHÁM</h5>
                            <p><b>Phòng khám Chuyên khoa Da Liễu</b></p>
                            207 Phố Huế - Hai Bà Trưng - Hà Nội <br />
                            <div className='price'>
                                <h5>GIÁ KHÁM</h5>
                            </div>
                            <h5>LOẠI BẢO HIỂM ÁP DỤNG</h5>
                        </div>
                    </div>
                </div>
                <div className="section-information-doctor">
                    <div dangerouslySetInnerHTML={{ __html: this.state.data.Markdown.contentHTML }}></div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewInformationDoctor);
