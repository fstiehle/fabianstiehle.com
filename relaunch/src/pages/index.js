import React from 'react'
import Link from 'gatsby-link'
import Menu from '../components/menu'
import Helmet from 'react-helmet'

const IndexPage = () => (
  <div>
    <Helmet
      title="Fabian Stiehle"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />  
    <Menu />    
  </div>
)

export default IndexPage