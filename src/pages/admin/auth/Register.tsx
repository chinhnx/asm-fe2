import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { useAuth } from "../../../hooks";

function Register() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { mutate } = useAuth({ resource: "register" });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      mutate(values);
    } catch (error) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav("/"); // Nếu đã đăng nhập, chuyển về trang chính
    }
  }, [nav]);

  return (
    <Row justify="center" style={{ height: "100vh", marginTop: "50px" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
          Đăng ký
        </h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
            name="name"
            label="Tên"
            rules={[
              { required: true, message:"vui lòng nhập tên"},
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" }
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^\d{10,11}$/, message: "Số điện thoại không hợp lệ!" }
            ]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="repassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;