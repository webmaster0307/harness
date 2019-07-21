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
    path: '/workplace-inspection',
    component: formPage,
    context: {
      id: "R3Jhdml0eUZvcm1zRm9ybTo2NQ==" // Form #65, ESFox
    }
  })

  createPage({
    path: '/form-2',
    component: formPage,
    context: {
      id: "Z3Jhdml0eWZvcm1zZm9ybToy" // Form #2
    }
  })
}
