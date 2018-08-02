import React from 'react'
import Link from 'gatsby-link'

const Menu = () => (
  <div className="menu">
    <Link exact className="menu__item" activeClassName="menu__item--active" to="/">Articles</Link>
    <Link className="menu__item" activeClassName="menu__item--active" to="/about">About</Link>
    <Link className="menu__item" activeClassName="menu__item--active" to="/stories">Stories</Link>
  </div>
)

export default Menu