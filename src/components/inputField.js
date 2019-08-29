import React from 'react'
import styled from 'styled-components'
import "./inputField.css"

const StyledInputField = styled.input`
    width:100%
    padding: 1.35rem
    border: 1px solid #aaa
    border-radius: 4px
`

const InputField = ({name, type, errors, placeholder, value, handleChange}) => {
  let classes = 'input'
  if (errors.length > 0) {
    classes += ' is-danger'
  }
  return (
    <div className="field">
      <div className="control">
        <StyledInputField
          type={type}
          className={classes}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      {errors.map(error => (
        <p key={errors.indexOf(error)} className="help is-danger">
          {error}
        </p>
      ))}
    </div>
  )
}

export default InputField