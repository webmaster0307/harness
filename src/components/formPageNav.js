import React from "react"
import styled from "styled-components"
import { warnOnceInDevelopment } from "apollo-utilities";

const FormPageNavContainer = styled.div`
  margin-bottom: 4rem;
`

const PreviousButton = styled.button`
    margin-top: 1rem;
`

const FormPageNav = ({ pageIndex, totalPages, setVisiblePage }) => {
    const hasPrevPage = () => pageIndex > 0
    const hasNextPage = () => totalPages > pageIndex + 1
    const goToPreviousPage = event => {
        event.preventDefault()
        setVisiblePage(pageIndex - 1)
        window.scroll(0,0)
    }
    const goToNextPage = event => {
        event.preventDefault()
        setVisiblePage(pageIndex + 1)
        window.scroll(0,0)
    }

    return (
        <FormPageNavContainer>
            {hasNextPage() && <button className="button-primary" onClick={goToNextPage}>Next</button>}
            {hasPrevPage() && <PreviousButton onClick={goToPreviousPage}>Previous</PreviousButton>}
        </FormPageNavContainer>
    )
}

export default FormPageNav
