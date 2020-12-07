import { useEffect } from "react"
import type { AppProps /*, AppContext */ } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ApolloProvider } from "@apollo/client"

import "../styles/index.sass"
import { theme } from "../utils/theme"
import { useAccessTokenContext } from "../utils/access-token-context"
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { refetchToken } from "../utils/useRefreshToken"
import { useRouter } from "next/router"

export default function CustomApp({ Component, pageProps }: AppProps) {
  const {
    Provider: AccessTokenProvider,
    accessToken,
    setAccessToken,
  } = useAccessTokenContext()

  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    refetchToken()
      .then(({ data }) => {
        setAccessToken(data.accessToken)
      })
      .catch(() => {
        router.push("/login")
      })
  }, [])

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }))

    return forward(operation)
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, name }) => `[${name}]: ${message}`)
      }

      if (networkError) {
        refetchToken()
          .then(({ data }) => {
            if (data.accessToken) {
              setAccessToken(data.accessToken)

              router.push("/")
            }
          })
          .catch(err => {
            router.push("/login")
          })
      }

      forward(operation)
    }
  )

  const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
  })

  const client = new ApolloClient({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: new InMemoryCache(),
    link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
  })

  return (
    <>
      <AccessTokenProvider value={{ accessToken, setAccessToken }}>
        <ApolloProvider client={client}>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </AccessTokenProvider>
    </>
  )
}
