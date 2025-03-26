import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../../hooks";
import { Icategory } from "../../../interface/category";



function CategoryAdd() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const nav = useNavigate();

    const { mutate } = useCreate({ resource: "categories" });

    function onFinish(values: Icategory) {
        mutate(values);
        nav("/admin/category");
    }
    return (
        <div>
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


                <Form.Item label="Image" name="image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input />
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
        </div>
    );
}

export default CategoryAdd;
