import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import OrderDetails from '../../components/OrderDetails'; // Ensure the import path is correct
import './style.css';

const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showDetails, setShowDetails] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    
    useEffect(() => {
        const fetchOrderHistory = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await api.get('orders');
                console.log(response.data);
                setOrderHistory(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching order history:', error);
                setError('Error fetching order history.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    const toggleDetails = (orderId) => {
        setShowDetails(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
        setSelectedOrderId(orderId);
    };

    const formatDate = (dateString) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
    };

    return (
        <div style={{ marginTop: "135px" }}>
            <h1>Order History</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : orderHistory.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="order-history-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map(order => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>${order.total}</td>
                                    <td>{order.date ? formatDate(order.date) : 'N/A'}</td>
                                    <td>
                                        <button onClick={() => toggleDetails(order.id)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedOrderId && showDetails[selectedOrderId] && (
                <div className="order-details-modal">
                    <OrderDetails orderId={selectedOrderId} toggleDetails={toggleDetails} />
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;