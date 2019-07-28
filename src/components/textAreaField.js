import React from 'react'

const TextAreaField = ({ formId, field, value, handleInputChange }) => {
    const { id, label, isRequired } = field
    const htmlId = `input_${formId}_${id}`;

    return (
        <>
            <label htmlFor={htmlId}>{label}</label>
            <textarea
                id={htmlId}
                name={id}
                value={value}
                onChange={handleInputChange}
                required={isRequired}
            />
        </>
    )
}

export default TextAreaField
