import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnchorComponent from "../../../admin/components_admin/elements/AnchorComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import LabelTextareaComponent from "../../../admin/components_admin/fields/LabelTextareaComponent";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function ProductUploadPage() {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        image: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    // Hàm kiểm tra các trường thông tin
    const validateForm = () => {
        const { name, description, price, image } = productData;

        // Kiểm tra các trường có bị trống không
        if (!name || !description || !price || !image) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return false;
        }

        // Kiểm tra giá trị price là số
        if (isNaN(price) || Number(price) <= 0) {
            toast.error("Giá phải là một số hợp lệ và lớn hơn 0!");
            return false;
        }

        // Kiểm tra định dạng URL của image
        const urlPattern = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\.\-]*)*\/?$/;
        if (!urlPattern.test(image)) {
            toast.error("URL của hình ảnh không hợp lệ!");
            return false;
        }

        return true;
    };

    // Hàm gửi yêu cầu POST để tạo sản phẩm mới
    const createProduct = async () => {
        if (!validateForm()) return; // Kiểm tra thông tin trước khi gửi yêu cầu
        
        try {
            const response = await api.post("http://localhost:8080/api/product", productData);
            console.log("Product created:", response.data);
            // Reset lại form sau khi tạo thành công
            setProductData({
                name: "",
                description: "",
                price: "",
                image: ""
            });
            toast.success("Tạo sản phẩm thành công!");
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Product Create</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Products</Link></li>
                                <li className="mc-breadcrumb-item">Product Create</li>
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
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Name"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelTextareaComponent
                                    label="Description"
                                    fieldSize="mb-4 w-100 h-text-md"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Price"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelFieldComponent
                                    type="text"
                                    label="Image"
                                    fieldSize="mb-4 w-100 h-md"
                                    name="image"
                                    value={productData.image}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <AnchorComponent
                            className="mc-btn w-100 primary mt-5"
                            text="Create"
                            icon="cloud_upload"
                            to="#"
                            onClick={createProduct} // Gọi hàm createProduct khi nhấn "Create"
                        />
                    </div>
                </Col>
            </Row>
            <ToastContainer />
            <Footer />
        </div>
    )
}
