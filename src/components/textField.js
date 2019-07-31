import React from 'react'
import styled from 'styled-components'

const StyledTextInput = styled.input`
    ${props => props.readOnly && `background-color: #ddd;`}
`

const TextField = ({ formId, field, value, handleInputChange, isReadOnly }) => {
    const { id, label, isRequired } = field
    const htmlId = `input_${formId}_${id}`;

    return (
        <>
            <label htmlFor={htmlId}>{label}</label>
            <StyledTextInput
                type="text"
                id={htmlId}
                name={id}
                value={value}
                onChange={handleInputChange}
                required={isRequired}
                readOnly={isReadOnly(field) ? 'readonly' : null}
            />
        </>
    )
}

export default TextField
