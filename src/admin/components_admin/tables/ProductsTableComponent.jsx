import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import AnchorComponent from "../elements/AnchorComponent";
import ButtonComponent from "../elements/ButtonComponent";
import api from "../../../config/axios"; // Import api từ cấu hình Axios

export default function ProductsTableComponent({ thead, tbody }) {
    const [editProduct, setEditProduct] = useState(false);
    const [userData, setUserData] = useState("");
    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // Để lưu ID của sản phẩm được chọn

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
        if (selectedProductId) {
            try {
                await api.delete(`/product/${selectedProductId}`);
                // Xoá sản phẩm ra khỏi danh sách hiển thị
                const updatedData = data.filter((item) => item.id !== selectedProductId);
                setData(updatedData);
                setAlertModal(false); // Đóng modal sau khi xoá
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

    const updateProduct = async () => {
        try {
            await api.put(`/product/${userData.id}`, userData);
            // Cập nhật dữ liệu sản phẩm
            const updatedData = data.map(item => item.id === userData.id ? userData : item);
            setData(updatedData);
            setEditProduct(false); // Đóng modal chỉnh sửa
        } catch (error) {
            console.error("Failed to update product:", error);
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
                                    <img src={item.image}  />
                                    <div className="mc-table-group">
                                        <h6>{item.name}</h6>
                                    </div>
                                </div>
                            </td>
                            <td>{item.description}</td>
                            <td>
                                <div className="mc-table-price">
                                    <p>{item.price}</p>
                                </div>
                            </td>
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to={`/admin/product-view/${item.id}`} title="View" className="material-icons view">
                                        visibility
                                    </AnchorComponent>
                                    <ButtonComponent title="Edit" className="material-icons edit" icon="edit" onClick={() => { setEditProduct(true); setUserData(item); }} />
                                    <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={() => { setAlertModal(true); setSelectedProductId(item.id); }}>
                                        delete
                                    </ButtonComponent>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={editProduct} onHide={() => { setEditProduct(false); setUserData(""); }}>
                <div className="mc-user-modal">
                    <h4>{userData?.username}</h4>
                    <p>{userData?.email}</p>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData?.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="Enter Product Name"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"            
                            defaultValue={userData?.image} 
                            onChange={(e) => setUserData({ ...userData, image: e.target.value })}  
                            placeholder="Enter Product Image"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"  
                            rows={3}  
                            defaultValue={userData?.description}  
                            onChange={(e) => setUserData({ ...userData, description: e.target.value })} 
                            placeholder="Enter Product Description"
                        />
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"  // Cho phép nhập giá thập phân
                            defaultValue={userData?.price}  // Sử dụng giá trị mặc định từ userData
                            onChange={(e) => setUserData({ ...userData, price: parseFloat(e.target.value) })}  // Cập nhật price khi người dùng nhập
                            placeholder="Enter Product Price"
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={() => setEditProduct(false)}>Close</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-success" onClick={updateProduct}>Save Changes</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>

            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>Are you sure?</h3>
                    <p>Do you want to delete this product?</p>
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
