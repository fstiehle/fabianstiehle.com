import React from 'react'
import Link from 'gatsby-link'
import Menu from '../components/Menu'
import Helmet from 'react-helmet'
import PostLink from '../components/PostLink'
import IndexMenu from '../components/IndexMenu'
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
    console.log(edges)
    edges = edges.filter(edge => edge.node.frontmatter.category.includes(this.state.menu))
  }  
  
  const posts = edges.map(edge => 
    <PostLink key={edge.node.id} post={edge.node} />)

  return (
      <div>
        <Helmet
          title="Fabian Stiehle"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Menu />
        <IndexMenu active={this.state.menu} event={this.handleClick}/>

        {posts}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            category
            excerpt
          }
        }
      }
    }
  }
`;