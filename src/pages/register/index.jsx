import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import './index.scss'

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      values.role = "USER";
      const response = await api.post("account/register", values);
      if(response.status === 200) {
        toast.success("Successfully create an account");
        navigate("/login");
      }
      
    } catch (err) {
      //console.log
      toast.error(err.response.data);
    }
  };

  return (
    <div className="register-page">
    <AuthenTemplate>
      <br/>
      <h2>Adventure starts here 🚀</h2>
      <p>Start booking your coffee and workplace here</p>
      <br/>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={handleRegister}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 5, message: "Username must be at least 5 characters long." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { pattern: /^\d{10}$/, message: "Phone number must be 10 digits." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long." },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Re-enter Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Link to="/login">Already have account? Login now</Link>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </AuthenTemplate>
    </div>
  );
}

export default RegisterPage;
