import React from "react"
import styled from 'styled-components'
import { format } from "date-fns"
import DayPicker from "react-day-picker"
import "react-day-picker/lib/style.css"

const DayPickerContainer = styled.div`
    text-align: center;
`

const DayPickerContents = styled.div`
    display: inline-block;
    > p {
        text-align: left;
    }
    .DayPicker {
        border: 1px solid #ddd;
        border-radius: ${props => props.theme.borderRadius};
        background: ${props => props.theme.white};
    }
    .DayPicker-Weekdays {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
`

// Datepicker documentation:
// http://react-day-picker.js.org/docs/getting-started
const DateField = props => {
    const { field: { id, label }, value, setInputValue } = props

    const handleDayClick = dateObject => {
        setInputValue(id, format(dateObject, 'YYYY-MM-DD'))
    }

    const dateObject = value ? new Date(`${value} 00:00:00`) : undefined

    return (
        <DayPickerContainer>
            <DayPickerContents>
                <p>{label}</p>
                <DayPicker
                    onDayClick={handleDayClick}
                    selectedDays={dateObject}
                    month={dateObject || new Date()}
                />
            </DayPickerContents>
        </DayPickerContainer>
    )
}

export default DateField


/*

@TODO: Implement these when we switch to having both the datepicker and text input displayed.
const formatDate = dateObject => {
    // Map Gravity Forms date formats to their date-fns equivalents.
    const dateFormatMap = {
        mdy: 'MM/DD/YYYY',
        dmy: 'DD/MM/YYYY',
        dmy_dash: 'DD-MM-YYYY',
        dmy_dot: 'DD.MM.YYYY',
        ymd_slash: 'YYYY/MM/DD',
        ymd_dash: 'YYYY-MM-DD',
        ymd_dot: 'YYYY.MM.DD',
    }

    if (dateFormatMap[dateFormat]) {
        return format(dateObject, dateFormatMap[dateFormat])
    }

    // Default, if not set.
    return format(dateObject, 'MM/DD/YYYY')
}

To use for the address text field label:
const htmlId = `input_${formId}_${id}`

@TODO: required={isRequired}

*/
