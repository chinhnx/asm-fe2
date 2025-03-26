export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId:string;
  stock:number;
  sold:number;
  }
  export type IProductForm = Omit<IProduct,"id">


  export interface ICartItem extends IProduct {
    quantity: number;
  }