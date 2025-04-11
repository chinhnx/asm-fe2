export interface IOrder {
  id?: number | string;
  name: string;
  address: string;
  phone: string;
  total: number;
  items: {
    productId: number;
    name: string;
    image:string;
    price: number;
    quantity: number;
  }[];
}
