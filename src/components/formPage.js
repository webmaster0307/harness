import React from "react"
import styled from 'styled-components'

import FormPageNav from "../components/formPageNav"

const FormContentContainer = styled.div`
  margin-bottom: 4rem;
`

const SubmitButton = styled.input`
  margin-bottom: 4rem;
`

const FormPage = ({pageIndex, visiblePage, totalPages, setVisiblePage, submitButtonText, children}) => {
  const isLastPage = pageIndex => totalPages === pageIndex + 1

  return (
    <div className="page" style={{display: pageIndex === visiblePage ? 'block' : 'block'}}>
      <FormContentContainer>
        {children}
      </FormContentContainer>
      <FormPageNav pageIndex={pageIndex} totalPages={totalPages} setVisiblePage={setVisiblePage} />
      {isLastPage(pageIndex) &&
        <SubmitButton type="submit" className="button-primary" value={submitButtonText} />
      }
    </div>
  )
}

export default FormPage
