import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import HamburgerIcon from "../components/hamburgerIcon"
import HarnessPhoneLogo from '../images/harness-logo-phone.png'
import { isLoggedIn } from "../services/auth"

const StyledHeader = styled.header`
  /* background-image: linear-gradient(180deg, #0C7418 0%, #0E5814 100%); */
  /* box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50); */
  padding: 1rem 1.0875rem;
  border-bottom: 2px solid ${props => props.theme.ghostGray};
  .inner-wrap {
    display: flex;
    margin: 0 auto;
    max-width: 960px;
    justify-content: space-between;
    align-content: center;
    max-height: 2.5rem;
  }
  .icon-container {
    flex: 1;
    &:last-of-type {
      text-align: right;
    }
    img {
      height: 2.5rem;
      width: auto;
    }
    svg {
      width: 2.5rem;
    }
  }
`

const Header = ({ siteTitle }) => (
  <>
  <StyledHeader>
    <div className="inner-wrap">
      <div className="icon-container">
        {/*
        @TODO: Switch to using gatsby-image for this, once
        there is a good way to size images by height.
        https://github.com/gatsbyjs/gatsby/issues/14988
        */}
        <Link to="/">
          <img src={HarnessPhoneLogo} alt="Harness logo" />
        </Link>
      </div>
      <div className="icon-container">
        <HamburgerIcon />
      </div>
    </div>
  </StyledHeader>
  </>
)

// {isLoggedIn() ?
//   <p>Logged in.</p>
//   :
//   <p>Logged out.</p>
// }

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
