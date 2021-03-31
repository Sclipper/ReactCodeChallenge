import * as React from "react"

import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core"
import Link from "next/link"

const useStyles = makeStyles(() => ({
  paper: {
    width: "41%",
    margin: "1rem",
  },
}))

const SearchResults = ({ results }) => {
  const classes = useStyles()
  console.log("results", results)
  if (!results.length) {
    return null
  }
  return (
    <Paper elevation={3} className={classes.paper}>
      <List
        style={{ paddingTop: 0, paddingBottom: 0 }}
        component="nav"
        aria-label="main mailbox folders"
      >
        {results?.map((result) => (
          <Link
            href={`/company/${result.local_organization_id.id}`}
            key={result.local_organization_id.id}
          >
            <ListItem button>
              <ListItemText
                primary={result.company_name}
                secondary={result.local_organization_id.id}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  )
}

export default SearchResults
