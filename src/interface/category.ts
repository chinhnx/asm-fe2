export interface Icategory {
  id:string|number,
  name:string,
  image:string,
}
export type IcategoryForm = Omit<Icategory,"id">