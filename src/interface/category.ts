export interface Icategory {
  id:string|number,
  name:string,
  image:string,
  description: string,
  createdAt?: string; 
  updatedAt?: string;

  
}
export type IcategoryForm = Omit<Icategory,"id">