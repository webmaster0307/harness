import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LogInForm from "../components/logInForm"

const LogInPage = () => (
    <Layout>
        <SEO title="Log In" />
        <LogInForm />
    </Layout>
)

export default LogInPage