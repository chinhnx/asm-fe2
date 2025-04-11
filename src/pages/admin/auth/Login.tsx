import { Button, Col, Form, Input, message, notification, Row, Typography } from "antd";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

const { Text } = Typography;

function Login() {
  // const [form] = Form.useForm();
  // const nav = useNavigate();

  const { mutate } = useAuth({ resource: "login" });

   const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <Row justify="center" style={{ height: "100vh", marginTop: "50px" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
          Đăng nhập
        </h1>
        <Form onFinish={onFinish} layout="vertical">
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
