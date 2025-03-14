import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IProduct } from '../../../interface/product'
import { Icategory } from '../../../interface/category'
type Props = {}

const ProductList = (props: Props) => {
  const [category, setCategory] = useState<Icategory[]>([])
  useEffect(() => {
      (async () => {
          try {
              const { data } = await axios.get('http://localhost:3000/category')

              setCategory(data)
          } catch (error) {
              console.log(error);

          }

      })()
  }, [])

  const [products, SetProduct] = useState<IProduct[]>([])
  useEffect(() => {
      const get_Products = async () => {
          try {
              const { data } = await axios.get(`http://localhost:3000/products`)
              SetProduct(data)
          } catch (error) {
              console.log(error);
          }
      }
      get_Products()
  }, [])

  const categoryMap = category.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
  }, {} as Record<string, string>);
  
  const delProduct = async (id: number | string) => {
      try {
          if (confirm("Bạn chắc chứ?")) {
              await axios.delete(`http://localhost:3000/products/${id}`)
              alert('Xóa thành công')
              const newproducts = products.filter(product => product.id != id)
              SetProduct(newproducts)
          }
      } catch (error) {
          console.log(error);
      }
  }
  return (
      <div className='max-w-2xl mx-auto'>
          <h1 className='font-bold text-[24px] text-center mt-4'>Danh sách sản phẩm</h1>
          <table className='border w-full [&_td]:border [&_th]:border mt-6'>
              <thead>
                  <tr>
                      <th>STT</th>
                      <th>Ảnh sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá tiền</th>
                      <th>danh muc</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {products.map((product, index) => (
                      
                      <tr key={product.id}>
                          <td>{index + 1}</td>
                          <td><img width={90} src={product.image} /></td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{categoryMap[product.categoryId] || "Không có danh mục"}</td>
                          <td>
                              <Link to={`/admin/product-edit/${product.id}`}>Sửa</Link>
                              <button onClick={() => delProduct(product.id)} >Xóa</button>
                          </td>

                      </tr>
                  ))}
              </tbody>
          </table>
          <div className='flex justify-center'>
          <Link className='bg-green-900 text-white py-1 px-4 rounded' to={`/admin/product-add`}>Them san pham</Link>
          </div>
      </div>
  )
  }

export default ProductList
