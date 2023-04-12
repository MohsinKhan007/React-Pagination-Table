import React from 'react'
import { Layout } from '../components/Layout'
import { useSelected } from '../hooks/useSelected'
import { Manufacturer } from '../interfaces/Manufacturers'
import { CustomTable } from '../components/CustomTable'
import { manufacturerscolumn } from '../consts/manufacturers'
import { manufacturers } from '../data/manufacturers'
const Manufacturers = () => {
  const { selectedRows, setSelectedRows } = useSelected<Manufacturer>()

  return (
    <Layout>
      <CustomTable
        data={manufacturers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={manufacturerscolumn}
        updateUser={() => {}}
      />
    </Layout>
  )
}

export default Manufacturers
