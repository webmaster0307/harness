import React from "react"
import { format } from "date-fns"
import styled from "styled-components"
import { projectManagerNameMappings } from "../components/entriesTable"

const StyledFilterList = styled.ul`
  list-style: none;
  margin: 0 0 1.5rem 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li + li {
    margin-left: 0.5rem;
    cursor: default;
    :hover, :active {
      background: transparent;
      color: ${props => props.theme.forestGreen};
    }
  }
  button {
    margin-left: 0.5rem;
    border: 0;
    border-radius: 3rem;
    background: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
  }
`

const FiltersPanelToggleListItem = styled.li`
  padding: 0;
  button {
    padding: 0.4rem 0.7rem;
  }
`

const ProjectFilterListItem = ({text, cancelClickHandler}) => (
  <li className="button button--small button--transparent">
    {text}
    <button onClick={cancelClickHandler}>x</button>
  </li>
)

const ProjectFiltersList = props => {
  const {
    toggleIsFiltersPanelVisible,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    projectManagerFilter,
    setProjectManagerFilter
  } = props

  return (
    <StyledFilterList>
      <FiltersPanelToggleListItem className="button button--small button--light-green">
        <button
          onClick={toggleIsFiltersPanelVisible}
        >
          Add Filter +
        </button>
      </FiltersPanelToggleListItem>
      {startDateFilter &&
        <ProjectFilterListItem
          text={`Start date: ${format(startDateFilter, 'M/D/YY')}`}
          cancelClickHandler={() => setStartDateFilter(null)}
        />
      }
      {endDateFilter &&
        <ProjectFilterListItem
          text={`End date: ${format(endDateFilter, 'M/D/YY')}`}
          cancelClickHandler={() => setEndDateFilter(null)}
        />
      }
      {projectManagerFilter &&
        <ProjectFilterListItem
          text={`Project Manager: ${projectManagerNameMappings[projectManagerFilter]}`}
          cancelClickHandler={() => setProjectManagerFilter('')}
        />      
      }
    </StyledFilterList>
  )
}

export default ProjectFiltersList
