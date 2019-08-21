import React from "react"
import styled from 'styled-components'
import Field from "./field"

import FormPageNav from "./formPageNav"
import LoadingSpinner from "./loadingSpinner"

const FormContentContainer = styled.div`
  margin-bottom: 4rem;
  .field-container + .field-container {
    padding-top: 3rem;
  }
`

const SubmitButton = styled.button`
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
        loading,
        submitButtonText,
        handleInputChange,
        setInputValue
    } = props

    const isLastPage = () => totalPages === visiblePage + 1

    return (
        <>
          <FormContentContainer>
            {pageGroup.map(field => (
              <div key={field.id} className="field-container">
                <Field
                  field={field}
                  formId={formId}
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  setInputValue={setInputValue}
                />
              </div>
            ))}
          </FormContentContainer>
          <FormPageNav visiblePage={visiblePage} setVisiblePage={setVisiblePage} totalPages={totalPages} />
          {isLastPage() &&
            <SubmitButton type="submit" className={`button button--green${loading ? ' button--loading' : ''}`}>
              {loading ? <LoadingSpinner /> : submitButtonText}
            </SubmitButton>
          }
        </>
      )
}

export default FormPage
