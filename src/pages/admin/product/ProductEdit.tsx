import axios from 'axios'
import {
    Button,
    Checkbox,
    Col,
    ColorPicker,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    Upload,
} from 'antd';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IProductForm } from '../../../interface/product'
import { Icategory } from '../../../interface/category'
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

type Props = {}

const ProductEdit = (props: Props) => {
    const { Option } = Select;

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    //antd
    const { id } = useParams();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const getProductDetail = async () => {
        if (!id) return;
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        return data;
    };
    const { data: product } = useQuery({
        queryKey: ["product"],
        queryFn: getProductDetail,
    });
    console.log({ product });



    //category
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3000/categories");
            return data;
        },
    });

    // Tạo object map categoryId -> categoryName
    const categoryMap = categories?.reduce((acc: Record<string, string>, category: Icategory) => {
        acc[category.id] = category.name;
        return acc;
    }, {});

    useEffect(() => {
        if (!product) return;
        form.setFieldsValue({
            ...product,
            categoryName: categoryMap?.[product.categoryId] || "Unknown",
        });
    }, [product, categories]);

    const updateProduct = useMutation({
        mutationFn: async (updatedProduct: any) => {
            return axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
        },
        onSuccess: () => {
            message.success("Cập nhật thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin/product");
        },
        onError: () => {
            message.error("Cập nhật thất bại!");
        },
    });



    const onFinish = (values: any) => {
        updateProduct.mutate(values);
    };

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

        ><Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="categoryId"
                label="Category"
                hasFeedback
                rules={[{ required: true, message: 'Please select a category!' }]}>
                <Select placeholder="Select a category">
                    {categories?.map((category: Icategory) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Image" name="image" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }, { type: "number", min: 0 }]}
            >
                <InputNumber />
            </Form.Item>


            <Form.Item label="Stock">
                <Form.Item name="stock" noStyle>
                    <InputNumber min={1} max={30} />
                </Form.Item>

            </Form.Item>


            <Form.Item name="rate" label="Rate">
                <Rate />
            </Form.Item>




            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default ProductEdit