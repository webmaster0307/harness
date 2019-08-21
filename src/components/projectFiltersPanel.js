import React from "react"
import styled from "styled-components"
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${props => props.theme.white};
  box-shadow: -5px 0px 10px -9px rgba(0,0,0,1);
  padding: 2rem;
  min-width: 20rem;
  max-width: 85%;
  .DayPickerInput {
    width: 100%;
    input {
      padding: 1rem;
    }
  }
  .DayPickerInput + .DayPickerInput {
    margin-top: 0.5rem;
  }
  select {
    padding: 1rem;
  }
`

const ProjectFiltersPanel = props => {
  const {
    setIsFiltersPanelVisible,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    projectManagerFilter,
    setProjectManagerFilter,
  } = props

  const clearAllFilters = e => {
    e.preventDefault()
    setStartDateFilter(null)
    setEndDateFilter(null)
    setProjectManagerFilter('')
    setIsFiltersPanelVisible(false)
  }
  
  const handleStartDateChange = selectedDate => setStartDateFilter(selectedDate)
  const handleEndDateChange = selectedDate => setEndDateFilter(selectedDate)
  
  const dateFormat = 'M/D/YYYY';

  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, { locale })
    return DateUtils.isDate(parsed) ? parsed : undefined
  }
  
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

  const startDateProps = startDateFilter ? { value: startDateFilter } : ''
  const endDateProps = endDateFilter ? { value: endDateFilter } : ''

  return (
    <Container>
      <form method="post" onSubmit={e => e.preventDefault()}>
        <h2>Edit Filters</h2>
        <button
          className="button button--small button--green"
          onClick={clearAllFilters}
        >
          Clear all filters
        </button>
        <h3>Date Range</h3>
        <DayPickerInput
          placeholder="Start date"
          formatDate={formatDate}
          format={dateFormat}
          parseDate={parseDate}
          onDayChange={handleStartDateChange}
          {...startDateProps}
        />
        <DayPickerInput
          placeholder="End date"
          formatDate={formatDate}
          format={dateFormat}
          parseDate={parseDate}
          onDayChange={handleEndDateChange}
          {...endDateProps}
        />
        <h3>Project Manager</h3>
        <select
          value={projectManagerFilter}
          onChange={e => setProjectManagerFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">John Smith</option>
          <option value="2">Hugh Jackman</option>
          <option value="3">Marie Antoinette</option>
          <option value="4">Beth Gibbons</option>
          <option value="5">Liam Howlett</option>
        </select>
      </form>
    </Container>
  )
}

export default ProjectFiltersPanel
