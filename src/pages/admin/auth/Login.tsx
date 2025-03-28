import { Button, Col, Form, Input, message, notification, Row, Typography } from "antd";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

function Login() {
  const [form] = Form.useForm();
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav("/");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post("http://localhost:3000/login", values);
      const { accessToken, user } = data;
      const decodedToken: any = jwtDecode(accessToken);
      console.log(decodedToken);

      if (user.status === "banned") {
        notification.error({
          message: "Login Failed",
          description: "Tài khoản của bạn đã bị khóa.",
          duration: 5,
        });
        return;
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(userData));

      notification.success({ message: "Đăng nhập thành công!" });

      if (user.role === "user") {
        nav("/");
        window.location.reload();
      } else {
        nav("/admin");
      }
    } catch (error) {
      message.error("Login failed: " + (error as AxiosError).message);
    }
  };

  return (
    <Row justify="center" style={{ height: "100vh", marginTop: "50px" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
          Đăng nhập
        </h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>

        {/* Thêm liên kết đăng ký */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Text>Chưa có tài khoản? </Text>
          <Link to="/register">Đăng ký ngay</Link>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
