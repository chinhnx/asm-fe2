import { Button, message, Modal, Table, Image } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icategory } from "../../../interface/category";

const CategoryList = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();

    // Fetch categories
    const getAllCategories = async () => {
        const { data } = await axios.get("http://localhost:3000/categories");
        return data.map((category:any, index:number) => ({
            ...category,
            key: category.id || `category-${index}`,
        }));
    };

    const { data, isLoading } = useQuery({
        queryKey: ["categories"], // ✅ Đúng query key
        queryFn: getAllCategories,
    });

    // Mutation để xóa danh mục
    const deleteCategory = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/categories/${id}`);
        },
        onSuccess: () => {
            message.success("Xóa thành công!");
            // queryClient.invalidateQueries(["categories"]); // ✅ Làm mới danh sách
        },
        onError: () => {
            message.error("Xóa thất bại!");
        },
    });

    // Hộp thoại xác nhận xóa
    const confirmDelete = (id: number) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa danh mục này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => deleteCategory.mutate(id),
        });
    };

    // Cấu trúc bảng
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
            title: "CreatAt",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "UpdateAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
        },
        
        {
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (record: any) => (
                <>
                    <Button
                        type="link"
                        onClick={() => nav(`/admin/category-edit/${record.id}`)}
                    >
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => confirmDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                style={{ marginBottom: 16 , backgroundColor: "green", borderColor: "green", color: "white"}}
                onClick={() => nav("/admin/category-add")} 
            >
                Add Category
            </Button>
            <Table dataSource={data} columns={columns} loading={isLoading} />
        </div>
    );
};

export default CategoryList;
