import { Image, Table, Button, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { Icategory } from "../../../interface/category";
import { useDelete, useList } from "../../../hooks";

function CategoryList() {
    const nav = useNavigate()
    const { data, isLoading } = useList({ resource: "categories" });

    // Mutation xoa danh muc
    const { mutate } = useDelete({ resource: "categories" });




    const confirmDelete = (category: Icategory) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => mutate(category.id),
        });
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span style={{ color: "blue" }}>{text}</span>,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => <Image src={image} width={100} />,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record: any) => (
                <div>
                    <Button type="primary">
                        <Link to={`/admin/category-edit/${record.id}`}>Edit</Link>
                    </Button>
                    <Button type="primary" danger onClick={() => confirmDelete(record.id)}>
                        Delete
                    </Button>

                </div>

            ),

        },
    ];

    return (
        <div>
            <Button
                style={{ marginBottom: 16, backgroundColor: "#4a88e9",  color: "white" }}
                onClick={() => nav("/admin/category-add")}
            >
                Them danh muc
            </Button>
            <Table dataSource={data} columns={columns} loading={isLoading} />;
        </div>
    )
}

export default CategoryList;
