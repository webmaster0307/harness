import React, { useState } from "react"
import styled from "styled-components"

import FormPage from "../components/formPage"
import Field from "../components/field"

const Form = ({form}) => {
  const [inputs, setInputs] = useState({})
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

  const handleInputChange = (id, event) => {
    const { value } = event.target
    setInputValue(id, value)
  }

  const setInputValue = (id, value) => {
    setInputs(inputs => ({...inputs, [id]: value}))
  }

  const handleSubmit = event => {
      event.preventDefault()
      console.log('Form submitted. Values:')
      console.log(inputs)
  }

  // Fake auto-setting fields for ESFox
  const gravityForm = document.querySelector('.gravity-form')
  if (gravityForm) {
    const selects = [...gravityForm.querySelectorAll('select')]
    const textInputs = [...gravityForm.querySelectorAll('input[type="text"]')]

    setTimeout( () => {
      textInputs[0].value = selects[0].value
      textInputs[1].value = selects[0].value
      selects[1].value = selects[0].value
    }, 400 )
  }

  const pageGroups = getPageGroups(fields)
  const totalPages = pageGroups.length

  const FieldContainer = styled.div`
    width: 100%;
    padding: 1.5rem;
    border: 1px solid #ddd;
  `

  return (
    <form
      id={`gravity-form-${formId}`}
      className="gravity-form"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
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
                key={field.id}
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
    </form>
  )
}

export default Form

// const CREATE_ENTRY = gql`
//   mutation createGravityFormsEntry(
//     $clientMutationId: "123456"
//     $key: String!
//     $login: String!
//     $password: String!
//   ) {
//     resetUserPassword(
//       input: { clientMutationId: $clientMutationId, key: $key, login: $login, password: $password }
//     ) {
//       user {
//         username
//         email
//       }
//     }
//   }
// `;