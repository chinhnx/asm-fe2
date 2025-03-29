export interface Icart {
    id:string|number,
    name:string,
    image:string;
    price:number;
    quantity:number;
    total:number;
    methodPayment:string;
    status:string;
  }