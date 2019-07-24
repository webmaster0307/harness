import React from "react"

import DateField from "../components/dateField"
import MultiSelectField from "./multiSelectField"
import RadioField from "../components/radioField"
import SelectField from "../components/selectField"
import SignatureField from "../components/signatureField"
import TextField from "../components/textField"
import TextAreaField from "../components/textAreaField"

const Field = ({ field, formId, inputs, handleInputChange, setInputValue }) => {
    switch (field.type) {
        case 'date':
            return <DateField key={field.id} formId={formId} field={field} inputs={inputs} setInputValue={setInputValue} />
        case 'radio':
            return <RadioField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        case 'select':
            return <SelectField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        case 'text':
            return <TextField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        case 'textarea':
            return <TextAreaField key={field.id} formId={formId} field={field} inputs={inputs} handleInputChange={handleInputChange} />
        case 'multiselect':
            return <MultiSelectField key={field.id} field={field} setInputValue={setInputValue} />
        case 'signature':
            return <SignatureField key={field.id} field={field} setInputValue={setInputValue} />
    }

    return <p key={Math.random()}>{field.type}</p>
}

export default Field
