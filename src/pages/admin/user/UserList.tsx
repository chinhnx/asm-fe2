import { Image, Table, Button } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserList() {
    const nav = useNavigate()
    const queryClient = useQueryClient();


    const getAllUser = async () => {
        const { data } = await axios.get("http://localhost:3000/users");
        return data.map((user: any, index: number) => ({
            ...user,
            key: user.id || `category-${index}`,
        }));
    };
    
    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUser,
    });




    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span style={{ color: "blue" }}>{text}</span>,
        },
        // {
        //     title: "Image",
        //     dataIndex: "image",
        //     key: "image",
        //     render: (image: string) => <Image src={image} width={100} />,
        // },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Adress",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
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
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>Danh sach tai khoan</h1>
            <Table dataSource={data} columns={columns} loading={isLoading} />;
        </div>
    )
}

export default UserList;
