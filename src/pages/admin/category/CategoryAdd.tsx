import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IProductForm } from '../../../interface/product'
import { Icategory, IcategoryForm } from '../../../interface/category'

type Props = {}

const CategoryAdd = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IcategoryForm>()
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
    const navigate = useNavigate()
    const onSubmit = async (category: IcategoryForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/category`, category)
            alert('Thêm mới thành công')
            navigate('/admin/category')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-2xl mx-auto py-10'>
            <h1 className='font-bold text-[24px] text-center'>Thêm mới danh muc</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
                <input {...register("name", { required: true, minLength: 5 })} type='text' placeholder='Tên danh muc' />
                {(errors.name) && <span className='text-red-600 text-[12px]'>Tên không được để trống và ít nhất 5 kí tự</span>}
                <input {...register("image")} type='text' placeholder='Ảnh sản phẩm' />

              
                <div className='flex justify-end'>
                    <button className='bg-green-900 text-white py-1 px-4 rounded'>Thêm mới danh muc</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryAdd