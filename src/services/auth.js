import decode from 'jwt-decode'
import { getUserData, storeUserData } from './userData'
import { getUuid } from './utilities'

// Returns null if token is nonexistent.
export const getAuthToken = () => {
  const userData = getUserData()
  return userData && userData['authToken'] ? userData['authToken'] : null
}

// Returns null if token is nonexistent.
export const getRefreshToken = () => {
  const userData = getUserData()
  return userData && userData['refreshToken'] ? userData['refreshToken'] : null
}

const getTokenExpirationDate = token => {
  const decoded = decode(token)
  return decoded.exp ? new Date(decoded.exp * 1000) : null // Convert to milliseconds.
}

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token)
  return !date || date.valueOf() <= Date.now()
}

export const setAuthToken = authToken => {
  const userData = getUserData()
  if (!userData) return
  storeUserData({ ...userData, authToken })
}

export const refreshAuthToken = async () => {
  const query = `
    mutation RefreshJWTAuthToken( $input: RefreshJwtAuthTokenInput! ) {
      refreshJwtAuthToken( input:$input ) {
        authToken
      }
    }
  `

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          jwtRefreshToken: getRefreshToken(),
          clientMutationId: getUuid(),
        },
      },
    }),
  }

  try {
    // TODO: use process.env.WP_API_URL
    const response = await (await fetch('https://absolutesds.meghanmace.com/graphql', options)).json()

    if (response.errors && response.errors.length) return null

    const token = response.data.refreshJwtAuthToken.authToken

    setAuthToken(token)
    return token
  } catch (error) {
    return null
  }
}

export const isLoggedIn = async () => {
  let token = getAuthToken()

  // If auth token is expired, try to refresh it.
  if (token && isTokenExpired(token)) {
    token = await refreshAuthToken()
  }

  return token && !isTokenExpired(token)
}

export const convertUserIdToRelayId = userId => btoa(`user:${userId}`)
