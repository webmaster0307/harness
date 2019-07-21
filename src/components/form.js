import React, { useState } from "react"

import TextField from "../components/textField"
import TextAreaField from "../components/textAreaField"
import SelectField from "../components/selectField"
import RadioField from "../components/radioField"
import DateField from "../components/dateField"

const Form = ({form}) => {
  const [inputs, setInputs] = useState({})
  const [pages, setPages] = useState({})
  const { formId, button: { text: submitButtonText} } = form
  const fields = form.fields.nodes

  const handleInputChange = event => {
    const { name, value } = event.target
    setInputValue(name, value)
  }

  const setInputValue = (name, value) => {
    setInputs(inputs => ({...inputs, [name]: value}))
  }

  const handleSubmit = event => {
      event.preventDefault()
      console.log('form submitted')
  }

  const pageFields = fields.filter(field => 'page' === field.type)
  setPages(pageFields)

  // Fake auto-setting fields for ESFox
  if (inputs[`input_1`]) {
    setTimeout( () => {
      const form = document.querySelector('form')
      form.querySelector('input[name="input_2"]').value = inputs[`input_1`]
      form.querySelector('input[name="input_3"]').value = inputs[`input_1`]
      form.querySelector('select[name="input_4"]').value = inputs[`input_1`]
    }, 400 )
  }

  return (
    <form id={`gravity-form-${formId}`} classname="gravity-form" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      {fields.map( field => {
        if ( 'page' === field.type ) {
          return <PageField key={field.id} formId={formId} field={field} pageFields={pageFields} />
        } else if ( 'text' === field.type ) {
          return <TextField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        } else if ( 'textarea' === field.type ) {
          return <TextAreaField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        } else if ( 'select' === field.type ) {
          return <SelectField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        } else if ( 'radio' === field.type ) {
          return <RadioField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        } else if ( 'date' === field.type ) {
          return <DateField key={field.id} formId={formId} field={field} inputs={inputs} setInputValue={setInputValue} />
        } else {
          return <p key={Math.random()}>{field.type}</p>
        }
      })}
      <input type="submit" value={submitButtonText} />
    </form>
  )
}

export default Form
