import * as React from "react"
import { useRouter } from "next/router"
import Management from "@/components/Management"
import CompanyBasics from "@/components/CompanyBasics"
import CompanyHighlights from "@/components/CompanyHighlights"

import { companyRelations, companyBasics, companyHighlights } from "@/requests"

import { ListItem, ListItemText, makeStyles, Paper } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "-8px",
    minHeight: "100vh",
    width: "50%",
    margin: "0 auto",
    borderRadius: "0.25rem",
  },
  score: {
    display: "flex",
    marginTop: 0,
    paddingRight: "2rem",
    alignItems: "center",
    height: "1rem",
  },
  title: {
    // textAlign: "center",
    marginTop: 0,
    padding: "2rem",
  },
}))

const getColor = (score) => {
  if (score <= 3) {
    return "red"
  }
  if (score <= 6) {
    return "orange"
  }
  if (score <= 10) {
    return "green"
  }
  return "gray"
}

export default function Company() {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()

  const [relations, setRelations] = React.useState(null)
  const [basics, setBasics] = React.useState(null)
  const [highlights, setHighlights] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
    }
  }, [id])
  React.useEffect(() => {
    if (id != null) {
      companyBasics({ id }).then((res) => {
        setBasics(res)
      })
    }
  }, [id])
  React.useEffect(() => {
    if (id != null) {
      companyHighlights({ id }).then((res) => {
        setHighlights(res)
      })
    }
  }, [id])

  return (
    <Paper elevation={3} className={classes.container}>
      <div
        style={{
          backgroundColor: getColor(basics?.score),
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListItem className={classes.title}>
          <ListItemText
            primary={<h1 style={{ margin: 0 }}>{basics?.company_name}</h1>}
            secondary={`(${basics?.company_type.short}) ${basics?.local_organization_id?.id}(${basics?.local_organization_id?.country})`}
            style={{ margin: 0 }}
          ></ListItemText>
        </ListItem>
        <div className={classes.score}>
          <h1 style={{ fontSize: "5rem" }}>{basics?.score}</h1>
          <h1>/10</h1>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <CompanyBasics data={basics} />
        <CompanyHighlights data={highlights} />
      </div>
      {relations ? <Management relations={relations} /> : null}
    </Paper>
  )
}
