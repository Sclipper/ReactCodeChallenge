import * as React from "react"

import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  highlight: {
    border: "1px solid black",
    borderRadius: "0.25rem",
    marginRight: "2rem",
    marginBottom: "1rem",
    padding: "1rem",
  },
}))

const weightSort = (a, b) => {
  if (a.weight < b.weight) {
    return 1
  }
  if (a.weight > b.weight) {
    return -1
  }
  // a must be equal to b
  return 0
}
const positiveFirst = (a, b) => {
  if (a.classification === "positive" && b.classification !== "positive") {
    return 1
  }
  if (a.classification !== "positive" && b.classification === "positive") {
    return -1
  }
  // a must be equal to b
  return 0
}

const getColor = (classification) => {
  if (classification === "positive") {
    return "green"
  }
  if (classification === "negative") {
    return "red"
  }
  if (classification === "neutral") {
    return "lightblue"
  }
}

const handleData = (data) => {
  const keys = Object.keys(data)
  console.log("data", data)
  return keys
    .map((key) => data[key])
    .sort((a, b) => positiveFirst(a, b))
    .sort((a, b) => weightSort(a, b))
}

const CompanyHighlights = ({ data }) => {
  const classes = useStyles()

  if (!data) {
    return "Loading"
  }
  const highlights = handleData(data)
  return (
    <div style={{ paddingTop: "2rem", width: "50%" }}>
      {highlights.map((highlight) => (
        <div
          style={{ border: `2px solid ${getColor(highlight.classification)}` }}
          className={classes.highlight}
          key={highlight.title}
        >
          <Typography>
            <b>{highlight.title}</b>
          </Typography>
          <Typography>{highlight.description}</Typography>
        </div>
      ))}
    </div>
  )
}

export default CompanyHighlights
