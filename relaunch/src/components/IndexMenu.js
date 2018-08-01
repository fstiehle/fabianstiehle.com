import React from 'react'

const menu = {
  "all": "All",
  "tech": "Technology",
  "short": "Shortform",
  "long": "Longform"
}

const IndexMenu = ({ active, event }) => {
  const Menu = Object.keys(menu).map((key) => {
    let itemClass = "menu__item"
    if (key === active) {
      itemClass = itemClass += " menu__item--active"
    }
    return <button className={itemClass} key={key} onClick={event} id={key}>{menu[key]}</button>
  }
    
  )
  return (
    <div className="menu">
      {Menu}
    </div>
  ) 
}

export default IndexMenu