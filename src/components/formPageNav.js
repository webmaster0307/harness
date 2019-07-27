import React from "react"
import styled from "styled-components"

const FormPageNavContainer = styled.div`
  margin-bottom: 4rem;
`

// const NavButton = styled.button`
//     width: 100%;
//     padding: 0.6rem;
//     border: 1px solid #bebebe;
//     border-radius: ${props => props.theme.borderRadius};
//     text-align: center;
//     text-transform: uppercase;
//     font-size: 1rem;

//     &:hover, &:active {
//         cursor: pointer;
//     }
// `

// const NextButton = styled(NavButton)`
//     color: ${props => props.theme.white};
//     background: ${props => props.theme.lightGreen};

//     &:hover, &:active {
//         background: ${props => props.theme.lightGreenDarkened};
//     }
// `

const PreviousButton = styled.button`
    margin-top: 1rem;
    /* color: ${props => props.theme.mediumGray};
    background: ${props => props.theme.lightGray};

    &:hover, &:active {
        background: ${props => props.theme.lightGrayDarkened};
    } */
`

const FormPageNav = ({ pageIndex, totalPages, setVisiblePage }) => {
    const hasPrevPage = () => pageIndex > 0
    const hasNextPage = () => totalPages > pageIndex + 1
    const goToPreviousPage = event => {
        event.preventDefault()
        setVisiblePage(pageIndex - 1)
    }
    const goToNextPage = event => {
        event.preventDefault()
        setVisiblePage(pageIndex + 1)
    }

    return (
        <FormPageNavContainer>
            {hasNextPage() && <button className="button-primary" onClick={goToNextPage}>Next</button>}
            {hasPrevPage() && <PreviousButton onClick={goToPreviousPage}>Previous</PreviousButton>}
        </FormPageNavContainer>
    )
}

export default FormPageNav
