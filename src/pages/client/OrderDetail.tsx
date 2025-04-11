import React from 'react'
import { useParams } from 'react-router-dom';
import { useOne } from '../../hooks';

const OrdersDetail = () => {
  const { id } = useParams();

  const { data: category } = useOne({ resource: "categories", id });
  const { data: product } = useOne({ resource: "products", id });
  const { data: user } = useOne({ resource: "users", id });
  return (
    <div>
      OrdersDetail
    </div>
  )
}

export default OrdersDetail
