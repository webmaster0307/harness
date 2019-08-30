import React from "react"
import "./inputField.css"

const InputField = ({name, type, errors, placeholder, value, handleChange}) => {
  let classes = 'input-field'
  if (errors.length > 0) {
    classes += ' is-danger'
  }
  return (
    <div className="field">
      <div className="control">
        <input
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