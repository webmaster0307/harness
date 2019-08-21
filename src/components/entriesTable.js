import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"
import { getProjectLocationValue } from "../components/form"

const StyedTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  thead {
    background-color: ${props => props.theme.mossGreen};
    text-align: left;
  }
  th, td {
    padding: 1.3rem 0.2rem;
  }
  th {
    font-weight: 400;
  }
  tr {
    &:nth-of-type(even) {
      background: ${props => props.theme.willowBrookGreen};
    }
  }
  td:last-of-type {
    text-align: right;
    font-size: 31px;
    span {
      margin-right: 1.5rem;
    }
  }
`

const StyledCheckboxLabel = styled.label`
  .checkbox {
    margin-left: 1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    border: 1px solid ${props => props.theme.seaGreen};
    border-radius: ${props => props.theme.borderRadius};
  }
  input:checked ~ .checkbox {
    background-color: ${props => props.theme.seaGreen};
  }
`

export const projectManagerNameMappings = {
  1: 'John Smith',
  2: 'Hugh Jackman',
  3: 'Marie Antoinette',
  4: 'Beth Gibbons',
  5: 'Liam Howlett',
}

const EntriesTable = ({entries, getFieldById}) => {
  const getProjectField = entryNode => getFieldById(entryNode, 1)
  const getProjectNumberField = entryNode => getFieldById(entryNode, 2)
  const getProjectLocationField = entryNode => getFieldById(entryNode, 3)
  const getInspectionDateField = entryNode => getFieldById(entryNode, 8)
  const getProjectManagerField = entryNode => getFieldById(entryNode, 4)
  const formatDate = dateString => new Date(`${dateString} 00:00:00`).toLocaleDateString('en-US')

  return (
    <StyedTable>
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Submitted By</th>
          <th>Project</th>
          <th>Number</th>
          <th>Project Manager</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => {
          const entryId = entry.node.entryId
          const projectField = getProjectField(entry.node)
          const projectId = projectField ? projectField.fieldValue.value : ''
          const projectNumberField = getProjectNumberField(entry.node)
          const projectNumber = projectNumberField ? projectNumberField.fieldValue.value : ''
          const inspectionDateField = getInspectionDateField(entry.node)
          const inspectionDate = inspectionDateField ? inspectionDateField.fieldValue.value : ''
          const locationField = getProjectLocationField(entry.node)
          const location = locationField ? locationField.fieldValue.value : ''
          const projectManagerField = getProjectManagerField(entry.node)
          const projectManagerId = projectManagerField ? projectManagerField.fieldValue.value : ''

          return (
            <tr key={entryId}>
              <td>
              <StyledCheckboxLabel>
                <input type="checkbox" className="screen-reader" />
                <span className="checkbox"></span>
              </StyledCheckboxLabel>
              </td>
              <td>{inspectionDate ? formatDate(inspectionDate) : ''}</td>
              <td>Tom Whitaker</td>
              <td>{location}</td>
              <td>{projectNumber}</td>
              <td>{projectManagerNameMappings[projectManagerId]}</td>
              <td><span>&#8250;</span></td>
            </tr>
          )
        })}
      </tbody>
    </StyedTable>
  )
}

export default EntriesTable
