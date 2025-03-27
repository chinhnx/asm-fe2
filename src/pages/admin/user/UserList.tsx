import { Image, Table, Button, message, Modal } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserList() {
    const nav = useNavigate()
    const queryClient = useQueryClient();


    const getAllUser = async () => {
        const { data } = await axios.get("http://localhost:3000/users");

        const sortedUsers = data.sort((a: any, b: any) => (a.role === "admin" ? -1 : 1));

        return sortedUsers.map((user: any, index: number) => ({
            ...user,
            key: user.id || `user-${index}`,
        }));
    };
    //     Sắp xếp danh sách user (data.sort(...))

    // sort() sẽ sắp xếp lại danh sách user dựa vào giá trị role.

    // Nếu a.role === "admin", nó sẽ đưa user đó lên đầu (return -1).

    // Nếu không, user sẽ được đưa xuống sau (return 1).

    // ➡ Kết quả: Admin sẽ luôn đứng đầu danh sách.

    // Gán key cho từng user (map(...))

    // .map() chạy qua từng user và thêm thuộc tính key (dùng cho React).

    // Nếu user có id, dùng luôn id làm key.

    // Nếu không có id, tạo key dạng "user-<index>".

    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUser,
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        nav("/login"); 
    };
    const confirmLogout = ()=>{
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn đăng xuất",
            okText: "Có",
            okType: "danger",
            cancelText: "Hủy",
            onOk: handleLogout
        });

    }



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
            render: (status: string) => (
                <span style={{
                    color: status === "active" ? "green" : "red",
                    fontWeight: "bold"
                }}>
                    {status.toUpperCase()}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record: any) => (
                <div>
                    <Button type="primary">
                        <Link to={`/admin/user-edit/${record.id}`}>Edit</Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>Danh sach tai khoan</h1>
            <Table dataSource={data} columns={columns} loading={isLoading} />;
            <Button type="primary" danger onClick={confirmLogout} style={{ marginBottom: 16 }}>
                Đăng xuất
            </Button>
        </div>
        
    )
}

export default UserList;
