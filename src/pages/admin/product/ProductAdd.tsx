import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IProductForm } from '../../../interface/product'
import { Icategory } from '../../../interface/category'

type Props = {}

const ProductAdd = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IProductForm>()
    
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
    const onSubmit = async (product: IProductForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/products`, product)
            alert('Thêm mới thành công')
            navigate('/admin/product')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-2xl mx-auto py-10'>
            <h1 className='font-bold text-[24px] text-center'>Thêm mới sản phẩm</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
                <input {...register("name", { required: true, minLength: 5 })} type='text' placeholder='Tên sản phẩm' />
                {(errors.name) && <span className='text-red-600 text-[12px]'>Tên không được để trống và ít nhất 5 kí tự</span>}
                <input {...register("image")} type='text' placeholder='Ảnh sản phẩm' />
                <input {...register("price",{pattern:/^\d*$/,required:true,min:1000})} type='text' placeholder='Giá sản phẩm'/>
                <input {...register("description", { required: true })} type='text' placeholder='Mo ta san pham' />
                {(errors.description) && <span className='text-red-600 text-[12px]'>Mo ta không được để trống</span>}
                {/* <input {...register("descriptionDetail", { required: true })} type='text' placeholder='Mo ta chi tiet san pham' />
                {(errors.descriptionDetail) && <span className='text-red-600 text-[12px]'>Mo ta không được để trống và ít nhất 5 kí tự</span>}
                <input {...register("price", { validate: (value: any) => !isNaN(value), required: true })} type='text' placeholder='Giá sản phẩm' />
                {(errors.price) && <span className='text-red-600 text-[12px]'>Giá phải là số</span>}
                <select {...register("categoryId")}>
                    {
                        category.map((category)=>(
                            <option value={category.id}>{category.name}</option>
                        ))
                    }
                    
                </select> */}
                <div className='flex justify-end'>
                    <button className='bg-green-900 text-white py-1 px-4 rounded'>Thêm mới sản phẩm</button>
                </div>
            </form>
        </div>
    )
}

export default ProductAdd