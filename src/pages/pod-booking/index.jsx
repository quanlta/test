import React, { useState } from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import api from "../../config/axios";
import styles from "./PODBookingPage.module.scss";

function PODBookingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const bookingData = {
        start: values.start.toISOString(),
        end: values.end.toISOString(),
        bookId: values.bookId,
      };

      const response = await api.post("/PODBooking/add", bookingData);
      message.success("POD booked successfully!");
      console.log(response.data);
    } catch (error) {
      message.error("Failed to book POD. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["booking-page"]}>
      <h1>Book a POD</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className={styles["booking-form"]}
      >
        <Form.Item
          label="Booking ID"
          name="bookId" 
          rules={[{ required: true, message: "Please enter a booking ID" }]}
        >
          <Input type="number" placeholder="Enter booking ID" />
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
  );
}

export default PODBookingPage;
