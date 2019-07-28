import React, { useState, useEffect } from "react"
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

  const handleInputChange = event => {
    const { name, value } = event.target
    setInputValue(name, value)
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
  useEffect(() => {
    const gravityForm = document.querySelector('.gravity-form')
    if (!gravityForm) return;
    const selects = [...gravityForm.querySelectorAll('select')]
    const textInputs = [...gravityForm.querySelectorAll('input[type="text"]')]

    // Project Number
    textInputs[0].value = selects[0].value ? selects[0].value * 2683 : ''

    // Project Manager
    selects[1].value = selects[0].value

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

    // Project Location
    textInputs[1].value = selects[0].value ? getProjectLocationValue(selects[0].value) : ''
  });

  const pageGroups = getPageGroups(fields)
  const totalPages = pageGroups.length

  const FieldContainer = styled.div`
    width: 100%;
    padding: 1.5rem 0;
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