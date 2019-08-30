import React, { useState, useEffect, useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import InputField from "./inputField"
import { UserContext } from "../context/user"
import { getUuid } from "../services/utilities"
import { storeUserData } from "../services/userData"

const LOG_IN = gql`
  mutation LOG_IN(
    $clientMutationId: String!
    $username: String!,
    $password: String!,
  ) {
    login(
      input: {
        clientMutationId: $clientMutationId
        username: $username,
        password: $password,
      }
    ) {      
      user {
        userId
        firstName
        lastName
        email
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`

const LogInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logIn, { loading, error, data }] = useMutation(LOG_IN)
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

  useEffect(() => {
    if (loading || !data) return
    storeUserData(data.login)
    setEmail('')
    setPassword('')
    setIsLoggedIn(true)
    alert('successfully logged in')
  }, [loading, data])

  const handleSubmit = e => {
    e.preventDefault()
    if(validateForm){
      logIn({ variables: {
        clientMutationId: getUuid(),
        username: email,
        password,
      } })
    }    
  }
  console.log('global context:', isLoggedIn)

  const validateEmail = (value) => {
    const errors = []
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (!re.test(value)) {
      errors.push('Must be a valid email.')
    }
    if (value === '') {
      errors.push('Email is required')
    }
    return errors
  }

  const validateText = (value) => {
    const errors = []
    if (value === '') {
      errors.push('Password is required')
    }
    return errors
  }

  const validateForm = () => {
    const errors = []
      .concat(this.validateText(this.state.name))
      .concat(this.validateEmail(this.state.email))
      .concat(this.validateText(this.state.message))
    return errors.length === 0
  }

  return (
      <form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="log-in-email">
            Email
            <InputField
              id="log-in-email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              handleChange={e => setEmail(e.target.value)}
              errors={validateEmail(email)}
            />
          </label>

          <label htmlFor="log-in-password">
            Password
            <InputField
              id="log-in-password"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              handleChange={e => setPassword(e.target.value)}
              errors={validateText(password)}
            />
          </label>

          {error && 
            <p className="error">Invalid email address or password. Please try again.</p>
          }

          <button type="submit" className="button button--green">Log In</button>
        </fieldset>
      </form> 
  )
}

export default LogInForm
