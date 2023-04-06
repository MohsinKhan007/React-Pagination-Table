import React, { Suspense, lazy } from 'react'

import { Routes, Route } from 'react-router-dom'
// importing pages as Lazy for code splitting for optimization
const Users = lazy(() => import('./pages/Users'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Manufacturers = lazy(() => import('./pages/Manufacturers'))
const Products = lazy(() => import('./pages/Products'))

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>...loading....</div>}>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/manufacturers" element={<Manufacturers />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}
