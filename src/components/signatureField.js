import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import SignatureCanvas from 'react-signature-canvas'
import { debounce } from 'lodash'

const SignatureFieldContainer = styled.div`
  .signature-canvas {
    background: ${props => props.theme.white};
    border: 1px solid #bebebe;
    border-radius: ${props => props.theme.borderRadius};
  }
`

const SignatureField = ({ formId, field, inputs, handleInputChange }) => {
  const { id, label, isRequired } = field
  const canvasEl = useRef(null);
  const canvasParentEl = useRef(null);
  const htmlId = `input_${formId}_${id}`;

  // Set canvas width to match its parent's width.
  const handleResize = () => {
    const parentWidth = canvasParentEl.current.offsetWidth
    canvasEl.current.getCanvas().setAttribute("width", parentWidth)
  }

  useEffect(() => {
    // Set canvas width once on initial render.
    handleResize()

    window.addEventListener('resize', debounce(handleResize, 200));
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return (
    <SignatureFieldContainer ref={canvasParentEl}>
      <p>{label}</p>
      <SignatureCanvas
        ref={canvasEl}
        penColor='black'
        canvasProps={{height: 200, className: 'signature-canvas'}}
      />
    </SignatureFieldContainer>
  )
}

export default SignatureField
