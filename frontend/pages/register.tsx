import { Layout } from "../components/layout"

import { Box, Button } from "@material-ui/core"
import { Input } from "../components/input"
import { CustomLink } from "../components/link"

function RegisterPage() {
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
            <h1>Register</h1>
            <Input label="Username" />
            <Box display="flex" alignItems="center" my={4}>
              Have an account?
              <CustomLink href="/login" mx={1}>
                Login
              </CustomLink>
              now.
            </Box>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default RegisterPage
