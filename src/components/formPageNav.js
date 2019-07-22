import React from "react"

const FormPageNav = ({ pageIndex, totalPages, setVisiblePage }) => {
    const hasPrevPage = () => pageIndex > 0
    const hasNextPage = () => totalPages > pageIndex + 1
    const goToPreviousPage = () => setVisiblePage(pageIndex - 1)
    const goToNextPage = () => setVisiblePage(pageIndex + 1)

    return (
        <>
            {hasPrevPage() && <button onClick={goToPreviousPage}>Previous</button>}
            {hasNextPage() && <button onClick={goToNextPage}>Next</button>}
        </>
    )
}

export default FormPageNav
