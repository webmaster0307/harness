import React from "react"
import styled from 'styled-components'
import Field from "./field"

import FormPageNav from "./formPageNav"

const FormContentContainer = styled.div`
  margin-bottom: 4rem;
`

const FieldContainer = styled.div`
    width: 100%;
    padding: 1.5rem 0;
`

const SubmitButton = styled.input`
  margin-bottom: 4rem;
`

const FormPage = props => {
    const {
        inputs,
        pageGroup,
        visiblePage,
        setVisiblePage,
        totalPages,
        formId,
        submitButtonText,
        handleInputChange,
        setInputValue
    } = props

    const isLastPage = () => totalPages === visiblePage + 1

    return (
        <>
          <FormContentContainer>
            {pageGroup.map(field => (
                <FieldContainer key={field.id}>
                    <Field
                        field={field}
                        formId={formId}
                        inputs={inputs}
                        handleInputChange={handleInputChange}
                        setInputValue={setInputValue}
                    />
                </FieldContainer>
            ))}
          </FormContentContainer>
          <FormPageNav visiblePage={visiblePage} setVisiblePage={setVisiblePage} totalPages={totalPages} />
          {isLastPage() &&
            <SubmitButton type="submit" className="button-primary" value={submitButtonText} />
          }
        </>
      )
}

export default FormPage
