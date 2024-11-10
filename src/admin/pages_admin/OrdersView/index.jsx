import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function OrdersViewPage() {
    const { id } = useParams();  // Lấy id từ URL
    const [order, setOrder] = useState(null);  // Lưu thông tin đơn hàng
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);  // Lỗi khi gọi API

    const formatDate = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        const formattedDate = new Date(date).toLocaleString('vi-VN', options);
        return formattedDate;
    };
    // Fetch order details khi component render
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get(`/orders/${id}`);
                const orderData = response.data; // Lưu dữ liệu trả về từ API
                setOrder(orderData);
            } catch (error) {
                console.error("Error fetching order details:", error);
                setError("Error fetching order details.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="mc-main active">
            <div className="mc-card mb-4">
                <div className="mc-breadcrumb">
                    <h3 className="mc-breadcrumb-title">Order Details</h3>
                    <ul className="mc-breadcrumb-list">
                        <li className="mc-breadcrumb-item"><Link to="#" className="mc-breadcrumb-link">Home</Link></li>
                        <li className="mc-breadcrumb-item"><Link to="#" className="mc-breadcrumb-link">Orders</Link></li>
                        <li className="mc-breadcrumb-item">Order Details</li>
                    </ul>
                </div>
            </div>
            <div className="mc-card p-lg-4">
                <Row>
                    <Col xl={12}>
                        <div className="mc-product-view-info-group">
                            <h2 className="mc-product-view-info-title">Order Details</h2>
                            {order?.orderDetail?.map((detail, index) => (
                                <div key={index} className="mc-product-view-meta">
                                    <h5>Product Name</h5>
                                    <span>:</span>
                                    <p>{detail?.product?.name || "N/A"}</p>

                                    <h5>Price</h5>
                                    <span>:</span>
                                    <p>{detail?.price || "N/A"}</p>

                                    <h5>Quantity</h5>
                                    <span>:</span>
                                    <p>{detail?.quantity || "N/A"}</p>

                                  
                                </div>
                            ))}
                            <div className="mc-product-view-meta">
                                <h5>Total</h5>
                                <span>:</span>
                                <p>{order?.total || "N/A"}</p>

                                <h5>Date Created</h5>
                                <span>:</span>
                                <p>{formatDate(order?.date) || "N/A"}</p>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xl={12}>
                        {/* <h6 className="mc-divide-title mb-4">Order Details</h6> */}
                        <div className="mc-product-view-info-group">
                            <h2 className="mc-product-view-info-title">Customer</h2>
                            <div className="mc-product-view-meta">
                                <h5>User Name</h5>
                                <span>:</span>
                                <p>{order?.customer.username}</p>

                                <h5>Email</h5>
                                <span>:</span>
                                <p>{order?.customer.email}</p>

                                <h5>Phone</h5>
                                <span>:</span>
                                <p>{order?.customer.phone}</p>

                            </div>
                            
                        </div>
                    </Col>
                    <Col xl={12}>
                        
                        <div className="mc-product-view-info-group">
                            <h2 className="mc-product-view-info-title">Coffee Shop</h2>
                            <div className="mc-product-view-meta">
                                <h5>Name</h5>
                                <span>:</span>
                                <p>{order?.orderDetail[0].shop.name}</p>

                                <h5>Address</h5>
                                <span>:</span>
                                <p>{order?.orderDetail[0].shop.address}</p>

                                <h5>Phone</h5>
                                <span>:</span>
                                <p>{order?.orderDetail[0].shop.phone}</p>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Footer />
            </div>
        </div>
    );
}
