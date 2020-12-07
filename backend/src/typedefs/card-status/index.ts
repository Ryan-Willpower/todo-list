import { gql } from "apollo-server-fastify"

export default gql`
  enum CARD_STATUS {
    ACTIVE
    INACTIVE
  }

  extend type Mutation {
    updateCardStatus(id: String!, status: CARD_STATUS!): QueryStatus
  }
`
