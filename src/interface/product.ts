export interface IProduct {
    id:string|number,
    name:string,
    price:number,
    image:string,
    description: string,
    descriptionDetail: string,
    categoryId:string
    category:string
  }
  export type IProductForm = Omit<IProduct,"id">