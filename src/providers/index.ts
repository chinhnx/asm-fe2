// API CRUD

import axios from "axios";

const token = localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: token && `Beaer ${token}`,
  },
});

type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};
// getList
export const getList = async ({ resource = "products" }) => {
  const { data } = await axiosClient.get(resource);
  return data;
};
// getOne
export const getOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await axiosClient.get(`${resource}/${id}`); // http://localhost:3000/products/1";
  return data;
};
// create
export const create = async ({ resource = "products", values }: Props) => {
  const { data } = await axiosClient.post(resource, values); // http://localhost:3000/products";
  return data;
};
// update
export const update = async ({ resource = "products", id, values }: Props) => {
  const { data } = await axiosClient.put(`${resource}/${id}`, values);
  return data;
};
// delete
export const deleteOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await axiosClient.delete(`${resource}/${id}`);
  return data;
};

export const auth = async ({ resource = "register", values }: Props) => {
  const { data } = await axiosClient.post(resource, values); // http://localhost:3000/register";
  return data;
};
