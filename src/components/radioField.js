import React from 'react'
import styled from 'styled-components'

const RadioButtonsContainer = styled.div`
  display: flex;
`

const RadioButtonContainer = styled.div`
  flex: 1 1 50%;
  background: ${props => props.theme.lightGray};
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
  text-transform: uppercase;
  background: ${props => props.checked ? props.theme.lightGray : props.theme.white};
`

const RadioButtonLabel = styled.label`
  margin: 0;
  padding: 2rem;
`

const RadioField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired, choices } = field

  const shouldButtonBeChecked = (index, value) => {
    // If this is the first radio button and no value has been saved yet.
    if (index === 0 && !inputs[id]) {
      return true;
    }

    return inputs[id] === value
  }

  return (
    <fieldset>
        <legend>{label}</legend>
        <RadioButtonsContainer>
          {choices.map(({text, value}, index) => (
              <RadioButtonContainer key={value} checked={shouldButtonBeChecked(index, value)}>
                  <input
                      type="radio"
                      id={`choice_${formId}_${id}_${index}`}
                      className="screen-reader"
                      name={`input_${id}`}
                      value={value}
                      onChange={event => handleInputChange(id, event)}
                      required={isRequired}
                      checked={shouldButtonBeChecked(index, value) ? 'checked' : ''}
                  />
                  <RadioButtonLabel htmlFor={`choice_${formId}_${id}_${index}`}>{text}</RadioButtonLabel>
              </RadioButtonContainer>
          ))}
        </RadioButtonsContainer>
    </fieldset>
  )
}

export default RadioField
