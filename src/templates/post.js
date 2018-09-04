import React from 'react'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import IndexPage from "../pages/index"
import Helmet from 'react-helmet'

const PlainPost = ({ post }) => (
  <div>
    <Helmet
          title={post.frontmatter.title + " - Fabian Stiehle"}
          meta={[
            { name: 'description', content: post.frontmatter.excerpt },
          ]}
        />
    <div className="container container--center">
      <div className="container--small container--center">   
        <div style={{paddingBottom: 0}} className="wrapper">
          <Menu />
          <h1>{post.frontmatter.title}</h1>
          <hr />
          <h2 className="post__excerpt">{post.frontmatter.excerpt}</h2>
          <div className="post__meta">{post.frontmatter.date}</div>      
        
        </div>
      </div>
      <div style={{paddingTop: 0}} className="wrapper">
        <div className="post__content">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div> 
      </div> 
    </div>
    <Footer />
  </div>
)

const HeroPost = ({ post }) => (
  <div>
   <div className="container container--center">
      <div className="container--small container--center">   
        <div className="wrapper">
          <Menu />
          <hr />
        </div>
      </div>
    </div>
    <div style={{ marginTop: 0 }} className="card card__background">
      <Img style={{ position: `absolute`, top: 0, left: 0, right: 0, zIndex: 0 }}
        sizes={post.frontmatter.hero.childImageSharp.sizes} 
      />
      <div className="container--small container--center card__content card__content--l">   
        <h1>{post.frontmatter.title}</h1>
        <h2 className="post__excerpt">{post.frontmatter.excerpt}</h2>
        <div className="post__meta">{post.frontmatter.date}</div>
      </div>
    </div>
    
    <div className="container container--center wrapper post__content"
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
              highlight: "#8B575C", shadow: "#041736", opacity: 70
            }) {
                ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;