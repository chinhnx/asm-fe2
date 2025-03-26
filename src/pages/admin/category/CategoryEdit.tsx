import { Button, Form, Input, InputNumber, message, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOne, useUpdate } from "../../../hooks";

function CategoryEdit() {
    const nav = useNavigate();
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    // get data category theo id
    const { id } = useParams();
    const [form] = Form.useForm();

    const { data: category } = useOne({ resource: "categories", id });

    useEffect(() => {
        if (!category) return;
        form.setFieldsValue(category);
    }, [category]);

    const { mutate } = useUpdate({ resource: "categories", id });

    function onFinish(values: any) {
        mutate(values);
        nav("/admin/category");

    }
    return (
        <div>
            <Form
                name="validate_other"
                {...formItemLayout}
                form={form} 
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

export default CategoryEdit;
