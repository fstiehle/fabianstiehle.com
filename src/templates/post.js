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
      <div className="container--small container--center wrapper">   
        <Menu />
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.excerpt}</h2>
        <hr />
      </div>
    </div>
    <div className="container--small container--center wrapper ">
      <div className="post__content">
        <div className="post__meta">{post.frontmatter.date}</div>      
         <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div> 
    </div>
    <Footer />
  </div>
)

const HeroPost = ({ post }) => (
  <div>
    <div style={{ marginTop: 0 }} className="card card__background">
      <Img style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}	
        sizes={post.frontmatter.hero.childImageSharp.sizes} 
      />
      <div className="container--small container--center card__content card__content--l">   
        <div className="header-bg"><Menu /></div>
        <h1>{post.frontmatter.title}</h1>
        <h2 className="post__excerpt">{post.frontmatter.excerpt}</h2>
        <div className="post__meta">{post.frontmatter.date}</div>
      </div>
    </div>
    
    <div className="container--small container--center wrapper post__content"
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