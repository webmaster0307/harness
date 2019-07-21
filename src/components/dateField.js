import React, { useState } from "react"
import { format } from "date-fns"
import DayPicker from "react-day-picker"
import "react-day-picker/lib/style.css"

const DateField = ({ formId, field, inputs, setInputValue }) => {
    const [day, setDay] = useState(undefined)
    const { id, dateFormat, label, isRequired, choices } = field
    const htmlId = `input_${formId}_${id}`

    const handleDayClick = dateObject => {
        setDay(dateObject)
        setInputValue(`input_${id}`, formatDate(dateObject))
        console.log(day)
    }

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
  
    return (
        // Documentation: http://react-day-picker.js.org/docs/getting-started
        <DayPicker onDayClick={handleDayClick} selectedDays={day} />
        //@TODO: required={isRequired}
    )
  }
  
  export default DateField
