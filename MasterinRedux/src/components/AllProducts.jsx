import React from 'react'
import { useGetProductsQuery } from '../app/service/dummyData';


const AllProducts = () => {
    const res = useGetProductsQuery();
    console.log(res);
  return (
    <div>AllProducts</div>
  )
}

export default AllProducts