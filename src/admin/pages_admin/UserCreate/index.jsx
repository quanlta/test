import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function CreateAccountPage() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
        role: "USER"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    // Hàm kiểm tra các trường thông tin
    const validateForm = () => {
        const { username, password, email, phone } = userData;

        if (!username || !password || !email || !phone) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Email không hợp lệ!");
            return false;
        }

        return true;
    };

    // Hàm gửi yêu cầu POST để tạo tài khoản người dùng mới
    const createUser = async () => {
        if (!validateForm()) return;

        try {
            const response = await api.post("http://localhost:8080/api/account/register", userData);
            console.log("User created:", response.data);
                setUserData({
                    username: "",
                    password: "",
                    email: "",
                    phone: "",
                    role: "USER"
                                        
                });
                toast.success("Tạo tài khoản thành công!");
            
        } catch (error) {
            console.error("Failed to create user:", error);
            if (error.response) {
                console.error("Response data:", error.response.data); // Kiểm tra nội dung phản hồi lỗi từ server
                toast.error(`Lỗi: ${error.response.data.message || "Tạo tài khoản thất bại!"}`);
            } else {
                toast.error("Tạo tài khoản thất bại!");
            }
        }
    };


    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Create User</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">User</Link></li>
                                <li className="mc-breadcrumb-item">Create User</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">User Information</h4>
                        </div>
                        <Row>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Username"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="password"
                                    label="Password"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="email"
                                    label="Email"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="tel"
                                    label="Phone"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <div className="mb-4 w-100 h-md">
                                    <label>Role</label>
                                    <select
                                        name="role"
                                        value={userData.role}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </select>
                                </div>
                            </Col>
                            {/* <Col xl={12}>
                                <LabelFieldComponent
                                    type="url"
                                    label="Facebook URL"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="facebook"
                                    value={userData.facebook}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="url"
                                    label="Github URL"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="github"
                                    value={userData.github}
                                    onChange={handleInputChange}
                                />
                            </Col> */}
                        </Row>
                        <button
                            className="mc-btn w-100 primary mt-5"
                            onClick={createUser} // Gọi hàm createUser khi nhấn nút "Create"
                        >
                            <i className="material-icons">cloud_upload</i> Create
                        </button>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
            <Footer />
        </div>
    );
}
