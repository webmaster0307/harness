import React from 'react'
import styled from 'styled-components'

const StyledFieldset = styled.fieldset`
  display: contents;
`

const StyledLegend = styled.legend`
  margin-bottom: 1rem;
`

const RadioButtonsContainer = styled.div`
  display: flex;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  border: 1px solid #bebebe;
`

const RadioButtonContainer = styled.div`
  flex: 1 1 50%;
  background: ${props => props.theme.lightGray};
  text-align: center;
  text-transform: uppercase;
  background: ${props => props.checked ? props.theme.lightGray : props.theme.white};
  border-left: ${props => props.index > 0 ? '1px solid #bebebe' : 0};
`

const RadioButtonLabel = styled.label`
  margin: 0;
  padding: 1rem 2rem;
  cursor: pointer;
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
    <StyledFieldset>
        <StyledLegend>{label}</StyledLegend>
        <RadioButtonsContainer>
          {choices.map(({text, value}, index) => (
              <RadioButtonContainer key={value} index={index} checked={shouldButtonBeChecked(index, value)}>
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
    </StyledFieldset>
  )
}

export default RadioField
