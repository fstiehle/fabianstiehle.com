import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'

const About = ({ data }) => (
  <div>
    <Helmet
          title="About - Fabian Stiehle"
        />
    <div className="container container--center">
      <div className="container--small container--center">   
        <div className="wrapper">
          <Menu />
          <h1>Fabian</h1>
          <hr />
        </div>
      </div>
    </div>
    <div className="container container--center">  
      <Img sizes={data.imageSharp.sizes} />        
      <div className="grid about wrapper">
        
          <div className="grid__item--2">
            <a style={{display: "block"}} href="https://github.com/fstiehle?tab=repositories">Projects <i className="icon-right-open-big"></i></a>
            <a style={{display: "block"}} href="/dl/Owl_inspector_master_digital.pdf">Bachelor's Thesis <i className="icon-right-open-big"></i></a>
          </div>
          <div className="grid__item--2 social">
            <a href="https://github.com/fstiehle/"><i className="icon-github-circled"></i></a>
            <a href="https://twitter.com/fstiehle"><i className="icon-twitter"></i></a>
            <a href="https://medium.com/@fstiehle/"><i className="icon-medium"></i></a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default About

export const query = graphql`
query AboutImageQuery {
  imageSharp(id: {regex: "/data/about/1.jpg/"}) {
    ... on ImageSharp {
      sizes(maxHeight: 365) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
}`
