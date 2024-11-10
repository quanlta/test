
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import LabelFieldComponent from "../../components_admin/fields/LabelFieldComponent";
import UsersTableComponent from "../../components_admin/tables/UsersTableComponents";
import PaginationComponent from "../../components_admin/PaginationComponent";
import AnchorComponent from "../../components_admin/elements/AnchorComponent";
import Footer from "../../layouts_admin/Footer_admin";
import api from "../../../config/axios";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';




const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/account');
            setUsers(response.data);
            setFilteredUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message); // Thêm dòng này
            toast.error("Failed to fetch users");
            setLoading(false);
        }
    };

    // Hàm tìm kiếm user theo ID hoặc Name
    const handleSearch = async () => {
        if (searchTerm) {
            if (!isNaN(searchTerm)) {
                const result = users.find(user => user.id === parseInt(searchTerm));
                setFilteredUsers(result ? [result] : []);
                setError(result ? "" : "No user found with that ID.");
            } else {
                const filtered = users.filter(user =>
                    user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()) // Kiểm tra `name` trước khi dùng `toLowerCase`
                );
                setFilteredUsers(filtered);
                setError(filtered.length > 0 ? "" : "No users found with that name.");
            }
        } else {
            setFilteredUsers(users);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, users]);



    return (
        <>
            <div className="mc-main active">
                <Row>
                    <Col xl={12}>
                        <div className="mc-card">
                            <div className="mc-breadcrumb">
                                <h3 className="mc-breadcrumb-title">User List</h3>
                                <ul className="mc-breadcrumb-list">
                                    <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                    <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Users</Link></li>
                                    <li className="mc-breadcrumb-item">User List</li>
                                </ul>
                            </div>
                        </div>
                    </Col>

                    <Col xl={12}>
                        <div className="mc-card">
                            <div className="mc-card-header">
                                <h4 className="mc-card-title">Registered Users</h4>
                                <Dropdown bsPrefix="mc-dropdown">
                                    <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                        <i className="material-icons">more_horiz</i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                        <button type='button' className="mc-dropdown-menu"><i className="material-icons">edit</i><span>Edit</span></button>
                                        <button type='button' className="mc-dropdown-menu"><i className="material-icons">delete</i><span>Delete</span></button>
                                        <button type='button' className="mc-dropdown-menu"><i className="material-icons">download</i><span>Download</span></button>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <Row xs={1} sm={2} xl={4}>
                                <Col>
                                    <LabelFieldComponent
                                        type="search"
                                        label={'Search By'}
                                        placeholder="ID / Name"
                                        labelDir="label-col"
                                        fieldSize="md-4 w-100 h-md"
                                        value={searchTerm || ''} // Đảm bảo luôn có giá trị
                                        onChange={handleSearchChange}
                                    
                                    />
                                </Col>

                            </Row>
                            <UsersTableComponent
                                thead={["Username", "Email", "Phone", "Role", "Actions"]}
                                tbody={filteredUsers}

                            />
                            <PaginationComponent />

                        </div>
                    </Col>
                </Row>
                <Footer />
            </div>

        </>

    )
}

export default Users;


