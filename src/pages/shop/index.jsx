import React, { useEffect, useState } from 'react';
import styles from './CoffeeShopsPage.module.scss';
import api from '../../config/axios';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CoffeeShopsPage = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pods, setPods] = useState([]);
  const [showPods, setShowPods] = useState(false);
  const [selectedPod, setSelectedPod] = useState(null); // New state for selected POD
  const [formKey, setFormKey] = useState(0); // State to force form re-render
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await api.get('/coffeeshops');
        setCoffeeShops(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  const fetchPods = async (shopId) => {
    setLoading(true);
    try {
      const response = await api.get("/PODs/searchByShopId", { params: { shopId } });
      setPods(response.data);
      setShowPods(true);
    } catch (err) {
      setError("Failed to fetch PODs data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const bookingData = {
      start: values.start.format('YYYY-MM-DDTHH:mm:ss'),
      end: values.end.format('YYYY-MM-DDTHH:mm:ss'),
      podId: values.podId,
    };
    try {
      const response = await api.post("/PODBooking/add", bookingData);
      message.success("POD booked successfully!");
      console.log(response.data);
      console.log(bookingData);
    } catch (error) {
      console.log(bookingData);
      message.error("Failed to book POD. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (pod) => {
    console.log("Selected POD:", pod); // Debugging line
    setSelectedPod(pod);
    setFormKey(prevKey => prevKey + 1); // Update form key to force re-render
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.coffeeShopsPage} style={{ marginTop: "135px" }}>
      <h1>Coffee Shops</h1>
      <div className={styles.coffeeShopsGrid}>
        {coffeeShops.map(shop => (
          <div key={shop.id} className={styles.coffeeShopCard}>
            <img src={shop.image} alt={shop.name} />
            <div className={styles.coffeeShopInfo}>
              <h2>{shop.name}</h2>
              <p>Address: {shop.address}</p>
              <p>Phone: {shop.phone}</p>
              <p>Open: {shop.openTime} - {shop.closeTime}</p>
              <div className={styles.bookButton}>
                <Button onClick={() => fetchPods(shop.id)}>Book</Button>
              </div>
            </div>
          </div>
        ))}
        {showPods && (
          <div className={styles["pods-page"]}>
            <h1>Our Available PODs</h1>
            <div className={styles["pods-container"]}>
              {pods.map((pod) => (
                <div
                  className={`${styles["pod-item"]} ${selectedPod && selectedPod.id === pod.id ? styles["selected"] : ""}`}
                  key={pod.id}
                >
                  <img src={pod.image} alt={pod.description} className={styles["pod-image"]} />
                  <div className={styles["pod-details"]}>
                    <h3>{pod.description}</h3>
                    <p>{pod.location}</p>
                    <p>Price: {pod.price} vnd</p>
                    <button onClick={() => handleBookClick(pod)}>Book</button>
                  </div>
                </div>
              ))}
              {selectedPod && (
                <div className={styles["booking-page"]}>
                  <h1>Book a POD</h1>
                  <Form
                    key={formKey} // Use formKey to force re-render
                    layout="vertical"
                    onFinish={(values) => handleSubmit({ ...values })}
                    className={styles["booking-form"]}
                    initialValues={{
                      pod: selectedPod.id,
                    }}
                  >
                    <Form.Item
                      label="POD"
                      name="podId"
                      initialValue={selectedPod.id}
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      label="Start Date and Time"
                      name="start"
                      rules={[{ required: true, message: "Please select a start date and time" }]}
                    >
                      <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="End Date and Time"
                      name="end"
                      rules={[{ required: true, message: "Please select an end date and time" }]}
                    >
                      <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className={styles["booking-button"]}
                      >
                        Book POD
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeShopsPage;