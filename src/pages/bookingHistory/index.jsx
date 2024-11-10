import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import { Table, Spin, Alert } from 'antd';
import styles from './BookingHistoryPage.module.scss';
import moment from 'moment';
const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
        const userId = localStorage.getItem('uid'); // Retrieve userId from localStorage
        console.log(userId);
      try {
        const response = await api.get(`/PODBooking/checkout/${userId}?accountId=${userId}`);

        setBookings(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'POD Image',
      dataIndex: ['pod', 'image'],
      key: 'podImage',
      render: (text) => <img src={text} alt="POD" className={styles.podImage} />,
    },
    {
      title: 'Description',
      dataIndex: ['pod', 'description'],
      key: 'description',
    },
    {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        render: (text) => moment(text).format('YYYY-MM-DD : HH:mm:ss'),
      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        render: (text) => moment(text).format('YYYY-MM-DD : HH:mm:ss'),
      },
    {
      title: 'Price',
      dataIndex: ['pod', 'price'],
      key: 'price',
      render: (text) => `${text} vnd`,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `${text} vnd`,
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return (
    <div className={styles.bookingHistoryPage} style={{ marginTop: "135px" }}>
      <h1>Booking History</h1>
      <Table dataSource={bookings} columns={columns} rowKey="id" />
    </div>
  );
};

export default BookingHistoryPage;