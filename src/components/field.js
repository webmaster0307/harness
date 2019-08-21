import React from "react"

import DateField from "./dateField"
import MultiSelectField from "./multiSelectField"
import RadioField from "./radioField"
import SectionField from "./sectionField"
import SelectField from "./selectField"
import SignatureField from "./signatureField"
import TextField from "./textField"
import TextAreaField from "./textAreaField"

const Field = ({ field, formId, inputs, handleInputChange, setInputValue }) => {
    const isReadOnly = field => field.cssClass.split(' ').includes('readonly')
    const getStringValue = id => {
        const matchingInputs = inputs.filter(input => input.id === id)
        return matchingInputs.length ? matchingInputs[0].value : ''
    }

    switch (field.type) {
        case 'date':
            return (
                <DateField
                    key={field.id}
                    formId={formId}
                    field={field}
                    value={getStringValue(field.id)}
                    setInputValue={setInputValue}
                />
            )
        case 'radio':
            return (
                <RadioField
                    key={field.id}
                    formId={formId}
                    field={field}
                    value={getStringValue(field.id)}
                    handleInputChange={handleInputChange}
                />
            )
        case 'section':
            return (
                <SectionField
                    key={field.id}
                    formId={formId}
                    field={field}
                />
            )
        case 'select':
            return (
                <SelectField
                    key={field.id}
                    formId={formId}
                    field={field}
                    value={getStringValue(field.id)}
                    handleInputChange={handleInputChange}
                    isReadOnly={isReadOnly}
                />
            )
        case 'text':
            return (
                <TextField
                key={field.id}
                formId={formId}
                field={field}
                value={getStringValue(field.id)}
                handleInputChange={handleInputChange}
                isReadOnly={isReadOnly}
                />
            )
        case 'textarea':
            return (
                <TextAreaField
                    key={field.id}
                    formId={formId}
                    field={field}
                    value={getStringValue(field.id)}
                    handleInputChange={handleInputChange}
                />
            )
        case 'multiselect':
            return (
                <MultiSelectField
                    key={field.id}
                    field={field}
                    value={getStringValue(field.id)}
                    setInputValue={setInputValue}
                />
            )
        case 'signature':
            return (
                <SignatureField
                    key={field.id}
                    field={field}
                    setInputValue={setInputValue}
                />
            )
        default:
            return (
                <p key={Math.random()}>{field.type}</p>
            )
    }
}

export default Field
