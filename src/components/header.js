import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import HamburgerIcon from "../components/hamburgerIcon"
import HarnessPhoneLogo from '../images/harness-logo-phone.png'

const StyledHeader = styled.header`
  background-image: linear-gradient(180deg, #0C7418 0%, #0E5814 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  margin-bottom: 1.45rem;
`

const HeaderInnerWrap = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem 1.0875rem;
  justify-content: space-between;
  
`

const IconContainer = styled.div`
  flex: 1;
  max-height: 1.8rem;
  width: auto;
  img {
      height: 100%;
      width: auto;
    }
`

const HamburgerIconContainer = styled(IconContainer)`
  text-align: right;
`

const StyledHeading = styled.h1`
  display: none;
  @media (min-width: 515px) {
    display: block;
  }
  flex: 10;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  font-family: Helvetica;
  font-size: 36px;
  font-size: 1.7rem;
  font-weight: 400;
  color: #CACACA;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <HeaderInnerWrap>
      <IconContainer>
        {/*
        @TODO: Switch to using gatsby-image for this, once
        there is a good way to size images by height.
        https://github.com/gatsbyjs/gatsby/issues/14988
        */}
        <img src={HarnessPhoneLogo} alt="Harness logo" />
      </IconContainer>
      <StyledHeading>Workplace Inspection</StyledHeading>
      <HamburgerIconContainer>
        <HamburgerIcon />
      </HamburgerIconContainer>
    </HeaderInnerWrap>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
