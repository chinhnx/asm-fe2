import axios from 'axios'
import {
    Button, 
    Form,
    Input,
    InputNumber,
    message,
    Rate,
    Select,
    Space,
} from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icategory } from '../../../interface/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useList, useOne, useUpdate } from '../../../hooks';


type Props = {}

function ProductEdit () {
    const { Option } = Select;
    const nav = useNavigate()
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // const normFile = (e: any) => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e?.fileList;
    // };

    //antd
    const { id } = useParams();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { data: product } = useOne({ resource: "products", id });



    //category
     const { data: categories } = useList({ resource: "categories" });

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

    const { mutate } = useUpdate({ resource: "products", id });




    const onFinish = (values: any) => {
        mutate(values);
        nav("/admin/product")
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