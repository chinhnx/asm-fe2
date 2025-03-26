import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, deleteOne, getList, getOne, update } from "../providers";
import { message } from "antd";

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
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("Them thanh cong");
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
