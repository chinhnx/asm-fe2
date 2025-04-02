import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth, create, deleteOne, getList, getOne, update } from "../providers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  resource: string;
  id?: number | string;
};

export const useList = ({ resource = "products" }: Props) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};

export const useOne = ({ resource = "products", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
  });
};

export const useCreate = ({ resource = "products" }: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("Them thanh cong");
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
    onError: () => {},
  });
};

export const useUpdate = ({ resource = "products", id }: Props) => {
  return useMutation({
    mutationFn: (values: any) => update({ resource, id, values }),
    onSuccess: () => {
      message.success("Update thanh cong");
    },
    onError: () => {},
  });
};

export const useDelete = ({ resource = "products" }: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id?: number | string) => deleteOne({ resource, id }),
    onSuccess: () => {
      message.success("Xoa thanh cong");
      // cap nhat danh sach sau khi xoa
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
    onError: () => {},
  });
};

export const useAuth = ({ resource = "register" }) => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: async (values: any) => {
      const { repassword, ...userData } = {
        ...values,
        role: "user",
        status: "active",
      };

      return auth({resource, values:userData}).then((res) => res.data);
    },
    onSuccess: (data) => {
      message.success("Thành công!");

      if (resource === "register") {
        nav("/login"); // Nếu đăng ký, chuyển hướng đến trang đăng nhập
        return;
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      
    },
    onError: (error) => {
      message.error("Thất bại: "+ error.message);
    },
  });
};
