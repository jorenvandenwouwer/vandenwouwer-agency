import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import {HeaderWrapper, Image} from './headerStyles/headerStyles'
import Menu from './Menu'

const Header = ({ siteTitle }) => {
  const {
    logo,
    wpcontent: {
      menuItems
    }
  } = useStaticQuery(graphql`
  query {
    logo: file(relativePath: {eq: "logo.png"}) {
      childImageSharp {
        fixed(quality: 100, width: 200){
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    wpcontent {
      menuItems {
        edges {
          node {
            label
            path
          }
        }
      }
    }
  }
  `)
  
  return <HeaderWrapper>
    <Link to="/">
      <Image alt="logo artist agency" fixed={logo.childImageSharp.fixed} />
    </Link>
    <Menu menuItems={menuItems.edges} />
  </HeaderWrapper>
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
