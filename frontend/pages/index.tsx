import TextField from "@material-ui/core/TextField"

import { Layout } from "../components/layout"

function HomePage() {
  return (
    <Layout>
      <div className="hello-world">Welcome to Next.js!</div>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
      </form>
    </Layout>
  )
}

export default HomePage
