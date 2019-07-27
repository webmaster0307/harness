/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle, ThemeProvider } from  "styled-components"
import 'normalize.css'

import Header from "./header"
// import "./layout.css"

export const theme = {
  lightGreen: '#3dc133',
  lightGreenDarkened: '#38b12f',
  lightGray: '#d8d8d8',
  lightGrayDarkened: '#cecece',
  mediumGray: '#737373',
  white: '#fff',
  contentWidth: '92%',
  contentMaxWidth: '950px',
  borderRadius: '4px',
}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html, body {
    background: #efefef;
    font-family: Helvetica, sans-serif;
  }
  form {
    label {
      display: block;
      width: 100%;
      margin-bottom: 0.4rem;
      font-size: .9rem;
      color: #2D2D2D;
    }
    input[type="text"] {
      width: 100%;
      padding: .5rem .8rem;
      border-radius: ${theme.borderRadius};
      border: 1px solid #aaa;
    }
    select {
      display: block;
      font-size: 16px;
      font-family: sans-serif;
      font-weight: 700;
      color: #444;
      line-height: 1.3;
      padding: .5rem 1.4rem .5rem .8rem;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: 1px solid #aaa;
      border-radius: ${theme.borderRadius};
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
      background-repeat: no-repeat, repeat;
      background-position: right .7em top 50%, 0 0;
      background-size: .65em auto, 100%;

        &::-ms-expand {
            display: none;
        }
        &:hover {
            border-color: #888;
        }
        &:focus {
            border-color: #aaa;
            box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
            box-shadow: 0 0 0 3px -moz-mac-focusring;
            color: #222;
            outline: none;
        }
        option {
            font-weight:normal;
        }
    }
  }
  button,
  input[type="submit"] {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #bebebe;
    border-radius: ${props => props.theme.borderRadius};
    text-align: center;
    text-transform: uppercase;
    font-size: 1rem;
    color: ${props => props.theme.mediumGray};
    background: ${props => props.theme.lightGray};

    &:hover, &:active {
        cursor: pointer;
        background: ${props => props.theme.lightGrayDarkened};
    }

    &.button-primary {
      color: ${props => props.theme.white};
      background: ${props => props.theme.lightGreen};

      &:hover, &:active {
          background: ${props => props.theme.lightGreenDarkened};
      }
    }
  }
  .screen-reader {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
`

const StyledMain = styled.main`
  max-width: 26rem;
  margin: 0 auto;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <GlobalStyle />
      <div>
        <StyledMain>{children}</StyledMain>
        <footer>

        </footer>
      </div>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
