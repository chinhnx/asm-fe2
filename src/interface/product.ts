export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  }
  export type IProductForm = Omit<IProduct,"id">