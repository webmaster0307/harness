import React from "react"

import FormPageNav from "../components/formPageNav"

const FormPage = ({pageIndex, visiblePage, totalPages, setVisiblePage, submitButtonText, children}) => {
  const isLastPage = pageIndex => totalPages === pageIndex + 1

  return (
    <div className="page" style={{display: pageIndex === visiblePage ? 'block' : 'block'}}>
      {children}
      <FormPageNav pageIndex={pageIndex} totalPages={totalPages} setVisiblePage={setVisiblePage} />
      {isLastPage(pageIndex) &&
        <input type="submit" value={submitButtonText} />
      }
    </div>
  )
}

export default FormPage
