import React from 'react'
import { Layout } from '../components/Layout'

import { CustomTable } from '../components/CustomTable'
import { useSelected } from '../hooks/useSelected'
import { products } from '../data/products'

import { Product } from '../interfaces/Products'
import { productcolumns } from '../consts/products'

const Products = () => {
  const { selectedRows, setSelectedRows } = useSelected<Product>()
  return (
    <Layout>
      {/* <CustomForm /> */}

      <CustomTable
        data={products}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={productcolumns}
        updateUser={() => {}}
      />
    </Layout>
  )
}

export default Products
