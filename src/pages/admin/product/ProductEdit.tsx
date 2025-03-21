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

    useEffect(() => {
        if (!product) return;
        form.setFieldsValue(product);
    }, [product]);

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
                name="name"
                label="Category"
                hasFeedback
                rules={[{ required: true, message: 'Please select your country!' }]}
            >
                <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
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
            <Form.Item
                name="select-multiple"
                label="Color"
                rules={[{  message: 'Please select your favourite colors!', type: 'array' }]}
            >
                <Select mode="multiple" placeholder="Please select favourite colors">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Stock">
                <Form.Item name="stock" noStyle>
                    <InputNumber min={1} max={30} />
                </Form.Item>

            </Form.Item>

            <Form.Item name="switch" label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item>

            {/* <Form.Item name="slider" label="Slider">
                <Slider
                    marks={{
                        0: 'A',
                        20: 'B',
                        40: 'C',
                        60: 'D',
                        80: 'E',
                        100: 'F',
                    }}
                />
            </Form.Item> */}
            {/* 
            <Form.Item name="radio-group" label="Radio.Group">
                <Radio.Group>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                </Radio.Group>
            </Form.Item> */}

            {/* <Form.Item
                name="radio-button"
                label="Radio.Button"
                rules={[{ required: true, message: 'Please pick an item!' }]}
            >
                <Radio.Group>
                    <Radio.Button value="a">item 1</Radio.Button>
                    <Radio.Button value="b">item 2</Radio.Button>
                    <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="checkbox-group" label="Checkbox.Group">
                <Checkbox.Group>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                A
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                                B
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                C
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="D" style={{ lineHeight: '32px' }}>
                                D
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="E" style={{ lineHeight: '32px' }}>
                                E
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="F" style={{ lineHeight: '32px' }}>
                                F
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item> */}

            <Form.Item name="rate" label="Rate">
                <Rate />
            </Form.Item>

            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}

            >
                <Upload name="Image" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            {/* <Form.Item
                name="color-picker"
                label="ColorPicker"
                rules={[{ required: true, message: 'color is required!' }]}
            >
                <ColorPicker />
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
    );
}

export default ProductEdit