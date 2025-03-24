import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form] = Form.useForm();
  const nav = useNavigate()
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("/register", values);
      message.success("Register ok");
      nav("/admin/login")
    } catch (error) {
      message.error("Register failed: " + (error as AxiosError).message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav("/"); // Nếu đã đăng nhập, quay về trang chính
    }
  }, []);
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, min: 6 }]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Register;
