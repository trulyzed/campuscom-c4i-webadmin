import React from "react"
import { Link } from "react-router-dom"

export function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/profile">Profile</Link>
    </div>
  )
}
