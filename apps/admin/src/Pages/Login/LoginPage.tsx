import React, { CSSProperties } from "react"
import { Layout } from "antd"
import { Login } from "~/Component/Login/Login"

const ContentStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}

const Footer_note: CSSProperties = {
  marginTop: "24px",
  textAlign: "center"
}

export function LoginPage() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Content style={ContentStyle}>
        <h1>Campus Admin</h1>
        <Login page={true} />
        <p className="footer" style={Footer_note}>{`2011-${new Date().getFullYear()} Jenzabar, Inc.`}</p>
      </Layout.Content>
    </Layout>
  )
}
