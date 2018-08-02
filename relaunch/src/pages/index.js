import React from 'react'
import Link from 'gatsby-link'
import Menu from '../components/Menu'
import Helmet from 'react-helmet'
import PostLink from '../components/PostLink'
import IndexMenu from '../components/IndexMenu'
import Footer from '../components/Footer'
import "../sass/main.scss"

export default class IndexPage extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      menu: "all"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(el) {
    el.preventDefault()
    if (!el.target.id) {
      return
    }   
    this.setState({menu: el.target.id})
  }

 render() {
  let edges = this.props.data.allMarkdownRemark.edges  

  if (this.state.menu !== "all") {
    edges = edges.filter(edge => edge.node.frontmatter.category.includes(this.state.menu))
  }  
  const posts = edges.map(edge => 
    <PostLink key={edge.node.id} post={edge.node} />)

  return (
      <div>
        <Helmet
          title="Fabi"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
      
      <div className="container container--center">   
          <div className="wrapper">
            <Menu />
            <IndexMenu active={this.state.menu} event={this.handleClick}/>
          </div>
        </div>
        {posts}
        <Footer />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
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
                sizes(maxWidth: 1200, duotone: {highlight: "#ba343c", shadow: "#100D26", opacity: 40}) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }`