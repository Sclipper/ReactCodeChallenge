import { NoSsr } from "@material-ui/core"

function MyApp({ Component, pageProps }) {
  return (
    <NoSsr>
      <Component {...pageProps} />
    </NoSsr>
  )
}

export default MyApp
