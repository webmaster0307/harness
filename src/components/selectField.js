import React from 'react'

const SelectField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired, choices } = field
  const htmlId = `input_${formId}_${id}`

  return (
    <>
        <label htmlFor={htmlId}>{label}</label>
        <select
            id={htmlId}
            name={`input_${id}`}
            value={inputs[id]}
            onChange={event => handleInputChange(id, event)}
            required={isRequired}
        >
            {choices.map(({text, value}) => (
                <option key={value} value={value}>{text}</option>
            ))}
        </select>
    </>
  )
}

export default SelectField
