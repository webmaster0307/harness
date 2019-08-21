import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = props => {
  const {
      pageContext: { id, postId, title, content, excerpt },
  } = props

  return (
    <Layout>
      <SEO title={title} />
      {/* @TODO */}
    </Layout>
  )
}
  
export default Page
