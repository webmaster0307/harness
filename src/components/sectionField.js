import React from 'react'

// const StyledTextInput = styled.input`
    
// `

const SectionField = ({ formId, field  }) => {
    const { label, description } = field

    return (
        <>
        <h2>{label}</h2>
        {description ? <p>{description}</p> : null}
        </>
    )
}

export default SectionField
