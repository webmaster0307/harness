import React from "react"
import { Link, navigate } from "gatsby"
import { format, addHours, subHours } from 'date-fns'

import Layout from "../components/layout"
import SEO from "../components/seo"

const Entry = props => {
  const getFieldEdgesToRender = fieldEdges => {
    const fieldTypesToRender = ['date', 'multiselect', 'radio', 'select', 'signature', 'text', 'textarea' ]
    return fieldEdges.filter(fieldEdge => fieldTypesToRender.includes(fieldEdge.node.type))
  }

  const getFieldValue = (field, fieldValue) => {
    switch (field.type) {
      case 'date':
        // @TODO: Get adjusted date based on WP site timezone
        return format(addHours(new Date(fieldValue.value), 4), 'M/D/YYYY')
      case 'multiselect':
          const userIds = fieldValue.value.split(',')
          const choices = field.choices.filter(choice => userIds.includes(choice.value))
          const names = choices.map(choice => choice.text)
          return names.join(', ')
      case 'text':
      case 'textarea':
        return fieldValue.value
      case 'radio':
      case 'select':
        const choice = field.choices.filter(choice => choice.value === fieldValue.value)
        return choice.length ? choice[0].text : ''
      case 'signature':
        return '<signature.png>'
      default:
        return `<field.type value>`
    }
  }

  if (props.location.state && props.location.state.createdEntry) {
    const { createdEntry } = props.location.state
    const { dateCreated, form, fields } = createdEntry
    const fieldEdgesToRender = getFieldEdgesToRender(fields.edges)

    return (
      <Layout>
        <SEO title={`Form Entry: ${form.node.title}`} />
        <h1>Workplace Inspection</h1>
        <p>{`Entry ID: ${createdEntry.entryId}`}</p>
        {/* @TODO: Get adjusted date based on WP site timezone */}
        <p>{`Date Created: ${format(subHours(new Date(dateCreated), 4), 'M/D/YYYY, h:mm a')}`}</p>
        <br />
        <br />
        <h2>Field Values</h2>
        {fieldEdgesToRender.map(({node: field, fieldValue}) => {
          return (fieldValue && fieldValue.value) || field.type === 'signature' ? (
            <div key={field.id} style={{borderBottom: '1px solid #ddd', paddingBottom: '2rem', marginBottom: '2rem'}}>
              <p>{field.label}</p>
              <code style={{
                background: 'rgba(221, 221, 221, 1)',
                padding: '0.2rem 0.4rem 0.3rem',
                borderRadius: '4px'
              }}>{getFieldValue(field, fieldValue)}</code>
            </div>
          ) : null
        })}
        <br />
        <br />
        <br />
        <br />
        <div style={{textAlign:'center'}} >
          <Link to={`/`} className="button button--green">Submit another entry</Link>
        </div>
      </Layout>
    )
  }

  if ('undefined' !== typeof window) navigate(`/`)
  return null

  // TODO: Fetch the entry fresh and display it, if it's not
  // in the state that was passed to this route.
  // location.pathname // /entry/999
  // props.pageContext.matchPath // /entry/*
  // const pathPrefix = props.pageContext.matchPath.slice(0, -1); // → /entry/
  // const entryId = location.pathname.replace(pathPrefix, '');
}

export default Entry
