import { Box, Button, TextField } from "@material-ui/core"
import { useState } from "react"
import axios from "axios"

import { Layout } from "../components/layout"
import { CustomLink } from "../components/link"
import { useForm } from "../utils/useForm"
import { IRegisterResponse } from "../@types/register"
import { useWait } from "../utils/useWait"
import { useRefreshToken } from "../utils/useRefreshToken"

function RegisterPage() {
  useRefreshToken()

  const {
    userInput,
    setUserInput,
    inputErrorStatus,
    validateUserInput,
  } = useForm()

  const {
    isLoading,
    isErrorResponse: isErrorRetrivedPassword,
    setLoadingStatus,
    setErrorResponseStatus: setErrorGeneratePasswordStatus,
  } = useWait()

  const [password, setPasswordReponse] = useState("")

  const handleUserRegister = async () => {
    if (inputErrorStatus.isError) {
      return
    }

    try {
      setLoadingStatus(true)

      const { data } = await axios.post<IRegisterResponse>(
        `${process.env.BACKEND_HOSTNAME}/register`,
        {
          username: userInput,
        },
        { headers: { "content-type": "application/json" } }
      )

      setPasswordReponse(data.password)

      setLoadingStatus(false)
    } catch (error) {
      setErrorGeneratePasswordStatus(true)
    }
  }

  if (!isLoading && password) {
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
              <Box my={1}>
                <TextField
                  label="Generated password"
                  name="password"
                  value={password}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box my={2}>This is your random password.</Box>
              <CustomLink href="/login" mx={1}>
                <Button variant="contained" color="primary">
                  Go to login
                </Button>
              </CustomLink>
            </Box>
          </form>
        </Box>
      </Layout>
    )
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
        <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center">
            <h1>Register</h1>
            <Box my={1}>
              <TextField
                onBlur={e => validateUserInput(e.target.name)}
                error={inputErrorStatus.isError}
                label="name"
                name="username"
                value={userInput}
                helperText={inputErrorStatus.message}
                onChange={e => setUserInput(e.target.value)}
              />
            </Box>
            <Box display="flex" alignItems="center" my={4}>
              Have an account?
              <CustomLink href="/login" mx={1}>
                Login
              </CustomLink>
              now.
            </Box>
            {isErrorRetrivedPassword ? (
              <Button variant="contained" disabled>
                Server unavailabled, Please try again later.
              </Button>
            ) : (
              <Button
                onClick={() => handleUserRegister()}
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default RegisterPage
