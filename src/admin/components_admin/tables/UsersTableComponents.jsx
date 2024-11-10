import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import ButtonComponent from '../../components_admin/elements/ButtonComponent';
import AnchorComponent from '../../components_admin/elements/AnchorComponent';
import api from '../../../config/axios';

export default function UsersTableComponent({ thead, tbody }) {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [blockModal, setBlockModal] = useState(false);

    useEffect(() => {
        setData(tbody);
    }, [tbody]);

    // Handle checkbox selection
    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        } else {
            const checkData = data.map((item) =>
                item.id === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    };

    // Hàm cập nhật người dùng
    const updateUser = async (id, userData) => {
        try {
            const response = await api.put(`/account/account/${id}`, userData);
            console.log("User updated:", response.data);
            // Cập nhật lại dữ liệu sau khi thay đổi
            setData((prevData) =>
                prevData.map((user) => (user.id === id ? response.data : user))
            );
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Hàm cấm người dùng
    const banUser = async (id) => {
        try {
            // Lấy dữ liệu người dùng hiện tại
            const response = await api.get(`/account/id`, { params: { id } });
            const userData = response.data;
            // Cập nhật role thành "BANNED"
            userData.role = "BANNED";
            if (userData.role === "BANNED") {
                userData.role = "USER";
            }
            // Gửi yêu cầu cập nhật người dùng
            const updateResponse = await api.put(`/account/account/${id}`, userData);
            console.log("User banned:", updateResponse.data);
            console.log("User banned:", updateResponse.data);
            // Cập nhật lại dữ liệu sau khi thay đổi
            setData((prevData) =>
                prevData.map((user) => (user.id === id ? updateResponse.data : user))
            );
        } catch (error) {
            console.error("Error banning user:", error);
        }
    };
    // Hàm xóa người dùng
    // const deleteUser = async (id) => {
    //     try {
    //         const response = await api.delete(`/account/${id}`);
    //         console.log("User deleted:", response.data);
    //         // Cập nhật lại dữ liệu sau khi xóa
    //         setData((prevData) => prevData.filter((user) => user.id !== id));
    //     } catch (error) {
    //         console.error("Error deleting user:", error);
    //     }
    // };

    return (
        <div className="mc-table-responsive">
            <table className="mc-table">
                <thead className="mc-table-head primary">
                    <tr>
                        <th>
                            <div className="mc-table-check">
                                <input
                                    type="checkbox"
                                    name="allCheck"
                                    checked={data.filter((item) => !item.isChecked).length < 1}
                                    onChange={handleCheckbox}
                                />
                                <p>UID</p>
                            </div>
                        </th>
                        {thead.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td title={item.id}>
                                <div className="mc-table-check">
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        checked={item.isChecked}
                                        onChange={handleCheckbox}
                                    />
                                    <p>#{item.id}</p>
                                </div>
                            </td>
                            <td title={item.username}>
                                <div className="mc-table-profile">
                                    <p>{item.username}</p>
                                </div>
                            </td>
                            <td title={item.email}>{item.email}</td>
                            <td title={item.phone}>{item.phone}</td>
                            <td title={item.role}>
                                <span>{item.role}</span>
                            </td>
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to={`/admin/user-profile/${item.id}`} title="View" className="material-icons view" icon="visibility" />
                                    <ButtonComponent title="Edit" className="material-icons edit" icon="edit" onClick={() => { setEditModal(true); setUserData(item); }} />
                                    <ButtonComponent title="Block" className="material-icons block" icon="block" onClick={() => { setBlockModal(true); setUserData(item); }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa người dùng */}
            <Modal show={editModal} onHide={() => { setEditModal(false); setUserData(""); }}>
                <div className="mc-user-modal">
                    <h4>{userData?.username}</h4>
                    <p>{userData?.email}</p>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            placeholder="Enter User Name"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            placeholder="Enter Phone"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={userData?.role || ''} // Nếu userData?.role là null hoặc undefined, đặt giá trị mặc định là ''
                            onChange={(e) => setUserData({ ...userData, role: e.target.value })} // Cập nhật state khi chọn
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </Form.Select>
                    </Form.Group>

                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>
                            Close
                        </ButtonComponent>
                        <ButtonComponent
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                updateUser(userData.id, userData); // Gọi API để cập nhật người dùng
                                setEditModal(false); // Đóng modal sau khi cập nhật
                            }}
                        >
                            Save Changes
                        </ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>

            {/* Modal block người dùng */}
            <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>Are you sure?</h3>
                    <p>Want to block this user's account?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>
                            Close
                        </ButtonComponent>
                        <ButtonComponent
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                banUser(userData.id); // Gọi API để xóa người dùng
                                setBlockModal(false); // Đóng modal sau khi xóa
                            }}
                        >
                            Block
                        </ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
