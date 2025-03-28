import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Input, Button, Radio, Card, Divider, Typography, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) return []; // Nếu chưa đăng nhập thì không lấy giỏ hàng

    const response = await fetch(`http://localhost:3000/carts?userId=${user.id}`);
    if (!response.ok) throw new Error("Lỗi khi lấy giỏ hàng");
    const data = await response.json();

    return data.flatMap((order: any) => order.items);
};

const Checkout = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Sử dụng useQuery để lấy dữ liệu giỏ hàng
    const { data: cartItems = [], isLoading, isError } = useQuery({
        queryKey: ["cart", 1], // Định danh cache cho giỏ hàng của userId = 1
        queryFn: fetchCart,
    });

    const mergedCartItems = cartItems.reduce((acc: any, item: any) => {
        const existingItem = acc.find((i: any) => i.productId === item.productId);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);
    

    const handleCheckout = async (values: any) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            alert("Bạn chưa đăng nhập!");
            return;
        }
    
        try {
            // 1. Gửi đơn hàng lên server
            await axios.post("http://localhost:3000/orders", {
                userId: user.id,
                name: values.name,
                address: values.address,
                phone: values.phone,
                total: mergedCartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0),
                items: mergedCartItems.map((item: any) => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                methodPayment: values.payment,
                status: "Đang chờ xử lý",
            });
    
            // 2. Xóa tất cả giỏ hàng của userId
            const cartResponse = await axios.get(`http://localhost:3000/carts?userId=${user.id}`);
            const carts = cartResponse.data;
            for (const cart of carts) {
                await axios.delete(`http://localhost:3000/carts/${cart.id}`);
            }
    
            // 3. Hiển thị thông báo & reset form
            alert("Đặt hàng thành công!");
            form.resetFields();
    
            // // 4. Cập nhật lại danh sách giỏ hàng (gọi lại API)
            // queryClient.invalidateQueries(["cart", user.id]);
    
            // 5. Điều hướng về trang sản phẩm
            navigate("/products");
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    


    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <Card style={{ width: 800, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <Title level={2}>Thanh toán đơn hàng</Title>

                {/* Hiển thị danh sách sản phẩm */}
                <Card type="inner" >
                    {isLoading ? (
                        <Spin size="large" />
                    ) : isError ? (
                        <Text type="danger">Lỗi khi tải giỏ hàng</Text>
                    ) : cartItems.length > 0 ? (
                        mergedCartItems.map((item: any, index: any) => (
                            <Card.Grid key={index} style={{ width: "100%", padding: "10px", textAlign: "left", gap: "20px", display: "flex", alignItems: "center" }}>
                                <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }} />
                                <Text strong>{item.name}</Text>
                                <Text style={{ color: "red" }}>Giá: {item.price.toLocaleString()}đ</Text>
                                <Text >Số lượng: {item.quantity}</Text>
                            </Card.Grid>
                        ))
                    ) : (
                        <Text type="secondary">Không có sản phẩm trong giỏ hàng</Text>
                    )}
                </Card>

                <Divider />

                {/* Form thanh toán */}
                <Form form={form} layout="vertical" onFinish={handleCheckout}>

                    <Title level={4}>Hình thức nhận hàng</Title>
                    <Form.Item name="address" label="Địa chỉ nhận hàng" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                        <Input placeholder="Nhập Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" />
                    </Form.Item>

                    <Divider />

                    <Title level={4}>Phương thức thanh toán</Title>
                    <Form.Item name="payment" rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}>
                        <Radio.Group style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                            <Radio value="bank">Thanh toán qua thẻ ATM nội địa</Radio>
                            <Radio value="visa">Thanh toán bằng Visa, Mastercard</Radio>
                            <Radio value="momo">Thanh toán bằng MoMo</Radio>
                            <Radio value="zalo">Thanh toán bằng ZaloPay</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Divider />

                    <Card type="inner" title="Thông tin đơn hàng">
                        <Text style={{}}>Tổng tiền: </Text>
                        <Text type="danger">
                            {cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0).toLocaleString()}đ
                        </Text>
                    </Card>

                    <Divider />

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block danger>
                            Đặt hàng
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Checkout;
