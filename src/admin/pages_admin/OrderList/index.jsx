import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import OrderTableComponent from "../../../admin/components_admin/tables/OrderTableComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import PaginationComponent from "../../../admin/components_admin/PaginationComponent";
import Footer from "../../layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function OrdersListPage() {
    const [orders, setOrders] = useState([]);  // Lưu tất cả Orders
    const [filteredOrders, setFilteredOrders] = useState([]);  // Lưu Orders sau khi tìm kiếm
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(""); // Lỗi khi gọi API

    // Fetch tất cả Orders khi component được render lần đầu
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(""); // Reset lỗi khi gọi API

            try {
                const response = await api.get("orders"); // Gọi API để lấy Orders
                console.log(response.data);
                const ordersData = response.data.map(order => {
                    return {
                        id: order.id,
                        customer: {
                            username: order.customer?.username || "Unknown",
                            phone: order.customer?.phone || "Unknown",
                        },
                        orderDetail: order.orderDetail.map(detail => ({
                            product: {
                                name: detail.product?.name || "No Product Name",
                            },
                            price: detail.price || 0,
                            quantity: detail.quantity || 0,
                        })),
                        total: order.total || 0,
                    };
                });
                setOrders(ordersData); // Lưu tất cả Orders
                setFilteredOrders(ordersData); // Lưu danh sách Orders ban đầu
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Error fetching orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Hàm tìm kiếm Orders theo ID hoặc Name
    const handleSearch = () => {
        if (searchTerm) {
            if (!isNaN(searchTerm)) {
                // Tìm kiếm theo ID
                const result = orders.find(order => order.id === parseInt(searchTerm));
                setFilteredOrders(result ? [result] : []);
                setError(result ? "" : "No Orders found with that ID.");
            } else {
                // Tìm kiếm theo Name
                const filtered = orders.filter(order => {
                    const orderName = order.customer.username || ""; // Đảm bảo có giá trị hợp lệ để gọi toLowerCase
                    return orderName.toLowerCase().includes(searchTerm.toLowerCase());
                });
                setFilteredOrders(filtered);
                setError(filtered.length > 0 ? "" : "No Orders found with that name.");
            }
        } else {
            setFilteredOrders(orders);
        }
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  // Cập nhật từ khóa tìm kiếm
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, orders]);



    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Orders List</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Orders</Link></li>
                                <li className="mc-breadcrumb-item">Orders List</li>
                            </ul>
                        </div>
                    </div>
                </Col>

                <Col xl={12}>
                    <div className="mc-card">
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <LabelFieldComponent
                                    type="search"
                                    label="Search By"
                                    placeholder="ID / Name"
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col xl={12}>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <OrderTableComponent
                                        thead={["User Name", "Phone", "Products", "Price", "Quantity", "Total Price", "Action"]}
                                        tbody={filteredOrders.map(order => ({
                                            ...order,
                                            products: order.orderDetail.map(detail => `${detail.product.name} (${detail.quantity})`).join(", "),
                                        }))}
                                    />
                                )}
                                <PaginationComponent />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    );
}
