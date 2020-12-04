import { gql } from "apollo-server-fastify"

export default gql`
  type Card {
    id: String!
    author: String!
    name: String!
    status: CARD_STATUS!
    content: String
    category: String
    iat: String!
  }

  type Query {
    listCards: [Card]
  }

  type Mutation {
    addCard(name: String!, content: String, category: String): Card
    updateCard(
      id: String!
      name: String
      content: String
      category: String
      status: CARD_STATUS
    ): Card
    deleteCard(id: String!): QueryStatus
  }
`
