import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

const WhereIWrite = ({ data }) => (
  <div>
    <div className="container container--center">   
      <div className="wrapper">
        <Menu /> 
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div className="post__excerpt">
          <h2>{data.markdownRemark.frontmatter.excerpt}</h2>
        </div>
      </div>
    </div>

    <div className="row">
      {data.allImageSharp.edges.map(img=> {
      return ( 
        <div className="row__item--3">
          <Img sizes={img.node.sizes} />
      </div>)
      })}
    </div>
    <Footer />
  </div>
)

export default WhereIWrite

export const query = graphql`
  query WhereIWriteImageQuery {
    allImageSharp(filter: {id: {regex: "/data/stories/where-i-write/"}}) {
      edges {
        node {
          ... on ImageSharp {
            sizes(maxHeight: 800) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
    markdownRemark(id: {regex: "/data/stories/where-i-write/index.md/"}) {
      frontmatter {
        title
        excerpt
      }
    }
  }`
