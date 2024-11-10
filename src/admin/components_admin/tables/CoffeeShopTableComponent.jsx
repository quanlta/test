import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import AnchorComponent from "../elements/AnchorComponent";
import ButtonComponent from "../elements/ButtonComponent";
import api from "../../../config/axios";

export default function CoffeeShopTableComponent({ thead, tbody }) {
    const [editCoffee, setEditCoffee] = useState(false);
    const [userData, setUserData] = useState("");
    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [selectedCoffeeId, setSelectedCoffeeId] = useState(null); // Để lưu ID của coffee shop được chọn

    useEffect(() => {
        setData(tbody);
    }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data.map((item) => ({
                ...item, isChecked: checked
            }));
            setData(checkData);
        } else {
            const checkData = data.map((item) =>
                item.id === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    };

    const handleDelete = async () => {
        if (selectedCoffeeId) {
            try {
                await api.delete(`http://localhost:8080/api/coffeeshops/${selectedCoffeeId}`);
                // Xoá coffee shop ra khỏi danh sách hiển thị
                const updatedData = data.filter((item) => item.id !== selectedCoffeeId);
                setData(updatedData);
                setAlertModal(false); // Đóng modal sau khi xoá
            } catch (error) {
                console.error("Failed to delete coffee shop:", error);
            }
        }
    };

    const updateCoffeeShop = async () => {
        try {
            await api.put(`http://localhost:8080/api/coffeeshops/update/${userData.id}`, userData);
            // Update the data state to reflect the new coffee shop details
            const updatedData = data.map(item => item.id === userData.id ? userData : item);
            setData(updatedData);
            setEditCoffee(false); // Close the edit modal
        } catch (error) {
            console.error("Failed to update coffee shop:", error);
        }
    };

    return (
        <div className="mc-table-responsive">
            <table className="mc-table product">
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
                            <td>
                                <div className="mc-table-product md">
                                    <div className="mc-table-group">
                                        <h6>{item.name}</h6>
                                    </div>
                                </div>
                            </td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.openTime}</td>
                            <td>{item.closeTime}</td>
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to={`/admin/coffeeshop-view/${item.id}`} title="View" className="material-icons view">
                                        visibility
                                    </AnchorComponent>
                                    <ButtonComponent title="Edit" className="material-icons edit" icon="edit" onClick={() => { setEditCoffee(true); setUserData(item); }} />
                                    <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={() => { setAlertModal(true); setSelectedCoffeeId(item.id); }}>
                                        delete
                                    </ButtonComponent>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa */}
            <Modal show={editCoffee} onHide={() => { setEditCoffee(false); setUserData(""); }}>
                <div className="mc-user-modal">
                    <h4>{userData?.username}</h4>
                    <p>{userData?.email}</p>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="Enter Coffee Shop Name"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            placeholder="Enter Coffee Shop Address"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.image || ""} // Kiểm tra giá trị null hoặc undefined
                            onChange={(e) => setUserData({ ...userData, image: e.target.value })}
                            placeholder="Enter Coffee Shop Image URL"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"  // Cho phép nhập giá thập phân
                            defaultValue={userData?.phone}  // Sử dụng giá trị mặc định từ userData
                            onChange={(e) => setUserData({ ...userData, phone: parseFloat(e.target.value) })}  // Cập nhật price khi người dùng nhập
                            placeholder="Enter Coffee Shop Phone"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Open Time</Form.Label>
                        <Form.Control
                            type="time" // Định dạng thời gian
                            defaultValue={userData?.openTime || ""} // Giá trị mặc định
                            onChange={(e) => setUserData({ ...userData, openTime: e.target.value })}
                            placeholder="Enter Coffee Shop Open Time"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Close Time</Form.Label>
                        <Form.Control
                            type="time" // Định dạng thời gian
                            defaultValue={userData?.closeTime || ""}
                            onChange={(e) => setUserData({ ...userData, closeTime: e.target.value })}
                            placeholder="Enter Coffee Shop Close Time"
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <ButtonComponent
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setEditCoffee(false)}
                        >
                            Close
                        </ButtonComponent>
                        <ButtonComponent
                            type="button"
                            className="btn btn-success"
                            onClick={updateCoffeeShop} // Gọi hàm updateCoffeeShop khi nhấn "Save Changes"
                        >
                            Save Changes
                        </ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>

            {/* Modal xác nhận xoá */}
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>Are you sure?</h3>
                    <p>Do you want to delete this coffee shop?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>
                            Close
                        </ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
