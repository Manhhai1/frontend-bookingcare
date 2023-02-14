import React, { Component } from 'react';
import { connect } from "react-redux"
import { getAllHistories } from '../../../services/doctorService';
import './History.scss'
class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            histories: []
        }
    }
    async componentDidMount() {
        let data = await getAllHistories()
        this.setState({
            histories: data.histories
        })
    }
    render() {

        return (
            <React.Fragment>
                <div className="history-container">
                    <div className="header-history">
                        <h5>Lịch sử khám bệnh</h5>
                    </div>
                    <div className="content-history">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Mã bác sĩ</th>
                                    <th scope="col">Mã bệnh nhân</th>
                                    <th scope="col">Thông tin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.histories.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.doctorId}</td>
                                                <td>{item.patientId}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(History);
