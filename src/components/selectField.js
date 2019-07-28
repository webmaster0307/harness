import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
    ${props => props.readOnly && `background-color: #ddd;`}
`

const SelectField = ({ formId, field, inputs, handleInputChange, isReadOnly }) => {
  const { id, label, isRequired, choices } = field
  const htmlId = `input_${formId}_${id}`

  return (
    <>
        <label htmlFor={htmlId}>{label}</label>
        <StyledSelect
            id={htmlId}
            name={`input_${id}`}
            value={inputs[id]}
            onChange={event => handleInputChange(id, event)}
            required={isRequired}
            readOnly={isReadOnly(field) ? 'readonly' : null}
        >
            {choices.map(({text, value}) => (
                <option key={value} value={value}>{text}</option>
            ))}
        </StyledSelect>
    </>
  )
}

export default SelectField
