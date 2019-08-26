import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { getUuid } from "../services/utilities"
import FormPage from "./formPage"

const CREATE_ENTRY = gql`
  mutation createGravityFormsEntry(
    $clientMutationId: String!
    $formId: Int!
    $allTextValues: [EntryTextValueInput]
  ) {
    createGravityFormsEntry(
      input: {
        clientMutationId: $clientMutationId
        formId: $formId
        allTextValues: $allTextValues
      }
    ) {
      clientMutationId
      entry {
        entryId
        dateCreated
        form {
          node {
            title
          }
        }
        fields(first: 500) {
          edges {
            node {
              ... on DateField {
                type
                id
                label
                dateFormat
              }
              ... on MultiSelectField {
                type
                id
                label
                description
                choices {
                  text
                  value
                }
              }
              ... on PageField {
                type
                id
                label
              }
              ... on RadioField {
                type
                id
                label
                isRequired
                choices {
                  text
                  value
                }
              }
              ... on SectionField {
                type
                id
                label
                description
              }
              ... on SelectField {
                type
                id
                label
                cssClass
                isRequired
                choices {
                  text
                  value
                }
              }
              ... on SignatureField {
                type
                id
                label
              }
              ... on TextAreaField {
                type
                id
                label
                cssClass
                isRequired
              }
              ... on TextField {
                type
                id
                label
                cssClass
                isRequired
              }
            }
            fieldValue {
              ... on StringFieldValue {
                value
              }
              ... on AddressFieldValues {
                street
                lineTwo
                city
                state
                zip
                country
              }
            }
          }
        }
      }
    }
  }
`

const getProjectLocationValue = projectValue => {
  switch (projectValue) {
    case "1":
      return "10325 Willodell Rd, Port Robinson, ON L0S 1K0"
    case "2":
      return "1812 Sir Isaac Brock Way, St. Catharines, ON L2S 3A1"
    case "3":
      return "300 Parkside Ave, Buffalo, NY 14214"
    case "4":
      return "237 Barton St E, Hamilton, ON L8L 2X2"
    case "5":
      return "102 E Main St, Welland, ON L3B 3W6, Canada"
    default:
      return ""
  }
}

const Form = ({ form }) => {
  const [createGravityFormsEntry, { loading, error, data }] = useMutation(
    CREATE_ENTRY
  )
  const [inputs, setInputs] = useState([])
  const [visiblePage, setVisiblePage] = useState(0)
  const {
    formId,
    button: { text: submitButtonText },
  } = form
  const fields = form.fields.nodes
  const [fakeLoading, setfakeLoading] = useState(false)

  const getPageGroups = fields => {
    const pageGroups = []
    let index = 0

    fields.forEach(field => {
      if ("page" !== field.type) {
        if (!pageGroups[index]) pageGroups[index] = []
        pageGroups[index].push(field)
      } else {
        index++
      }
    })

    return pageGroups
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setInputValue(Number(name), value)
  }

  const setInputValue = (id, value) => {
    const otherInputs = inputs.filter(input => input.id !== id)

    let newInputValues = [...otherInputs, { id, value }]

    // Fake auto-setting fields for ESFox
    if (Number(id) === 1) {
      // Project Numher
      newInputValues = newInputValues.filter(input => input.id !== 2)
      newInputValues.push({ id: 2, value: String(value * 2683) })

      // Project Location
      newInputValues = newInputValues.filter(input => input.id !== 3)
      newInputValues.push({ id: 3, value: getProjectLocationValue(value) })

      // Project Manager
      newInputValues = newInputValues.filter(input => input.id !== 4)
      newInputValues.push({ id: 4, value })
    }

    setInputs(newInputValues)
  }

  const pageGroups = getPageGroups(fields)
  const totalPages = pageGroups.length

  if (error)
    return (
      <p>Sorry, an error has occurred. Please reload the page and try again.</p>
    )

  if (data) {
    const { entry: createdEntry } = data.createGravityFormsEntry
    return (
      <>
        <h2>✓ Saved</h2>
        <p>Form entry has been saved to Harness.</p>
        <br />
        <br />
        <br />
        <Link
          to={`/entry/${createdEntry.entryId}`}
          state={{ createdEntry }}
          className="button button--green"
        >
          Review entry →
        </Link>
      </>
    )
  }

  return (
    <form
      id={`gravity-form-${formId}`}
      className="gravity-form"
      method="post"
      encType="multipart/form-data"
      onSubmit={e => {
        e.preventDefault()
        setfakeLoading(true)

        let localInspections = []
        if (typeof window === "object") {
          localInspections =
            JSON.parse(localStorage.getItem("localInspections")) || []
        }

        const getInputFieldValue = id => {
          const matches = inputs.filter(input => input.id === id)
          return matches.length ? matches[0].value : null
        }

        const localInspection = getLocalInspectionToStore({
          entryId: new Date().valueOf(),
          project: getInputFieldValue(1) || 4,
          projectNumber: getInputFieldValue(2) || 8049,
          location:
            getInputFieldValue(3) || "300 Parkside Ave, Buffalo, NY 14214",
          inspectionDate: getInputFieldValue(8) || "2019-08-21",
          projectManager: getInputFieldValue(4) || 2,
        })

        localInspections.push(localInspection)
        localStorage.setItem(
          "localInspections",
          JSON.stringify(localInspections)
        )

        setTimeout(() => {
          setfakeLoading(false)
          navigate("/")
        }, 1200)

        // console.log(inputs)
        // createGravityFormsEntry({ variables: {
        //   clientMutationId: getUuid(),
        //   formId,
        //   allTextValues: inputs,
        // } });
      }}
    >
      <FormPage
        inputs={inputs}
        pageGroup={pageGroups[visiblePage]}
        visiblePage={visiblePage}
        setVisiblePage={setVisiblePage}
        totalPages={totalPages}
        formId={formId}
        loading={fakeLoading}
        submitButtonText={submitButtonText}
        handleInputChange={handleInputChange}
        setInputValue={setInputValue}
      />
      {/* <button onClick={event => {
        event.preventDefault()
        setVisiblePage(totalPages - 1)
      }}>Go to last page</button> */}
      {/* <button onClick={event => {
        event.preventDefault()
        console.log(inputs)
      }}>Console log input state</button> */}
    </form>
  )
}

