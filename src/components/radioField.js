import React from 'react'

const RadioField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired, choices } = field
  const htmlId = `input_${formId}_${id}`

  return (
    <>
        <p>{label}</p>
        {choices.map(({text, value}) => (
            <div key={value}>
                <input
                    type="radio"
                    id={htmlId}
                    name={`input_${id}`}
                    value={value}
                    onChange={handleInputChange}
                    required={isRequired}
                />
                <label htmlFor={htmlId}>{text}</label>
            </div>
        ))}
    </>
  )
}

export default RadioField
