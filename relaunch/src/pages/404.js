import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import PostLink from '../components/PostLink'

const NotFoundPage = ({data}) => {
  let edges = data.allMarkdownRemark.edges
  const posts = edges.map(edge => 
    <PostLink key={edge.node.id} post={edge.node} />)

  return(
    <div>
       <div className="container container--center">
          <div className="container--small container--center">   
            <div className="wrapper">
              <Menu />
              <h1>404 Not Found</h1>
              <h2>Were you looking for one of these articles?</h2>
              <hr />
            </div>
          </div>
        </div>
        <div className="container container--center">
          {posts}
        </div>
        <Footer />
      </div>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]},
      filter: {id: {regex: "/data/posts/"}}) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            category
            excerpt
            hero {
              childImageSharp {
                sizes(maxWidth: 1920, duotone: {highlight: "#8B575C", shadow: "#041736", opacity: 70}) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }`