import React from "react"
import Link from "gatsby-link"
import Img from 'gatsby-image'

const PostLink = ({ post }) => {
  if (post.frontmatter.hero) {
    return <HeroLink post={post} />
  } else {
    return <PlainLink post={post} />
  }
}

const PlainLink = ({ post }) => (
  <div className="container--small container--center card card--wmargin card__content">    
    <Link to={post.frontmatter.path}>
      <h1>{post.frontmatter.title}</h1>            
    </Link>

    <div className="post__meta">
      {post.frontmatter.date}
    </div>

    <div className="post__excerpt">
      <h3>{post.frontmatter.excerpt}</h3>   
    </div>
  </div>
)

const HeroLink = ({ post }) => (
  <div className="card card__background">
    <Img style={{ position: `absolute`, top: "0", left: 0, right: 0, zIndex: 0 }}
      sizes={post.frontmatter.hero.childImageSharp.sizes} 
    />
       
      <div className="container--small container--center card__content card__content--l">    
        <Link to={post.frontmatter.path}>
          <h1>{post.frontmatter.title}</h1>             
        </Link>    

        <div className="post__meta">
          {post.frontmatter.date}
        </div> 
    
        <div className="post__excerpt">
          <h3>{post.frontmatter.excerpt}</h3> 
        </div>
      </div>
    </div>
)

export default PostLink