import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Card from '../components/Card'

const Stories = ( {data} ) => {
  const edges = data.allMarkdownRemark.edges  
  const stories = edges.map(edge => 
    <Card key={edge.node.id} data={edge.node.frontmatter} />)

  return (
    <div>
      <div className="container container--center">   
        <div className="wrapper">
          <Menu /> 
          <h1>Stories</h1>
        </div>
        {stories}
      </div>      
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
                sizes(maxWidth: 1920, duotone: {highlight: "#ba343c", shadow: "#100D26", opacity: 40}) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }          
        }
      }
    }
  }`

