import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message, Select, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import axios from 'axios';
import React, { useEffect } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../../interface/user';


function UserEdit() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const nav = useNavigate()
    const { id } = useParams()

    const [form] = Form.useForm()
    const queryClient = useQueryClient();

    const getUserById = async () => {
        if (!id) return;
        const { data } = await axios.get(`http://localhost:3000/users/${id}`)
        return data
    }
    const { data: user } = useQuery({
        queryKey: ["users", id],
        queryFn: getUserById,
        enabled: !!id
    })

    useEffect(() => {
        if (!user) return;
        form.setFieldsValue(user)
    }, [user]);

    const updateUser = useMutation({
        mutationFn: async (updatedUser: IUser) => {

            return axios.put(`http://localhost:3000/users/${id}`, updatedUser, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Nếu API yêu cầu token
                },
            })

        },
        onSuccess: () => {
            message.success("sua thanh cong");
            queryClient.invalidateQueries({ queryKey: ["users"] })
            nav("/admin/user")
        },
        onError: () => {
            message.error("sua that bai")
        }
    })


    function onFinish(values: IUser) {

        updateUser.mutate(values)
    }
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            form={form} onFinish={onFinish}
            initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
                'color-picker': null,
            }}
            style={{ maxWidth: 600 }}

        >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
                <Input />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                hasFeedback
                rules={[{ required: true, message: 'Please select a status!' }]}>
                <Select placeholder="Select a status">
                    <Select.Option value="active" style={{ color: "green" }}>Active</Select.Option>
                    <Select.Option value="banned" style={{ color: "red" }}>Banned</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="role"
                label="role"
                hasFeedback
                rules={[{ required: true, message: 'Please select a role!' }]}>
                <Select placeholder="Select a role">
                    <Select.Option value="admin" >admin</Select.Option>
                    <Select.Option value="user" >user</Select.Option>
                </Select>
            </Form.Item>

            {/* <Form.Item label="Image" name="image" rules={[{ required: true }]}>
                <Input />
            </Form.Item> */}




            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default UserEdit
