import React, { useState, useEffect } from "react"
import styled from "styled-components"
import gql from 'graphql-tag'
import { Mutation } from "react-apollo"

import { getUuid } from "../services/utilities"
import FormPage from "../components/formPage"
import Field from "../components/field"

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
    setInputValue(name, value)
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

    let newInputValues = [...otherInputs, { id: Number( id ), value }]
    
    // Fake auto-setting fields for ESFox
    if (id == 1) {
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

  const FieldContainer = styled.div`
    width: 100%;
    padding: 1.5rem 0;
  `

  return (
    <Mutation mutation={CREATE_ENTRY}>
      {(createGravityFormsEntry, { loading, error }) => (
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
          {pageGroups.map((pageGroup, pageIndex) => (
            <FormPage
              key={pageIndex}
              pageIndex={pageIndex}
              visiblePage={visiblePage}
              totalPages={totalPages}
              setVisiblePage={setVisiblePage}
              submitButtonText={submitButtonText}
            >
              {pageGroup.map(field => (
                <FieldContainer key={field.id}>
                  <Field
                    field={field}
                    formId={formId}
                    inputs={inputs}
                    handleInputChange={handleInputChange}
                    setInputValue={setInputValue}
                  />
                </FieldContainer>
              ))}
            </FormPage>
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </form>
      )}
    </Mutation>
  )
}

export default Form
