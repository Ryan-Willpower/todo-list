import { useRouter } from "next/router"
import { Box, Button, TextField, Typography } from "@material-ui/core"
import axios from "axios"
import { useContext } from "react"

import { Layout } from "../components/layout"
import { CustomLink } from "../components/link"
import { useForm } from "../utils/useForm"
import { useWait } from "../utils/useWait"
import { IAccessTokenContext } from "../@types/app"
import { accessTokenContext } from "../utils/access-token-context"
import { ILoginResponse } from "../@types/login"
import { useRefreshToken } from "../utils/useRefreshToken"

function LoginPage() {
  useRefreshToken()

  const { setAccessToken } = useContext<IAccessTokenContext | {}>(
    accessTokenContext
  ) as IAccessTokenContext

  const router = useRouter()

  const {
    userInput: usernameInput,
    setUserInput: setUsernameInput,
    inputErrorStatus: usernameInputErrorStatus,
    validateUserInput: validateUsernameInput,
  } = useForm()

  const {
    userInput: passwordInput,
    setUserInput: setPasswordInput,
    inputErrorStatus: passwordInputErrorStatus,
    validateUserInput: validatePasswordInput,
  } = useForm()

  const {
    isErrorResponse,
    setLoadingStatus,
    setErrorResponseStatus,
  } = useWait()

  const handleLogin = async () => {
    if (passwordInputErrorStatus.isError || usernameInputErrorStatus.isError) {
      return
    }

    try {
      setLoadingStatus(true)
      setErrorResponseStatus(false)

      const { data: loginResponse } = await axios.post<ILoginResponse>(
        `${process.env.BACKEND_HOSTNAME}/login`,
        {
          username: usernameInput,
          password: passwordInput,
        },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      )

      setAccessToken(loginResponse.accessToken)

      setLoadingStatus(false)

      router.push("/")
    } catch (error) {
      setErrorResponseStatus(true)
    }
  }

  return (
    <Layout>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={1}
      >
        <form noValidate onSubmit={e => e.preventDefault()} autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center">
            <h1>Login</h1>
            <Box my={1}>
              <TextField
                label="Username"
                name="username"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                onBlur={e => validateUsernameInput(e.target.name)}
              />
            </Box>
            <Box my={1}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                onBlur={e => validatePasswordInput(e.target.name)}
              />
            </Box>
            <Box display="flex" alignItems="center" my={4}>
              Don't have an account?
              <CustomLink href="/register" mx={1}>
                Register
              </CustomLink>
              now.
            </Box>
            {isErrorResponse && (
              <Box my={2}>
                <Typography color="error">
                  Server Unavailabled, Please try again later.
                </Typography>
              </Box>
            )}
            <Button
              onClick={() => handleLogin()}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default LoginPage
