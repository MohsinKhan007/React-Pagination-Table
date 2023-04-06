import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div
        className="text-center p-3"
        style={{ backgroundColor: `rgba(0, 0, 0, 0.2)`, color: 'white' }}
      >
        © 2020 Copyright:
        <a className="text-light" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  )
}
