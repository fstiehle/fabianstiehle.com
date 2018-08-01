import React from "react";
import Link from "gatsby-link";

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      <h2>{post.frontmatter.title}</h2>
      <div className="post__meta">
        {post.frontmatter.date}
      </div>      
    </Link>
    <div className="post__excerpt">
      {post.frontmatter.excerpt}
    </div>
  </div>
)

export default PostLink