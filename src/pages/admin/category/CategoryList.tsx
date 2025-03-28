import { Image, Table, Button, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Icategory } from "../../../interface/category";

function CategoryList() {
    const nav = useNavigate()
    const queryClient = useQueryClient();


    const getAllCategory = async () => {
        const { data } = await axios.get("http://localhost:3000/categories");
        return data.map((category: any, index: number) => ({
            ...category,
            key: category.id || `category-${index}`,
        }));
    };

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategory,
    });

    // Mutation xoa danh muc
    const deleteCategory = useMutation({
        mutationFn: async (id: Icategory) => {
            await axios.delete(`http://localhost:3000/categories/${id}`);
        },
        onSuccess: () => {
            message.success("Xoa thanh cong");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: () => {
            message.error("Xoa that bai");
        },
    });



    const confirmDelete = (id: Icategory) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => deleteCategory.mutate(id),
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
