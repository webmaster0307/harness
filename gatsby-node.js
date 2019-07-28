/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const formPage = path.resolve(`./src/templates/form-page.js`)

  createPage({
    path: '/',
    component: formPage,
    context: {
      id: "R3Jhdml0eUZvcm1zRm9ybTo0" // Form #4, ESFox Workplace Inspection
    }
  })
}
