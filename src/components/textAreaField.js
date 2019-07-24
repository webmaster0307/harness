import React from 'react'

const TextAreaField = ({ formId, field, inputs, handleInputChange }) => {
    const { id, label, isRequired } = field
    const htmlId = `input_${formId}_${id}`;

    return (
        <>
            <label htmlFor={htmlId}>{label}</label>
            <textarea
                id={htmlId}
                name={`input_${id}`}
                value={inputs[`input_${id}`]}
                onChange={event => handleInputChange(id, event)}
                required={isRequired}
            />
        </>
    )
}

export default TextAreaField
