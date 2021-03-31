const companyBasics = ({ id }) => {
  return fetch("/api/company/basics/" + id)
    .then((data) => data.json())
    .then(({ data }) => {
      return data
    })
}

export default companyBasics
