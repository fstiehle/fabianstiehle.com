import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Card from '../components/Card'
import Footer from '../components/Footer'

const Stories = ( {data} ) => {
  const edges = data.allMarkdownRemark.edges  
  const stories = edges.map(edge => 
    <Card key={edge.node.id} data={edge.node.frontmatter} />)

  return (
    <div>
      <div className="container container--center">
        <div className="container--small container--center">   
          <div className="wrapper">
            <Menu />
            <h1>Stories</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="container container--center">   
        {stories}
      </div>
      <Footer />
    </div>
  )
}

export default Stories

export const pageQuery = graphql`
  query StoriesIndexQuery {
    allMarkdownRemark(
      filter: { id: {regex: "/data/stories/.*/index.md/" }}      
    ) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            link
            hero {
              childImageSharp {
                sizes(maxWidth: 1920, duotone: {highlight: "#8B575C", shadow: "#041736", opacity: 90}) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }          
        }
      }
    }
  }`

