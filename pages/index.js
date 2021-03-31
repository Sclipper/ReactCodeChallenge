import * as React from "react"

import SearchResults from "@/components/SearchResults"
import { makeStyles, Paper, TextField } from "@material-ui/core"
import axios from "axios"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "-8px",
    height: "100vh",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  searchField: {
    width: "48%",
  },
}))

const Home = () => {
  const classes = useStyles()
  const [searchText, setSearchText] = React.useState("")
  const [searchResults, setSearchResults] = React.useState([])

  React.useEffect(() => {
    axios.get(`/api/search?query=${searchText}`).then((res) => {
      setSearchResults(res.data.data ?? [])
    })
  }, [searchText])

  return (
    <div className={classes.container}>
      <h1>Welcome to my fabulous solution</h1>
      <Paper elevation={3} className={classes.searchField}>
        <TextField
          fullWidth
          autoComplete="off"
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          id="outlined-basic"
          variant="outlined"
        />
      </Paper>
      <SearchResults results={searchResults} />
    </div>
  )
}

export default Home
