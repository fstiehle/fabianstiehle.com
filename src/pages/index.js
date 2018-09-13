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
          title="Fabian Stiehle"
          meta={[
            { name: 'description', content: 'Life and technology.' },
          ]}
        />

        <div className="header">
          <div className="container container--small container--center wrapper">   
           <Menu />  
            <h1 className="title">Fabian</h1>
            <h2 className="site-description">Writing about technology and life.</h2>
            
            <hr />
            <IndexMenu active={this.state.menu} event={this.handleClick}/>
          
          </div>
        </div>
        <div className="index">
          {posts}
        </div>
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