import { Image, Table, Button, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const nav = useNavigate()
    const queryClient = useQueryClient();

  
    const getAllProduct = async () => {
        const { data } = await axios.get("http://localhost:3000/products");
        return data.map((product: any, index: number) => ({
            ...product,
            key: product.id || `product-${index}`,
        }));
    };

    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProduct,
    });

    // Mutation xoa san pham
    const deleteProduct = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/products/${id}`);
        },
        onSuccess: () => {
            message.success("Xoa thanh cong");
            queryClient.invalidateQueries(["products"]); 
        },
        onError: () => {
            message.error("Xoa that bai");
        },
    });

    

    const confirmDelete = (id: number) => {
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
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
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
                <Button type="primary" danger onClick={() => confirmDelete(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
      <div>
         <Button
        style={{ marginBottom: 16 , backgroundColor: "green", borderColor: "green", color: "white"}}
        onClick={() => nav("/admin/product-add")}
      >
        Them san pham
      </Button>
        <Table dataSource={data} columns={columns} loading={isLoading} />;
      </div>
    )
}

export default ProductList;
