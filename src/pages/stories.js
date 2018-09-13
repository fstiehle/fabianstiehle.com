import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'

const Stories = ( {data} ) => {
  const edges = data.allMarkdownRemark.edges  
  const stories = edges.map(edge => 
    <Card key={edge.node.id} data={edge.node.frontmatter} />)

  return (
    <div>
      <Helmet
          title="Stories - Fabian Stiehle"
        />
      <div className="container container--center">
        <div className="container--small container--center wrapper">   
          <Menu />
          <h1>Stories</h1>
          <hr />
        </div>
      </div>
      <div className="index">   
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

