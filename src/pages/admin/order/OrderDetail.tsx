import React from 'react'
import { useOne } from '../../../hooks';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();

  const { data: category } = useOne({ resource: "categories", id });
  const { data: product } = useOne({ resource: "products", id });
  const { data: user } = useOne({ resource: "users", id });
  return (
    <div>
      OrderDetail
    </div>
  )
}

export default OrderDetail
