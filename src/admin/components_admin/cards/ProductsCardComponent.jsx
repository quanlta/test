import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import PaginationComponent from "../PaginationComponent";
import ProductsTableComponent from "../../components_admin/tables/ProductsTableComponent";
import api from "../../../config/axios";

export default function ProductsCardComponent() {
    const [product, setProducts] = useState([]); // Danh sách sản phẩm
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(""); // Lỗi khi gọi API

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Đặt trạng thái loading khi bắt đầu gọi API
            setError(""); // Reset lỗi trước khi gọi API

            try {
                const response = await api.get('/product'); // Lấy danh sách sản phẩm từ API
                setProducts(response.data); // Lưu sản phẩm vào state
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error fetching products."); // Lưu lỗi nếu có
            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        };

        fetchProducts(); // Gọi API khi component render lần đầu
    }, []); // Mảng phụ thuộc trống, chỉ gọi khi component mount

    return (
        <div className="mc-card">
            <div className="mc-card-header">
                <h4 className="mc-card-title">Best Selling Products</h4>
                <Dropdown bsPrefix="mc-dropdown">
                    <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                        <i className="material-icons">more_horiz</i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="mc-dropdown-paper">
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">edit</i>
                            <span>Edit</span>
                        </button>
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">delete</i>
                            <span>Delete</span>
                        </button>
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">download</i>
                            <span>Download</span>
                        </button>
                    </Dropdown.Menu>
                </Dropdown>
            </div>           
            <ProductsTableComponent 
                thead={["Name", "Description", "Price", "Action"]} 
                tbody={product} // Truyền danh sách sản phẩm vào bảng 
            />
            <PaginationComponent 
                
            />
        </div>
    );
}
