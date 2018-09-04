import React from "react"
import Link from "gatsby-link"
import Img from 'gatsby-image'

const Card = ({ data }) => (
  <div className="card card__background">
    <Img style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
      sizes={data.hero.childImageSharp.sizes} 
    />
       
      <div className="card__content card__content--l card__content--constrained">    
        <Link to={data.link}>
          <h1>{data.title}</h1>             
        </Link>  
    
        <div className="post__excerpt">
          <h3>{data.excerpt}</h3> 
        </div>
      </div>
    </div>
)

export default Card
