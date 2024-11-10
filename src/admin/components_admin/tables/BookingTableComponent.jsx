import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from "../elements/ButtonComponent";
import AnchorComponent from "../elements/AnchorComponent";

export default function BookingTableComponent({ thead, tbody }) {
    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data?.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        } else {
            const checkData = data?.map((item) =>
                item.name === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    }

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
                                    checked={data?.filter((item) => item.isChecked !== true).length < 1}
                                    onChange={handleCheckbox}
                                />
                                <p>uid</p>
                            </div>
                        </th>
                        {thead.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className="mc-table-check">
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={item?.isChecked || false}
                                        onChange={handleCheckbox}
                                    />
                                    <p>{item.id}</p>
                                </div>
                            </td>
                            <td>{item.pod}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td>{item.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>Are you sure?</h3>
                    <p>Do you want to delete this booking?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>Close</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-danger" onClick={() => setAlertModal(false)}>Delete</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
}
