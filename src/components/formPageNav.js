import React from "react"
import styled from "styled-components"

const FormPageNavContainer = styled.div`
  margin-bottom: 4rem;
`

const PreviousButton = styled.button`
    margin-top: 1rem;
`

const FormPageNav = ({ visiblePage, setVisiblePage, totalPages }) => {
    const hasPrevPage = () => visiblePage > 0
    const hasNextPage = () => totalPages > visiblePage + 1

    const goToPreviousPage = event => {
        event.preventDefault()
        setVisiblePage(visiblePage - 1)
        window.scroll(0,0)
    }
    const goToNextPage = event => {
        event.preventDefault()
        setVisiblePage(visiblePage + 1)
        window.scroll(0,0)
    }

    return (
        <FormPageNavContainer>
            {hasNextPage() && <button className="button button--green" onClick={goToNextPage}>Next</button>}
            {hasPrevPage() && <PreviousButton className="button" onClick={goToPreviousPage}>Previous</PreviousButton>}
        </FormPageNavContainer>
    )
}

export default FormPageNav
