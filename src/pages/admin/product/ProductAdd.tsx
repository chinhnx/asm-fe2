import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import axios from "axios";
import { Icategory } from "../../../interface/category";
import { useNavigate } from "react-router-dom";

function ProductAdd() {

    const nav = useNavigate()
    const { Option } = Select;
    
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3000/categories");
            return data;
        },
    });

    const addProduct = async (data: any) => {


        await axios.post("http://localhost:3000/products", data);
    };
    

    const { mutate } = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            message.success("Them san pham thanh cong");
            nav("/admin/product")
        },
    });

    function onFinish(values: any) {
        console.log(values);
        mutate(values);
    }
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
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

export default ProductAdd;