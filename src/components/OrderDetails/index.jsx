import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../config/axios'; // Ensure the import path is correct

const OrderDetails = ({ orderId, toggleDetails }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await api.get(`orders/${orderId}`);
                console.log('OrderDetails received order:', response.data);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>No order details found.</p>;
    }

    return (
        <div>
            <h2>Order Details for Order ID: {order.id}</h2>
            <button onClick={() => toggleDetails(orderId)}>Close</button>
            <table>
                <thead>
                    <tr>
                        <th>Shop Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderDetail.map(detail => (
                        <tr key={detail.id}>
                            <td>{detail.shop.name}</td>
                            <td>{detail.product.name}</td>
                            <td>{detail.quantity}</td>
                            <td>${detail.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

OrderDetails.propTypes = {
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    toggleDetails: PropTypes.func.isRequired,
};

export default OrderDetails;