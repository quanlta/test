import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import AnchorComponent from "../elements/AnchorComponent";
import ButtonComponent from "../elements/ButtonComponent";
import api from "../../../config/axios";

export default function OrderTableComponent({ thead, tbody }) {
    const [editOrder, setEditOrder] = useState(false);
    const [userData, setUserData] = useState("");
    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

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
                                        <h6>{item.customer?.username}</h6>
                                    </div>
                                </div>
                            </td>
                            <td>{item.customer?.phone}</td>

                            {/* Cột hiển thị danh sách sản phẩm */}
                            <td>
                                {item.orderDetail.map((detail, index) => (
                                    <div key={index}>
                                        {detail.product.name}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {item.orderDetail.map((detail, index) => (
                                    <div key={index}>
                                        {detail.price}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {item.orderDetail.map((detail, index) => (
                                    <div key={index}>
                                        {detail.quantity}
                                    </div>
                                ))}
                            </td>

                            <td>{item.total}</td>

                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to={`/admin/orders-view/${item.id}`} title="View" className="material-icons view">
                                        visibility
                                    </AnchorComponent>
                                    <ButtonComponent title="Edit" className="material-icons edit" icon="edit" onClick={() => { setEditOrder(true); setUserData(item); }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa */}
            <Modal show={editOrder} onHide={() => { setEditOrder(false); setUserData(""); }}>
                <div className="mc-user-modal">
                    <h4>{userData?.username}</h4>
                    <p>{userData?.email}</p>
                    {/* Thêm các phần tử khác trong modal */}
                    <Modal.Footer>
                        <ButtonComponent
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setEditOrder(false)}
                        >
                            Close
                        </ButtonComponent>
                        <ButtonComponent
                            type="button"
                            className="btn btn-success"
                        >
                            Save Changes
                        </ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
