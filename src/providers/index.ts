// API CRUD

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};
// getList
export const getList = async ({ resource = "products" }) => {
  const { data } = await axios.get(resource);
  return data;
};
// getOne
export const getOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await axios.get(`${resource}/${id}`); // http://localhost:3000/products/1";
  return data;
};
// create
export const create = async ({ resource = "products", values }: Props) => {
  const { data } = await axios.post(resource, values); // http://localhost:3000/products";
  return data;
};
// update
export const update = async ({ resource = "products", id, values }: Props) => {
  const { data } = await axios.put(`${resource}/${id}`, values);
  return data;
};
// delete
export const deleteOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await axios.delete(`${resource}/${id}`);
  return data;
};
