import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"

const FormPage = props => {
  const form = props.data.wpgraphql.gravityFormsForm
  const { title } = form

  return (
    <Layout>
      <SEO title={title} />
      <Form form={form} />
    </Layout>
  )
}

export default FormPage

export const formQuery = graphql`
  query GET_FORM($id: ID!) {
    wpgraphql {
      gravityFormsForm(id: $id) {
        id
        formId
        title
        fields(first: 200) {
          nodes {
            __typename
            ... on WPGraphQL_TextField {
              type
              id
              label
              isRequired
            }
            ... on WPGraphQL_SelectField {
              type
              id
              label
              isRequired
              choices {
                text
                value
              }            
            }
            ... on WPGraphQL_RadioField {
              type
              id
              label
              isRequired
              choices {
                text
                value
              }
            }
            ... on WPGraphQL_DateField {
              type
              id
              label
              dateFormat
            }
            ... on WPGraphQL_MultiSelectField {
              type
              id
              label
              description
              choices {
                text
                value
              }
            }
            ... on WPGraphQL_PageField {
              type
              id
              label
            }
            ... on WPGraphQL_SectionField {
              type
              id
              label
            }
            ... on WPGraphQL_SignatureField {
              type
              id
              label
            }
          }
        }
        button {
          type
          text
        }
        lastPageButton {
          type
          text
        }
        pagination {
          type
          pages
        }
        cssClass
        save {
          enabled
          button {
            type
            text
          }
        }
      }
    }
  }
`
