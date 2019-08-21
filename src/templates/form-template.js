import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"

const FormLayout = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`

const FormTemplate = props => {
  const form = props.data.wpgraphql.gravityFormsForm
  const { title } = form

  return (
    <Layout>
      <FormLayout>
      <SEO title={title} />
      <Form form={form} />
      </FormLayout>
    </Layout>
  )
}

export default FormTemplate

export const GET_FORM = graphql`
  query GET_FORM($id: ID!) {
    wpgraphql {
      gravityFormsForm(id: $id) {
        id
        formId
        title
        fields(first: 500) {
          nodes {
            __typename
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
            ... on WPGraphQL_SectionField {
              type
              id
              label
              description
            }
            ... on WPGraphQL_SelectField {
              type
              id
              label
              cssClass
              isRequired
              choices {
                text
                value
              }            
            }
            ... on WPGraphQL_SignatureField {
              type
              id
              label
            }
            ... on WPGraphQL_TextAreaField {
              type
              id
              label
              cssClass
              isRequired
            }
            ... on WPGraphQL_TextField {
              type
              id
              label
              cssClass
              isRequired
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
