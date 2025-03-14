import React, { useEffect, useState } from 'react'
// import { Icategory } from '../interface/category'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Icategory } from '../../../interface/category'

type Props = {}

const CategoryList = (props: Props) => {
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
    const delCategory = async (id: number | string) => {
        try {
            if (confirm("Bạn chắc chứ?")) {
                await axios.delete(`http://localhost:3000/category/${id}`)
                alert('Xóa thành công')
                const newcategorys = category.filter(category => category.id != id)
                setCategory(newcategorys)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-2xl mx-auto'>
            <h1 className='font-bold text-[24px] text-center mt-4'>Danh sách danh muc</h1>
            <table className='border w-full [&_td]:border [&_th]:border mt-6'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên danh muc</th>
                        <th>Ảnh danh muc</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td><img width={90} src={category.image} /></td>
                            <td>
                                <Link className='bg-green-700 text-white px-4 py-1 rounded' to={`/admin/category-edit/${category.id}`}>Sửa</Link>
                                <button onClick={() => delCategory(category.id)} className='bg-red-700 text-white px-4 py-1 rounded'>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Link className='bg-green-900 text-white py-1 px-4 rounded' to={`/admin/category-add`}>Them danh muc</Link>
            </div>
        </div>
    )
}

export default CategoryList