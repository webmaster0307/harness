import React from 'react'

const AddressField = props => {
  const { formId, field } = props
  const { id, label, isRequired, inputs } = field
  const htmlId = `input_${formId}_${id}`;

  return (
    <div>
      {inputs.map(input => {
        if (input.isHidden) return;
        return (
          <>
            <label htmlFor={htmlId}>{label}</label>
            <input
              type="text"
              id={htmlId}
              name={id}
              required={isRequired}
            />
          </>
        );
      })}
    </div>
  )
}

export default AddressField
