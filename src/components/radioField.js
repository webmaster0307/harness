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

const RadioField = ({ formId, field, value, handleInputChange }) => {
  const { id, label, isRequired, choices } = field

  const shouldButtonBeChecked = (index, buttonValue) => {
    // If this is the first radio button and no value has been saved yet.
    if (index === 0 && !value) {
      return true;
    }

    return value === buttonValue
  }

  return (
    <StyledFieldset>
        <StyledLegend>{label}</StyledLegend>
        <RadioButtonsContainer>
          {choices.map(({text, value: buttonValue}, index) => (
              <RadioButtonContainer key={index} index={index} checked={shouldButtonBeChecked(index, buttonValue)}>
                  <input
                      type="radio"
                      id={`choice_${formId}_${id}_${index}`}
                      className="screen-reader"
                      name={id}
                      value={buttonValue}
                      onChange={handleInputChange}
                      required={isRequired}
                      checked={shouldButtonBeChecked(index, buttonValue) ? 'checked' : ''}
                  />
                  <RadioButtonLabel htmlFor={`choice_${formId}_${id}_${index}`}>{text}</RadioButtonLabel>
              </RadioButtonContainer>
          ))}
        </RadioButtonsContainer>
    </StyledFieldset>
  )
}

export default RadioField
