import { Image, Table, Button, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "../../../interface/product";

function ProductList() {
    const nav = useNavigate()
    const queryClient = useQueryClient();


    const getAllProduct = async () => {
        const [productsRes, categoriesRes] = await Promise.all([
            axios.get("http://localhost:3000/products"),
            axios.get("http://localhost:3000/categories")
        ]);
    
        const products = productsRes.data;
        const categories = categoriesRes.data;
    
        // Tạo object để tra cứu tên danh mục theo categoryId
        const categoryMap = categories.reduce((acc: Record<string, string>, category: any) => {
            acc[category.id] = category.name;
            return acc;
        }, {});
    
        // Ánh xạ categoryId thành categoryName
        return products.map((product: any, index: number) => ({
            ...product,
            key: product.id || `product-${index}`,
            categoryName: categoryMap[product.categoryId] || "Unknown"
        }));
    };
    
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProduct,
    });

    // Mutation xoa san pham
    const deleteProduct = useMutation({
        mutationFn: async (id: IProduct) => {
            await axios.delete(`http://localhost:3000/products/${id}`);
        },
        onSuccess: () => {
            message.success("Xoa thanh cong");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: () => {
            message.error("Xoa that bai");
        },
    });



    const confirmDelete = (id: IProduct) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => deleteProduct.mutate(id),
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
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Sold",
            dataIndex: "sold",
            key: "sold",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record: any) => (
                <div>
                    <Button type="primary">
                        <Link to={`/admin/product-edit/${record.id}`}>Edit</Link>
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
                style={{ marginBottom: 16, backgroundColor: "green", borderColor: "green", color: "white" }}
                onClick={() => nav("/admin/product-add")}
            >
                Them san pham
            </Button>
            <Table dataSource={data} columns={columns} loading={isLoading} />;
        </div>
    )
}

export default ProductList;
