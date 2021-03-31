import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import InformationWrapper from "./components/InformationWrapper"
import moment from "moment"
import numeral from "numeral"
const useStyles = makeStyles(() => ({
  container: {
    margin: "2rem",
  },
  title: {
    // textAlign: "center",
    marginTop: 0,
    padding: "2rem",
  },
}))

const visibleFields = [
  "vat",
  "email",
  "phone",
  "address",
  "webpage",
  "status",
  "status_valid_from",
  "company_name",
  "powers_to_bind",
  "main_industry_code",
  "registered_capital",
  "number_of_employees",
  "date_of_incorporation",
  "company_secondary_names",
  "advertisement_protection",
]

const visibleAroundTheName = [
  "company_type",
  "score",
  "local_organization_id",
  "risk_assessment",
]

const handleAddress = (address) => {
  const { coname, country, municipality, number, street, zipcode } = address
  return `${
    coname ? `${coname} ` : ""
  }${street} ${number}, ${zipcode} ${municipality}, ${country}`
}

const CompanyBasics = ({ data }) => {
  const classes = useStyles()

  const handleRenderField = (field) => {
    switch (field) {
      case "vat":
        return (
          <InformationWrapper title={field}>
            {data.vat ? (
              <Typography>Company is registered for VAT</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "advertisement_protection":
        return (
          <InformationWrapper title={field}>
            {data.advertisement_protection ? (
              <Typography>Company is protected agains advertisement</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "email":
        return (
          <InformationWrapper title={field}>
            {!data.email.hidden ? (
              <Typography>{data.email.email}</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "phone":
        return (
          <InformationWrapper title={field}>
            {!data.phone.hidden ? (
              <Typography>{data.phone.phone_number}</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "webpage":
        return (
          <InformationWrapper title={field}>
            {data.webpage ? <Typography>{data.webpage}</Typography> : null}
          </InformationWrapper>
        )
      case "address":
        return (
          <InformationWrapper title={field}>
            {data.address ? (
              <Typography>{handleAddress(data.address)}</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "status":
        return (
          <InformationWrapper title={field}>
            {data.status ? <Typography>{data.status}</Typography> : null}
          </InformationWrapper>
        )
      case "status_valid_from":
        return (
          <InformationWrapper title={field}>
            {data.status_valid_from ? (
              <Typography>
                {moment(data.status_valid_from).format("DD.MM.YYYY")}
              </Typography>
            ) : null}
          </InformationWrapper>
        )
      case "powers_to_bind":
        return (
          <InformationWrapper title={field}>
            {data.powers_to_bind ? (
              <Typography>{data.powers_to_bind}</Typography>
            ) : null}
          </InformationWrapper>
        )
      case "main_industry_code":
        return (
          <InformationWrapper title={field}>
            {data.main_industry_code ? (
              <div>
                <Typography>{data.main_industry_code.description}</Typography>
                <Typography>{data.main_industry_code.code}</Typography>
              </div>
            ) : null}
          </InformationWrapper>
        )
      case "registered_capital":
        return (
          <InformationWrapper title={field}>
            {data.registered_capital ? (
              <div style={{ display: "flex" }}>
                <Typography>
                  {`${numeral(data.registered_capital.value).format("0,0")} ${
                    data.registered_capital.currency
                  }`}
                </Typography>
              </div>
            ) : null}
          </InformationWrapper>
        )
      case "number_of_employees":
        return (
          <InformationWrapper title={field}>
            {data.number_of_employees ? (
              <div style={{ display: "flex" }}>
                <Typography>
                  {numeral(data.number_of_employees.specific).format("0,0")}
                </Typography>
              </div>
            ) : null}
          </InformationWrapper>
        )
      case "date_of_incorporation":
        return (
          <InformationWrapper title={field}>
            {data.date_of_incorporation ? (
              <div style={{ display: "flex" }}>
                <Typography>
                  {moment(data.date_of_incorporation).format("DD.MM.YYYY")}
                </Typography>
              </div>
            ) : null}
          </InformationWrapper>
        )
      case "company_secondary_names":
        return (
          <InformationWrapper title={field}>
            {data?.company_secondary_names?.length ? (
              <List>
                {data.company_secondary_names?.map((name) => (
                  <ListItem dense key={name.name}>
                    <ListItemText
                      primary={name.name}
                      secondary={`${moment(name.valid_from).format(
                        "DD.MM.YYYY",
                      )} - ${moment(name.valid_to).format("DD.MM.YYYY")}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </InformationWrapper>
        )

      default:
        return ""
    }
  }

  if (!data) {
    return <p>Loading...</p>
  }
  return (
    <div style={{ width: "50%" }}>
      <div className={classes.container}>
        {visibleFields.map((field) => (
          <div classes={{ display: "flex" }} key={field}>
            {handleRenderField(field)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyBasics
