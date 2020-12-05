import { Layout } from "../components/layout"

import { Box, Button } from "@material-ui/core"
import { Input } from "../components/input"
import { CustomLink } from "../components/link"

function LoginPage() {
  return (
    <Layout>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={1}
      >
        <form noValidate autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center">
            <h1>Login</h1>
            <Input label="Username" />
            <Input label="Password" />
            <Box display="flex" alignItems="center" my={4}>
              Don't have an account?
              <CustomLink href="/register" mx={1}>
                Register
              </CustomLink>
              now.
            </Box>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default LoginPage
