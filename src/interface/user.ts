export interface IUser{
    id:number|string;
    name:string;
    email:string;
    phone:string;
    password:string;
    address: string,
    role: "admin" | "user";  
    status: "active" | "banned";  
    createdAt?: string;  
    updatedAt?: string;
}

export type IRegisterForm = Omit<IUser,"id">
export type ILoginForm = Pick<IUser,"email"|"password">