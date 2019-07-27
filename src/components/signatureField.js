import React from 'react'
import styled from 'styled-components'
import SignatureCanvas from 'react-signature-canvas'

const SignatureFieldContainer = styled.div`
  .signature-canvas {
    background: ${props => props.theme.white};
    border: 1px solid #bebebe;
    border-radius: ${props => props.theme.borderRadius}
  }
`

const SignatureField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired } = field
  const htmlId = `input_${formId}_${id}`;

  return (
    <SignatureFieldContainer>
      <p>{label}</p>
      <SignatureCanvas
        penColor='black'
        canvasProps={{width: 407, height: 200, className: 'signature-canvas'}}
      />
    </SignatureFieldContainer>
  )
}

export default SignatureField
