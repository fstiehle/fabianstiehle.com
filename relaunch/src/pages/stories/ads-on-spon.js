import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'

const AdsOnSPON = ({ data }) => (
  <div>
    <div className="container container--center">
      <div className="container--small container--center">   
        <div className="wrapper">
          <Menu />
          <h1>{data.markdownRemark.frontmatter.title}</h1>
          <h2>{data.markdownRemark.frontmatter.excerpt}</h2>
          <hr />
        </div>
      </div>
    </div>

    <div style={{maxWidth: 800}} className="card card--wmargin container container--center">
      <Img sizes={data.allImageSharp.edges[0].node.sizes} />      
      <div className="card__content card__content--wmargin">
        <div className="post__meta">
          Viewed 19 April 2016, Picture: O2
        </div>
        We start with a harmless example back in 2016. O2 even shows some ingenuity as their ad relates to the content shown. It reads: "Closed doors or open Gates". This is fine. 😇
      </div>
    </div>
    <div style={{maxWidth: 800}} className="card card--wmargin container container--center">
      <Img sizes={data.allImageSharp.edges[1].node.sizes} />
      <div className="card__content card__content--wmargin">
        <div className="post__meta">
          Viewed 19 July 2017
        </div>
        As normal background images don't get the readers attention anymore Spiegel shifts to background videos. And what were you thinking? Of course they autoplay! 😘
      </div>
    </div>
    <div style={{maxWidth: 800}} className="card card--wmargin container container--center">
      <Img sizes={data.allImageSharp.edges[2].node.sizes} />
      <div className="card__content card__content--wmargin">
        <div className="post__meta">
          Viewed 30 January 2018
        </div>
        The self-evident evolution of the background ad is of course—the foreground ad. Eliminating all the aggravating content, like news articles, along the way. Good thinking! 😋
      </div>
    </div>
    <div style={{maxWidth: 800}} className="card card--wmargin container container--center">
      <Img sizes={data.allImageSharp.edges[3].node.sizes} />
      <div className="card__content card__content--wmargin">
        <div className="post__meta">
          Viewed 25 February 2018
        </div>
        The pure genius of bringing static ads from the background to the foreground ... how could they possibly improve on that idea? Well, they did. A foreground video! 🙏
      </div>
    </div>
    <Footer />
  </div>
)

export default AdsOnSPON

export const query = graphql`
  query AdsOnSPONQuery {
    allImageSharp(filter: {id: {regex: "/data/stories/ads-on-spon/"}}) {
      edges {
        node {
          ... on ImageSharp {
            sizes(maxWidth: 1400) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
    markdownRemark(id: {regex: "/data/stories/ads-on-spon/index.md/"}) {
      frontmatter {
        title
        excerpt
      }
    }
  }`
