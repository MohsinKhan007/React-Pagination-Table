import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to={'/'}>
          <img
            src={`sitoo-logo`}
            width="100"
            height="40"
            className="d-inline-block align-top"
            alt="Sitoologo"
          />
        </Link>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to={`/users`}
                className={({ isActive }) =>
                  isActive ? 'active nav-link' : ' nav-link'
                }
                relative="path"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/manufacturers`}
                className={({ isActive }) =>
                  isActive ? 'active nav-link' : ' nav-link'
                }
                relative="path"
              >
                Manufacturers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={`/products`}
                className={({ isActive }) =>
                  isActive ? 'active nav-link' : ' nav-link'
                }
                relative="path"
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
