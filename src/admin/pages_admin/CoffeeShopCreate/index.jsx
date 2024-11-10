import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import AnchorComponent from "../../../admin/components_admin/elements/AnchorComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CoffeeShopCreate() {
    const [coffeeShopData, setCoffeeShopData] = useState({
        name: "",
        address: "",
        image: "",
        phone: "",
        openTime: "",
        closeTime: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCoffeeShopData({
            ...coffeeShopData,
            [name]: value
        });
    };

    // Hàm kiểm tra các trường thông tin
    const validateForm = () => {
        const { name, address, image, phone, openTime, closeTime } = coffeeShopData;

        // Kiểm tra các trường có bị trống không
        if (!name || !address || !image || !phone || !openTime || !closeTime) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return false;
        }

        // Kiểm tra định dạng URL của image
        const urlPattern = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\.\-]*)*\/?$/;
        if (!urlPattern.test(image)) {
            toast.error("URL của hình ảnh không hợp lệ!");
            return false;
        }

        // Kiểm tra định dạng giờ của openTime và closeTime
        const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timePattern.test(openTime)) {
            toast.error("Giờ mở cửa không hợp lệ! Định dạng: HH:MM");
            return false;
        }

        if (!timePattern.test(closeTime)) {
            toast.error("Giờ đóng cửa không hợp lệ! Định dạng: HH:MM");
            return false;
        }

        // const phonePattern = /^(\+84|84)?(9[0-9]{8})$/;
        // if (!phonePattern.test(phone)) {
        //     toast.error("Số điện thoại không hợp lệ! Định dạng: +84 912345678");
        //     return false;
        // }

        return true;
    };

    const createCoffeeShop = async () => {
        if (!validateForm()) return; // Kiểm tra thông tin trước khi gửi yêu cầu

        try {
            const response = await api.post("http://localhost:8080/api/coffeeshops/create", coffeeShopData);
            console.log("Coffee shop created:", response.data);
            // Xử lý thành công, ví dụ điều hướng hoặc reset form
            setCoffeeShopData({
                name: "",
                address: "",
                image: "",
                phone: "",
                openTime: "",
                closeTime: ""
            });
            toast.success("Tạo quán cà phê thành công!");
        } catch (error) {
            console.error("Failed to create coffee shop:", error);
            toast.error("Tạo quán cà phê thất bại!");
        }
    };

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Create Coffee Shop</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Coffee Shop</Link></li>
                                <li className="mc-breadcrumb-item">Create Coffee Shop</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">Basic Information</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>Edit</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>Delete</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>Download</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Row>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Name"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="name"
                                    value={coffeeShopData.name}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Address"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="address"
                                    value={coffeeShopData.address}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Image"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="image"
                                    value={coffeeShopData.image}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Phone"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="phone"
                                    value={coffeeShopData.phone}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="time"
                                    label="Open Time"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="openTime"
                                    value={coffeeShopData.openTime}
                                    onChange={handleInputChange}
                                    step="60"  // Đảm bảo rằng người dùng chỉ có thể chọn phút theo từng phút
                                />
                            </Col>
                            <Col xl={6}>
                                <LabelFieldComponent
                                    type="time"
                                    label="Close Time"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="closeTime"
                                    value={coffeeShopData.closeTime}
                                    onChange={handleInputChange}
                                    step="60"
                                />
                            </Col>
                        </Row>
                        <AnchorComponent
                            className="mc-btn w-100 primary mt-5"
                            text="Create"
                            icon="cloud_upload"
                            to="#"
                            onClick={createCoffeeShop} // Gọi hàm createCoffeeShop khi nhấn "Create"
                        />
                    </div>
                </Col>
            </Row>
            <ToastContainer />
            <Footer />
        </div>
    );
}
