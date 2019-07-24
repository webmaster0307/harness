import React from 'react'

const RadioField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired, choices } = field

  return (
    <>
        <p>{label}</p>
        {choices.map(({text, value}, index) => (
            <div key={value}>
                <input
                    type="radio"
                    id={`choice_${formId}_${id}_${index}`}
                    name={`input_${id}`}
                    value={value}
                    onChange={event => handleInputChange(id, event)}
                    required={isRequired}
                />
                <label htmlFor={`choice_${formId}_${id}_${index}`}>{text}</label>
            </div>
        ))}
    </>
  )
}

export default RadioField
