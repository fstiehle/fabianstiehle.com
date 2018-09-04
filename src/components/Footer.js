import React from "react"

const Footer = () => (
  <footer className="card card--wmargin">
    <div className="card__content card__content--constrained">
      <div style={{marginBottom: 10}}>Do you like what you see? <a href="https://www.buymeacoffee.com/Fabi">Buy me a coffe.</a></div>
      <div className="footer-bar">
        <span className="footer-bar__item">
          <a href="#top"><i className="icon-up-open-big"></i> Back to top</a>
        </span>
        <span className="footer-bar__item">
          <a href="https://github.com/fstiehle/fabianstiehle.com"><i className="icon-github-circled"></i> View Source</a>
        </span>
        <span className="footer-bar__item">
          <a href="/feed.xml"><i className="icon-rss"></i> Subscribe</a>
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
