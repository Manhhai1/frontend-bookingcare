import React, { Component } from 'react';
import { connect } from "react-redux";
import './RoleBookingCare.scss'
class RoleBookingCare extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {

        return (
            <div className="role-booking-care">
                <div className="content" id='content-role'>
                    <h6>Giúp bệnh nhân chọn đúng bác sĩ giỏi và đặt lịch nhanh chóng.</h6>
                    <ul>
                        <li>Hệ thống bác sĩ chuyên khoa giỏi, uy tín</li>
                        <li>Thông tin về bác sĩ đã được xác thực rõ ràng, chính xác</li>
                        <li>Sắp xếp khám đúng bác sĩ mà bệnh nhân đã chọn đặt lịch</li>
                        <li>Bảo vệ quyền lợi của bệnh nhân khi đi khám</li>
                        <li>Miễn phí đặt lịch.</li>
                    </ul>
                    <h6>Hỗ trợ trước, trong và sau khi đi khám.</h6>
                    <p>Trước khám</p>
                    <ul>
                        <li>Nhắc lịch khám, dặn dò chuẩn bị trước khám</li>
                        <li>Hướng dẫn đi lại, quy trình làm thủ tục khám</li>
                    </ul>
                    <p>Trong khi khám</p>
                    <ul>
                        <li>Hỗ trợ giải quyết các vướng mắc trong khi khám</li>
                        <li>Hỗ trợ người bệnh những yêu cầu nảy sinh</li>
                    </ul>
                    <p>Sau khi khám</p>
                    <ul>
                        <li>Ghi nhận ý kiến của bệnh nhân sau khám</li>
                        <li>Hỗ trợ giải đáp, làm rõ những vấn đề chuyên môn</li>
                        <li>Bảo vệ quyền lợi của bệnh nhân khi đi khám</li>
                    </ul>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleBookingCare);
