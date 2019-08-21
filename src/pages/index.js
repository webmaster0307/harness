import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import isAfter from "date-fns/is_after"
import isBefore from "date-fns/is_before"
import Layout from "../components/layout"
import SEO from "../components/seo"
import EntriesTable from "../components/entriesTable"
import GearIcon from "../components/gearIcon"
import ProjectFiltersPanel from "../components/projectFiltersPanel"
import ProjectFiltersList from "../components/projectFiltersList"

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  form {
    width: 64%;
    input[type="text"] {
      border: none;
      padding: 0.5rem;
      background: transparent;
      &:focus {
        background: ${props => props.theme.white};
      }
    }
  }
  .gear-container {
    width: 1.5rem;
    svg {
      vertical-align: middle;
    }
  }
`

const IndexPage = props => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false)
  const [startDateFilter, setStartDateFilter] = useState(null)
  const [endDateFilter, setEndDateFilter] = useState(null)
  const [projectManagerFilter, setProjectManagerFilter] = useState('')

  const toggleIsFiltersPanelVisible = () => setIsFiltersPanelVisible(!isFiltersPanelVisible)

  const getFieldById = (entryNode, id) => {
    if (!entryNode.fields || !entryNode.fields.edges) return null
    const matches = entryNode.fields.edges.filter(field => field.node.id === id)
    return matches.length ? matches[0] : null
  }

  const getDateField = entryNode => getFieldById(entryNode, 8)
  const getProjectLocationField = entryNode => getFieldById(entryNode, 3)
  const getProjectManagerField = entryNode => getFieldById(entryNode, 4)

  const containsSearchQuery = entry => {
    const locationField = getProjectLocationField(entry.node)
    const location = locationField ? locationField.fieldValue.value : ''
    return location.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const isAfterStartDate = entry => {
    if (!startDateFilter) return true
    const dateField = getDateField(entry.node)
    if (!dateField) return true
    return isAfter(new Date(dateField.fieldValue.value), startDateFilter)
  }

  const isBeforeEndDate = entry => {
    if (!endDateFilter) return true
    const dateField = getDateField(entry.node)
    if (!dateField) return true
    return isBefore(new Date(dateField.fieldValue.value), endDateFilter)
  }

  const hasProjectManager = entry => {
    if (!projectManagerFilter) return true
    const projectManagerField = getProjectManagerField(entry.node)
    const projectManagerId = projectManagerField ? projectManagerField.fieldValue.value : ''
    return projectManagerId === projectManagerFilter
  }

  const sortDatesDescending = (entry1, entry2) => {
    const entry1DateField = getDateField(entry1.node)
    const entry2DateField = getDateField(entry2.node)
    if ( !entry1DateField
      || !entry2DateField
      || !entry1DateField.fieldValue.value
      || !entry2DateField.fieldValue.value
    ) {
      return 1
    }

    return isAfter(
      new Date(entry1DateField.fieldValue.value),
      new Date(entry2DateField.fieldValue.value),
    ) ? -1 : 1
  }

  const getEntriesToRender = () => {
    const remoteEntries = props.data.wpgraphql.gravityFormsEntries.edges
      && props.data.wpgraphql.gravityFormsEntries.edges.length
      ? props.data.wpgraphql.gravityFormsEntries.edges
      : []

    let localInspections = []
    if (typeof window === 'object') {
      localInspections = JSON.parse(localStorage.getItem('localInspections')) || []
    }

    const entries = remoteEntries.concat(localInspections)

    if (!entries) return []
    return entries
			.filter(containsSearchQuery)
			.filter(isAfterStartDate)
      .filter(isBeforeEndDate)
      .filter(hasProjectManager)
      .sort(sortDatesDescending);
  }

  const entries = getEntriesToRender();

  // {
  //   node: {
  //     entryId: 123
  //     fields: {
  //       edges: [
  //         {
  //           node: {

  //           },
  //           fieldValue: {

  //           }
  //         },
  //       ]
  //     }
  //   }
  // }

  return (
    <Layout>
      <SEO title="Workplace Inspection Entries" />
      <TopBar>
        <h1>Inspections</h1>
        <div className="button-container">
          <Link
            to={`/new-inspection`}
            className="button button--small button--green"
          >
            Add New
          </Link>
        </div>
        <form method="post" onSubmit={e => e.preventDefault()}>
          <label htmlFor={`project-search`} className="screen-reader">Search for inspections</label>
          <input
            type="text"
            id={`project-search`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`🔍`}
            />
        </form>
        <div className="gear-container">
          <GearIcon />
        </div>
      </TopBar>
      <ProjectFiltersList
        toggleIsFiltersPanelVisible={toggleIsFiltersPanelVisible}
        startDateFilter={startDateFilter}
        setStartDateFilter={setStartDateFilter}
        endDateFilter={endDateFilter}
        setEndDateFilter={setEndDateFilter}
        projectManagerFilter={projectManagerFilter}
        setProjectManagerFilter={setProjectManagerFilter}
      />
      {entries.length ?
        <EntriesTable entries={entries} getFieldById={getFieldById} />
        :
        <p>No inspections found.</p>
      }
      {isFiltersPanelVisible &&
        <ProjectFiltersPanel
          setIsFiltersPanelVisible={setIsFiltersPanelVisible}
          startDateFilter={startDateFilter}
          setStartDateFilter={setStartDateFilter}
          endDateFilter={endDateFilter}
          setEndDateFilter={setEndDateFilter}
          projectManagerFilter={projectManagerFilter}
          setProjectManagerFilter={setProjectManagerFilter}
        />
      }
    </Layout>
  )
}

export default IndexPage

export const GET_ENTRIES = graphql`
  query GET_ENTRIES {
    wpgraphql {
      gravityFormsEntries(first: 50, after: null, where: {formIds: [4]}) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            id
            entryId
            fields(first: 500) {
              edges {
                node {
                  ... on WPGraphQL_DateField {
                    id
                  }
                  ... on WPGraphQL_SelectField {
                    id
                    choices {
                      text
                      value
                    }
                  }
                  ... on WPGraphQL_TextField {
                    type
                    id
                    label
                    cssClass
                    isRequired
                  }
                }
                fieldValue {
                  ... on WPGraphQL_StringFieldValue {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// Query that accepts params –
// export const GET_ENTRIES = graphql`
//   query GET_ENTRIES($first: 50, $after: null, $where: []) {
//     wpgraphql {
//       gravityFormsEntries(first: $first, after: $after, where: $where) {
//         pageInfo {
//           startCursor
//           endCursor
//           hasPreviousPage
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             id
//             entryId
//           }
//         }
//       }
//     }
//   }
// `