/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const formTemplate = path.resolve(`./src/templates/form-template.js`)

  createPage({
    path: '/new-inspection',
    component: formTemplate,
    context: {
      id: "R3Jhdml0eUZvcm1zRm9ybTo0" // Form #4, ESFox Workplace Inspection
    }
  })
}

// const createWpPages = async (graphql, createPage) => {
//   const GET_PAGES = `
//     query GET_PAGES($first:Int $after:String) {
//       wpgraphql {
//         pages(
//             first: $first 
//             after:$after
//         ) {
//             pageInfo {
//                 hasNextPage
//                 endCursor
//             } 
//             nodes {
//                 uri
//             }
//         }
//       }
//     }
//   `

//   const allPages = []

//   /**
//    * Fetch pages method. This accepts variables to alter
//    * the query. The variable `first` controls how many items to
//    * request per fetch and the `after` controls where to start in
//    * the dataset.
//    *
//    * @param variables
//    * @returns {Promise<*>}
//    */
//   const fetchPages = async variables => {
//     return await graphql(GET_PAGES, variables).then(({ data }) => {
//       const {
//         wpgraphql: {
//           pages: {
//             nodes,
//             pageInfo: { hasNextPage, endCursor },
//           },
//         },
//       } = data

//       nodes &&
//         nodes.map(pages => {
//           allPages.push(pages)
//         })

//       if (hasNextPage) {
//         return fetchPages({ first: 10, after: endCursor })
//       }

//       // Once there are no more pages, return them
//       return allPages
//     })
//   }

//   return fetchPages({ first: 10, after: null }).then(allPages => {
//     allPages &&
//       allPages.map(page => {
//         console.log(`Creating page: ${page.uri}`)
//         createPage({
//           path: `/${page.uri}/`,
//           component: path.resolve(`src/templates/page.js`),
//           context: page,
//         })
//       })
//   })
// }

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return Promise.all([
//     createWpPages(graphql, createPage),
//   ])
// }
