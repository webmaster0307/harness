import React from "react"
import styled from "styled-components"

const FormPageNavContainer = styled.div`
  margin-bottom: 4rem;
`

const PreviousButton = styled.button`
  margin-top: 1rem;
`

const PaginatedNav = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  padding: 0;
  margin: 2em 0 0;
  li {
    margin-right: 1em;
    line-height: 2em;
    cursor: pointer;
    :last-of-type {
      margin-right: 0;
    }
  }
`

const FirstLastNav = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0;
  margin: 2em 0 0;
`

const FormPageNav = ({ visiblePage, setVisiblePage, totalPages }) => {
  const hasPrevPage = () => visiblePage > 0
  const hasNextPage = () => totalPages > visiblePage + 1

  const goToPreviousPage = event => {
    event.preventDefault()
    setVisiblePage(visiblePage - 1)
    window.scroll(0, 0)
  }
  const goToNextPage = event => {
    event.preventDefault()
    setVisiblePage(visiblePage + 1)
    window.scroll(0, 0)
  }

  const pagesArray = []
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i)
  }
  const selectPage = value => {
    setVisiblePage(value)
    window.scroll(0, 0)
  }

  return (
    <FormPageNavContainer>
      {hasNextPage() && (
        <button className="button button--green" onClick={goToNextPage}>
          Next
        </button>
      )}
      {hasPrevPage() && (
        <PreviousButton className="button" onClick={goToPreviousPage}>
          Previous
        </PreviousButton>
      )}
      <PaginatedNav>
        {pagesArray.map((page, index) => {
          return (
            <li key={page} onClick={() => selectPage(index)}>
              {visiblePage === page ? <b>{page + 1}</b> : page + 1}
            </li>
          )
        })}
      </PaginatedNav>
      <FirstLastNav>
        {hasPrevPage() && (
          <li onClick={() => selectPage(0)}>← Go to first page</li>
        )}
        {hasNextPage() && (
          <li onClick={() => selectPage(totalPages - 1)}>Go to last page →</li>
        )}
      </FirstLastNav>
    </FormPageNavContainer>
  )
}

export default FormPageNav
