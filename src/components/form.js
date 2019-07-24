import React, { useState } from "react"

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
      console.log('form submitted')
      console.log('"inputs" values:')
      console.log(inputs)
  }

  // Fake auto-setting fields for ESFox
  if (inputs[`input_1`]) {
    setTimeout( () => {
      const form = document.querySelector('form')
      form.querySelector('input[name="input_2"]').value = inputs[`input_1`]
      form.querySelector('input[name="input_3"]').value = inputs[`input_1`]
      form.querySelector('select[name="input_4"]').value = inputs[`input_1`]
    }, 400 )
  }

  const pageGroups = getPageGroups(fields)
  const totalPages = pageGroups.length

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
            <Field
              key={field.id}
              field={field}
              formId={formId}
              inputs={inputs}
              handleInputChange={handleInputChange}
              setInputValue={setInputValue}
            />
          ))}
        </FormPage>
      ))}
    </form>
  )
}

export default Form