export default Form

const getLocalInspectionToStore = args => {
  const {
    entryId,
    project,
    projectNumber,
    location,
    inspectionDate,
    projectManager,
  } = args

  return {
    node: {
      id: "R3Jhdml0eUZvcm1zRW50cnk6MjU=",
      entryId: entryId,
      fields: {
        edges: [
          {
            node: {
              __typename: "WPGraphQL_SelectField",
              id: 1,
              choices: [
                {
                  text: "Choose a project",
                  value: "",
                },
                {
                  text: "Project 1",
                  value: "1",
                },
                {
                  text: "Project 2",
                  value: "2",
                },
                {
                  text: "Project 3",
                  value: "3",
                },
                {
                  text: "Project 4",
                  value: "4",
                },
                {
                  text: "Project 5",
                  value: "5",
                },
              ],
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: project,
            },
          },
          {
            node: {
              __typename: "WPGraphQL_TextField",
              type: "text",
              id: 2,
              label: "Project Number",
              cssClass: "readonly",
              isRequired: false,
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: projectNumber,
            },
          },
          {
            node: {
              __typename: "WPGraphQL_TextField",
              type: "text",
              id: 3,
              label: "Project Location",
              cssClass: "readonly",
              isRequired: false,
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: location,
            },
          },
          {
            node: {
              __typename: "WPGraphQL_SelectField",
              id: 4,
              choices: [
                {
                  text: "",
                  value: "",
                },
                {
                  text: "John Smith",
                  value: "1",
                },
                {
                  text: "Marie Antoinette",
                  value: "3",
                },
                {
                  text: "Hugh Jackman",
                  value: "2",
                },
                {
                  text: "Beth Gibbons",
                  value: "4",
                },
                {
                  text: "Liam Howlett",
                  value: "5",
                },
              ],
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: projectManager,
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "Monthly",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_DateField",
              id: 8,
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: inspectionDate,
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_MultiSelectField",
            },
            fieldValue: {
              __typename: "WPGraphQL_MultiSelectFieldValues",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "yes",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "yes",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "yes",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "n-a",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_SectionField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_RadioField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_PageField",
            },
            fieldValue: null,
          },
          {
            node: {
              __typename: "WPGraphQL_TextAreaField",
            },
            fieldValue: {
              __typename: "WPGraphQL_StringFieldValue",
              value: "asdfasdfasdf!",
            },
          },
          {
            node: {
              __typename: "WPGraphQL_SignatureField",
            },
            fieldValue: {
              __typename: "WPGraphQL_SignatureFieldValue",
            },
          },
        ],
      },
    },
  }
}
