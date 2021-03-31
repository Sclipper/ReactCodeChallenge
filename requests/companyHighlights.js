const companyHighlights = ({ id }) => {
  return fetch("/api/company/highlights/" + id)
    .then((data) => data.json())
    .then(({ data }) => {
      return data
    })
}

export default companyHighlights
