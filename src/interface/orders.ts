export interface IOrderField {
    id?:number|string,
    name:string,
    price:number,
    quantity:number,
    total:number
}
export type IOrder = Omit<IOrderField,"total">