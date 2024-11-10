import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ProductsTableComponent from "../../../admin/components_admin/tables/ProductsTableComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import PaginationComponent from "../../../admin/components_admin/PaginationComponent";
import Footer from "../../layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function ProductListPage() {
    const [products, setProducts] = useState([]);  // Lưu tất cả sản phẩm
    const [filteredProducts, setFilteredProducts] = useState([]);  // Lưu sản phẩm sau khi tìm kiếm
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(""); // Lỗi khi gọi API

    // Lấy tất cả sản phẩm khi component được render lần đầu
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(""); // Reset lỗi khi gọi API

            try {
                const response = await api.get("/product"); // Lấy tất cả sản phẩm
                setProducts(response.data); // Lưu tất cả sản phẩm vào state products
                setFilteredProducts(response.data); // Lưu danh sách sản phẩm ban đầu vào filteredProducts
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Hàm tìm kiếm sản phẩm theo ID hoặc Name
    const handleSearch = async () => {
        if (searchTerm) {
            // Nếu searchTerm là một số, coi đó là ID sản phẩm
            if (!isNaN(searchTerm)) {
                // Nếu là ID (dạng long), gọi API theo ID
                const result = products.find(product => product.id === parseInt(searchTerm));
                setFilteredProducts(result ? [result] : []);
                setError(result ? "" : "No coffee shop found with that ID.");
            } else {
                // Tìm kiếm theo Name
                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(filtered);
                setError(filtered.length > 0 ? "" : "No coffee products found with that name.");
            }
        } else {
            setFilteredProducts(products);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  // Cập nhật từ khóa tìm kiếm
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, products]);

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Product List</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Products</Link></li>
                                <li className="mc-breadcrumb-item">Product List</li>
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
                                    value={searchTerm}  // Gán giá trị tìm kiếm vào input
                                    onChange={handleSearchChange}  // Cập nhật giá trị tìm kiếm khi người dùng nhập

                                />
                            </Col>
                            <Col xl={12}>

                                <ProductsTableComponent
                                    thead={["Name", "Description", "Price", "Action"]}
                                    tbody={filteredProducts}
                                />

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
