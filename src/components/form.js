import React, { useState } from "react"
import { Link } from "gatsby"
import gql from 'graphql-tag'
import { Mutation } from "react-apollo"

import { getUuid } from "../services/utilities"
import FormPage from "./formPage"

const CREATE_ENTRY = gql`
  mutation createGravityFormsEntry(
    $clientMutationId: String!
    $formId: Int!
    $allTextValues: [EntryTextValueInput]
  ) {
    createGravityFormsEntry(input: {
      clientMutationId: $clientMutationId,
      formId: $formId,
      allTextValues: $allTextValues
    }) {
      clientMutationId
      entry {
        entryId
        dateCreated
        form {
          node {
            title
          }
        }
        fields(first: 500) {
          edges {
            node {
              ... on DateField {
                type
                id
                label
                dateFormat
              }
              ... on MultiSelectField {
                type
                id
                label
                description
                choices {
                  text
                  value
                }
              }
              ... on PageField {
                type
                id
                label
              }
              ... on RadioField {
                type
                id
                label
                isRequired
                choices {
                  text
                  value
                }
              }
              ... on SectionField {
                type
                id
                label
                description
              }
              ... on SelectField {
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
              ... on SignatureField {
                type
                id
                label
              }
              ... on TextAreaField {
                type
                id
                label
                cssClass
                isRequired
              }
              ... on TextField {
                type
                id
                label
                cssClass
                isRequired
              }
            }
            fieldValue {
              ... on StringFieldValue {
                value
              }
              ... on AddressFieldValues {
                street
                lineTwo
                city
                state
                zip
                country
              }
            }
          }
        }
      }
    }
  }
`

const Form = ({form}) => {
  const [inputs, setInputs] = useState([])
  const [visiblePage, setVisiblePage] = useState(0)
  const { formId, button: { text: submitButtonText} } = form
  const fields = form.fields.nodes

  const getPageGroups = fields => {
    const pageGroups = []
    let index = 0

    fields.forEach(field => {
      if ( 'page' !== field.type) {
        if (!pageGroups[ index ]) pageGroups[ index ] = []
        pageGroups[ index ].push(field)
      } else {
        index++
      }
    })

    return pageGroups
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setInputValue( Number(name), value)
  }

  const getProjectLocationValue = projectValue => {
    switch (projectValue) {
      case '1':
        return '10325 Willodell Rd, Port Robinson, ON L0S 1K0'
      case '2':
        return '1812 Sir Isaac Brock Way, St. Catharines, ON L2S 3A1'
      case '3':
        return '300 Parkside Ave, Buffalo, NY 14214'
      case '4':
        return '237 Barton St E, Hamilton, ON L8L 2X2'
      case '5':
        return '102 E Main St, Welland, ON L3B 3W6, Canada'
      default:
        return ''
    }
  }

  const setInputValue = (id, value) => {
    const otherInputs = inputs.filter(input => input.id !== id)

    let newInputValues = [...otherInputs, { id, value }]
    
    // Fake auto-setting fields for ESFox
    if (Number(id) === 1) {
      // Project Numher
      newInputValues = newInputValues.filter(input => input.id !== 2)
      newInputValues.push({ id: 2, value: String( value * 2683 ) })

      // Project Location
      newInputValues = newInputValues.filter(input => input.id !== 3)
      newInputValues.push({ id: 3, value: getProjectLocationValue(value)})

       // Project Manager
      newInputValues = newInputValues.filter(input => input.id !== 4)
      newInputValues.push({ id: 4, value })
    }

    setInputs(newInputValues)
  }

  const pageGroups = getPageGroups(fields)
  const totalPages = pageGroups.length

  return (
    <Mutation mutation={CREATE_ENTRY}>
      {(createGravityFormsEntry, { loading, error, data }) => {
        if (error) return <p>Sorry, an error has occurred. Please reload the page and try again.</p>;

        if (data) {
          const { entry: createdEntry } = data.createGravityFormsEntry
          return (
            <>
              <h2>✓ Saved</h2>
              <p>Form entry has been saved to Harness.</p>
              <br />
              <br />
              <br />
              <Link
                to={`/entry/${createdEntry.entryId}`}
                state={{createdEntry}}
                className="button button--primary"
              >
                Review entry →
              </Link>
            </>
          )
        }

        return (
          <form
            id={`gravity-form-${formId}`}
            className="gravity-form"
            method="post"
            encType="multipart/form-data"
            onSubmit={e => {
              e.preventDefault()
              console.log(inputs)
              createGravityFormsEntry({ variables: {
                clientMutationId: getUuid(),
                formId,
                allTextValues: inputs,
              } });
            }}
          >
            <FormPage
              inputs={inputs}
              pageGroup={pageGroups[visiblePage]}
              visiblePage={visiblePage}
              setVisiblePage={setVisiblePage}
              totalPages={totalPages}
              formId={formId}
              loading={loading}
              submitButtonText={submitButtonText}
              handleInputChange={handleInputChange}
              setInputValue={setInputValue}
            />

            {/* <button onClick={event => {
              event.preventDefault()
              setVisiblePage(totalPages - 1)
            }}>Go to last page</button>
            <button onClick={event => {
              event.preventDefault()
              console.log(inputs)
            }}>Console log input state</button> */}
          </form>
        )
      }}
    </Mutation>
  )
}

export default Form
