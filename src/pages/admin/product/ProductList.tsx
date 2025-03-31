import { Image, Table, Button,  Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "../../../interface/product";
import { useDelete, useList } from "../../../hooks";
import { useEffect, useState } from "react";

function ProductList() {
    const nav = useNavigate()
    const { data: products, isLoading: isLoadingProducts } = useList({ resource: "products" });
    const { data: categories } = useList({ resource: "categories" });

    // State lưu trữ danh sách sản phẩm sau khi đã ghép với danh mục
    const [productList, setProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        if (products && categories) {
            // Tạo object để tra cứu tên danh mục theo categoryId
            const categoryMap = categories.reduce((acc: Record<string, string>, category: any) => {
                acc[category.id] = category.name;
                return acc;
            }, {});

            // Gán categoryName cho từng sản phẩm
            const getCategoryName = products.map((product: any) => ({
                ...product,
                key: product.id,
                categoryName: categoryMap[product.categoryId] || "Unknown",
            }));

            setProductList(getCategoryName);
        }
    }, [products, categories]);


    // Mutation xoa san pham
    const { mutate } = useDelete({ resource: "products" });




    const confirmDelete = (product: IProduct) => {
        console.log("Product ID:", product.id, typeof product.id); // Kiểm tra kiểu dữ liệu id
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => mutate(product.id),
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
            <Table dataSource={productList} columns={columns} loading={isLoadingProducts} />;
        </div>
    )
}

export default ProductList;
