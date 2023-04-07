import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="container-fluid" style={{ padding: '0.5rem 1rem' }}>
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
}
