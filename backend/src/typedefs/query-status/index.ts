import { gql } from "apollo-server-fastify"

export default gql`
  enum QUERY_STATUS {
    SUCCESS
    FAIL
  }

  type QueryStatus {
    status: QUERY_STATUS!
    message: String
  }
`
