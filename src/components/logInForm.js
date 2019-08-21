import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { getUuid } from "../services/utilities"

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
      authToken
      refreshToken
      user {
        userId
        firstName
        lastName
        email
        language
      }
    }
  }
`;

const LogInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logIn, { loading, error, data }] = useMutation(LOG_IN)

  const handleSubmit = async e => {
    e.preventDefault()
    await logIn({ variables: {
      clientMutationId: getUuid(),
      username: email,
      password,
    } })
    data && storeUserData(data.login)
    setEmail('')
    setPassword('')
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="log-in-email">
          Email
          <input
            id="log-in-email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="log-in-password">
          Password
          <input
            id="log-in-password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        {error && 
          <p className="error">Invalid email address or password. Please try again.</p>
        }

        <button type="submit" className="button button--green">Log In</button>
      </fieldset>
    </Form>
  )
}

export default LogInForm
