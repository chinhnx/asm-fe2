import { Button, Form, Input, message, notification } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();

  const nav = useNavigate()

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
      if(user.status === "banned"){
         notification.error({
                message: "Login Failed",
                description: "Tai khoan cua ban da bi khoa.",
                duration: 5
            });
            return;
      }
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", user.role);
      notification.success({ message: "Login ok" });
      if(user.role === "user"){
        nav("/")
      }else{
        nav("/admin")
      }
    } catch (error) {
      
      message.error("Login failed: " + (error as AxiosError).message);
    }


    

  };
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

export default Login;
