import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import CoffeeShopTableComponent from "../../components_admin/tables/CoffeeShopTableComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import PaginationComponent from "../../../admin/components_admin/PaginationComponent";
import Footer from "../../layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function CoffeeShopListPage() {
    const [shops, setShops] = useState([]);  // Lưu tất cả coffee shop
    const [filteredShops, setFilteredShops] = useState([]);  // Lưu coffee shop sau khi tìm kiếm
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(""); // Lỗi khi gọi API

    // Fetch tất cả coffee shop khi component được render lần đầu
    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true);
            setError(""); // Reset lỗi khi gọi API

            try {
                const response = await api.get("/coffeeshops"); // Gọi API để lấy coffee shop
                setShops(response.data); // Lưu tất cả coffee shop
                setFilteredShops(response.data); // Lưu danh sách coffee shop ban đầu
            } catch (error) {
                console.error("Error fetching coffee shops:", error);
                setError("Error fetching coffee shops.");
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    // Hàm tìm kiếm coffee shop theo ID hoặc Name
    const handleSearch = () => {
        if (searchTerm) {
            if (!isNaN(searchTerm)) {
                // Tìm kiếm theo ID
                const result = shops.find(shop => shop.id === parseInt(searchTerm));
                setFilteredShops(result ? [result] : []);
                setError(result ? "" : "No coffee shop found with that ID.");
            } else {
                // Tìm kiếm theo Name
                const filtered = shops.filter(shop =>
                    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredShops(filtered);
                setError(filtered.length > 0 ? "" : "No coffee shops found with that name.");
            }
        } else {
            setFilteredShops(shops);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  // Cập nhật từ khóa tìm kiếm
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, shops]);

    

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Coffee Shop List</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Coffee Shop</Link></li>
                                <li className="mc-breadcrumb-item">Coffee Shop List</li>
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
                                    <CoffeeShopTableComponent 
                                        thead={["Name", "Address", "Phone", "Open Time", "Close Time",  "Action"]} 
                                        tbody={filteredShops}
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
