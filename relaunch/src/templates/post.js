import React from 'react'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

const PlainPost = ({ post }) => (
  <div>
    <div className="container container--center">
      <div className="wrapper">
        <Menu />
      </div>   

      <div className="post__content">
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.excerpt}</h2>
        <div className="post__meta">{post.frontmatter.date}</div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>  
    </div>
    <Footer />
  </div>
)

const HeroPost = ({ post }) => (
  <div>
    <div className="container container--center">
      <div className="wrapper">
        <Menu />
      </div>
    </div>
    <div style={{ marginTop: 0 }} className="card card__background">
      <Img style={{ position: `absolute`, top: 0, left: 0, right: 0, zIndex: 0 }}
        sizes={post.frontmatter.hero.childImageSharp.sizes} 
      />
      <div className="card__content card__content--l card__content--constrained">   
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.excerpt}</h2>
        <div className="post__meta">{post.frontmatter.date}</div>
      </div>
    </div>
    
    <div className="container container--center post__content"
      dangerouslySetInnerHTML={{ __html: post.html }} /> 

    <Footer />       
  </div>
)

export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    if (post.frontmatter.hero) {
      return <HeroPost post={post} />
    } else {
      return <PlainPost post={post} />
    }
  }
}

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        excerpt
        hero {
          childImageSharp {
            sizes(maxWidth: 1920, duotone: {
              highlight: "#ba343c",
              shadow: "#100D26",
              opacity: 40
            }) {
                ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;