import React from 'react'
import styled from 'styled-components'
import SignatureCanvas from 'react-signature-canvas'

const SignatureFieldContainer = styled.div`
  border: 4px solid #ccc;
`

const SignatureField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired } = field
  const htmlId = `input_${formId}_${id}`;

  return (
    <SignatureFieldContainer>
      <SignatureCanvas
        penColor='black'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
      />
    </SignatureFieldContainer>
  )
}

export default SignatureField
