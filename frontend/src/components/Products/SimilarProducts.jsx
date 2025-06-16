import React from 'react'
import ProductGrid from './ProductGrid'

const SimilarProducts = ({similarProduct}) => {
  return (
    <div className='mt-20'>
        <h2 className='text-2xl text-center font-medium mb-4'>
            You May Also Like
        </h2>
        <ProductGrid products={similarProduct}/>
    </div>
  )
}

export default SimilarProducts