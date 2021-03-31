import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(() => ({}))

const localized = {
  vat: "VAT",
  email: "Email",
  phone: "Phone number",
  address: "Address",
  webpage: "Website",
  status: "Status",
  status_valid_from: "Status valid from",
  company_name: "Company name",
  powers_to_bind: "Powers to bind",
  main_industry_code: "Industry code",
  registered_capital: "Capital",
  number_of_employees: "Number of emplyees",
  date_of_incorporation: "Date of incorporation",
  company_secondary_names: "Secondary names",
  advertisement_protection: "Advertisement protected",
}

const InformationWrapper = ({ title, children }) => {
  const classes = useStyles()
  return (
    <div style={{ width: "50%", marginBottom: "1rem" }}>
      <Typography>
        <b>{localized[title]}</b>
      </Typography>
      {children}
    </div>
  )
}

export default InformationWrapper
