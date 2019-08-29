import React from 'react'
import { UserProvider } from './user'

const ProviderComposer = ({ contexts, children }) => {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  )
}

const ContextProvider = ({ children }) => {
  return (
    <ProviderComposer contexts={[<UserProvider />]}>
      {children}
    </ProviderComposer>
  )
}

export { ContextProvider }
