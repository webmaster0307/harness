import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle, ThemeProvider } from  "styled-components"
import 'normalize.css'

import Header from "./header"
import LogInModal from "./logInModal"
// import "./layout.css"

export const theme = {
  zucciniGreen: '#05400a',
  darkFernGreen: '#0e5814',
  forestGreen: '#207227',
  seaGreen: '#2f8132',
  goblinGreen: '#3f9142',
  fruitSaladGreen: '#57ae5B',
  deYorkGreen: '#7bc47f',
  mossGreen: '#a3d9a5',
  fringyFlowerGreen: '#c1eac5',
  willowBrookGreen: '#ddeedd',
  grannyAppleGreen: '#e3f9e5',
  snowDriftGreen: '#f0f5ee',
  white: '#fff',
  heavyMetal: '#323532',
  ghostGray: '#c6cbd4',
  contentMaxWidth: '60rem',
  contentWidth: '92%',
  borderRadius: '4px',

  lightGreen: '#3dc133',
  lightGreenDarkened: '#38b12f',
  lightGray: '#d8d8d8',
  lightGrayDarkened: '#cecece',
  mediumGray: '#737373',
}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html, body {
    background: ${props => props.theme.snowDriftGreen};
    font-family: Helvetica, sans-serif;
    color: ${props => props.theme.heavyMetal};
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
      padding: 1.35rem;
      border: 1px solid #aaa;
      border-radius: ${theme.borderRadius};
    }
    textarea {
      width: 100%;
      padding: 1.35rem;
      min-height: 200px;
      resize: none;
      border: 1px solid #aaa;
      border-radius: ${theme.borderRadius};
    }
    select {
      display: block;
      font-size: 16px;
      color: #444;
      line-height: 1.3;
      padding: 1.35rem;
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
      background-position: right 1.35em top 50%, 0 0;
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
  .button {
    width: 100%;
    padding: 1.35rem;
    border-radius: ${props => props.theme.borderRadius};
    text-align: center;
    text-transform: uppercase;
    font-size: 1rem;
    text-decoration: none;
    color: ${props => props.theme.mediumGray};
    cursor: pointer;
    background: ${props => props.theme.lightGray};
    &:hover, &:active {
      background: ${props => props.theme.lightGrayDarkened};
    }
  }
  .button--loading {
    padding-top: 0;
    padding-bottom: 0;
    background: ${props => props.theme.lightGreenDarkened};
  }
  .button--small {
    padding: 0.4rem 0.7rem;
    font-size: 0.9rem;
    text-transform: inherit;
    width: inherit;
  }
  .button--transparent {
    border: 1px solid ${props => props.theme.forestGreen};
    background: transparent;
    color: ${props => props.theme.forestGreen};
    &:hover, &:active {
      background: ${props => props.theme.forestGreen};
      color: ${props => props.theme.white};
    }
  }
  .button--light-green {
    border: 0;
    color: ${props => props.theme.white};
    background: ${props => props.theme.goblinGreen};
    &:hover, &:active {
      background: ${props => props.theme.seaGreen};
    }
  }
  .button--green {
    border: 0;
    color: ${props => props.theme.white};
    background: ${props => props.theme.forestGreen};
    &:hover, &:active {
        background: ${props => props.theme.darkFernGreen};
    }
  }
  .button--dark-green {
    border: 0;
    color: ${props => props.theme.white};
    background: ${props => props.theme.forestGreen};
    &:hover, &:active {
      background: ${props => props.theme.darkFernGreen};
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

const ContentContainer = styled.div`
  margin: 4rem 1rem;
`

const StyledMain = styled.main`
  max-width: ${props => props.theme.contentMaxWidth};
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
        <ContentContainer>
          <StyledMain>{children}</StyledMain>
          <footer>
            {/* <LogInModal /> */}
          </footer>
        </ContentContainer>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
