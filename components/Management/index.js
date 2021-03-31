import { setManagementData } from "./utils/setManagementData"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])
  const keys = managementData?.length ? Object.keys(managementData[0]) : []
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Management</h1>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={`only keys ${key}`}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {managementData.map((data, i) => (
            <tr key={i}>
              {keys.map((key) => (
                <th key={key}>{data[key]}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Management
