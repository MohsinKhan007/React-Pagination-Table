import React, { Suspense, lazy } from 'react'

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
// importing pages as Lazy for code splitting for optimization
const Users = lazy(() => import('./pages/Users'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Manufacturers = lazy(() => import('./pages/Manufacturers'))
const Products = lazy(() => import('./pages/Products'))

export const AppRoutes: React.FC = () => {
  const routes = [
    { path: '/', element: <Users /> },
    { path: '/products', element: <Products /> },
    { path: '/manufacturers', element: <Manufacturers /> },
    { path: '*', element: <PageNotFound /> },
  ]

  return (
    <Suspense fallback={<Layout>...loading....</Layout>}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  )
}
