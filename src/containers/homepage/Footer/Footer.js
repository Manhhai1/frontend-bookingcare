import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Footer.scss'
class Footer extends Component {

    render() {
        return (
            <div className='footer'>
                <div className="content-footer">
                    <div className="certification">
                        <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" />
                        <h5>Công ty Cổ phần Công nghệ BookingCare</h5>
                        <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                        <p>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                        <div className="icon">
                            <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" />
                            <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="" />
                        </div>
                    </div>
                    <div className="contact">
                        <ul>
                            <li> <a href="">Liên hệ hợp tác</a></li>
                            <li> <a href="">Gói chuyển đổi số doanh nghiệp</a></li>
                            <li> <a href="">Tuyển dụng</a></li>
                            <li><a href="">Câu hỏi thường gặp</a></li>
                            <li> <a href="">Điều khoản sử dụng</a></li>
                            <li> <a href="">Chính sách Bảo mật</a></li>
                            <li><a href="">Quy trình hỗ trợ giải quyết khiếu nại</a></li>
                            <li><a href="">Quy chế hoạt động</a></li>
                        </ul>
                    </div>
                    <div className="address">
                            <div className="headquarters item">
                                    <h5>Trụ sở tại Hà Nội</h5>
                                    <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                            </div>
                            <div className="office item">
                                    <h5>Văn phòng tại TP Hồ Chí Minh</h5>
                                    <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            </div>
                            <div className="support item">
                                    <h5>Hỗ trợ khách hàng</h5>
                                    <p>support@bookingcare.vn (7h - 18h)</p>
                            </div>
                    </div>

                </div>
                <div className="app">
                    Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: <a href="">Android</a> - <a href="">Iphone/Ipad</a> - <a href="">Khác</a>
                </div>
                <div className="footer-bottom">
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
