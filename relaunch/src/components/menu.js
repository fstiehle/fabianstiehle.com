import React from 'react'
import Link from 'gatsby-link'

const Menu = () => (
  <div className="menu">
    <Link exact className="menu__item" activeClassName="menu__item--active" to="/">Stories</Link>
    <Link className="menu__item" activeClassName="menu__item--active" to="/about">About</Link>
    <Link className="menu__item" activeClassName="menu__item--active" to="/where-i-write">Where I write</Link>
  </div>
)

export default Menu