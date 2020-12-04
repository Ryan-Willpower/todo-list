import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))

    if (networkError) console.log(`[Network error]: ${networkError}`)

    forward(operation)
  }
)

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
})

export const client = new ApolloClient({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
})
