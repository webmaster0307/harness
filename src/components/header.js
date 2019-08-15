import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import HamburgerIcon from "../components/hamburgerIcon"
import HarnessPhoneLogo from '../images/harness-logo-phone.png'
import { isLoggedIn } from "../services/auth"

const StyledHeader = styled.header`
  background-image: linear-gradient(180deg, #0C7418 0%, #0E5814 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  padding: 1rem 1.0875rem;
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

const StyledHeading = styled.h1`
  display: none;
  @media (min-width: 40rem) {
    display: block;
  }
  flex: 10;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 400;
  color: #cacaca;
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
        <img src={HarnessPhoneLogo} alt="Harness logo" />
      </div>
      <StyledHeading>Workplace Inspection</StyledHeading>
      <div className="icon-container">
        <HamburgerIcon />
      </div>
    </div>
  </StyledHeader>
  {isLoggedIn() ?
    <p>Logged in.</p>
    :
    <p>Logged out.</p>
  }
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
