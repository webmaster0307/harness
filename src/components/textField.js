import React from 'react'

const TextField = ({ formId, field, inputs, handleInputChange }) => {
    const { id, label, isRequired } = field
    const htmlId = `input_${formId}_${id}`;

    return (
        <>
            <label htmlFor={htmlId}>{label}</label>
            <input
                type="text"
                id={htmlId}
                name={`input_${id}`}
                value={inputs[id]}
                onChange={event => handleInputChange(id, event)}
                required={isRequired}
            />
        </>
    )
}

export default TextField
