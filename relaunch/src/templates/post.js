import React from 'react'

export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { frontmatter, html } = post;

    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.date}
        
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        
      </div>
    )
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
      }
    }
  }
`;