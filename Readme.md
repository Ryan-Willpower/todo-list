# Stack

Backend - Fastify with apollo-server-fastify for GraphQL

Frontend - Next.js

All stack are using `Typescript`

## Backend Folder Structure

```
/__mocks__ - contain all modules mocks
/src
  /__tests__ - all test files
  /@types - typescript type definition
  /helpers - utility function
  /resolvers - Graphql resolvers
  /routes - REST API routes
  /typedefs - Graphql typedefs
  app.ts - App instance
  global.d.ts - Global app typescript type definition
  index.ts - Index file for starting a server
```

## Backend route

- `POST /register` - generate user and return with a random password
- `POST /login` - using username and password to log in and return with an access token and store a refresh token in cookies
- `POST /refresh` - refresh the access token and generate the new refresh token

And included a card content (which using GraphQL):

- `Query listCards` - list all the cards in a database

```graphql
query {
  listCards {
    id
    name
    content
    category
    status
    iat
  }
}
```

- `Mutation addCard` - add the card

```graphql
mutation {
  addCard {
    status
    message
  }
}
```

- `Mutation updateCard` - update the card's information

```graphql
mutation {
  updateCard {
    id
    name
    content
    category
    status
    iat
  }
}
```

- `Mutation deleteCard` - remove the card

```graphql
mutation {
  deleteCard {
    status
    message
  }
}
```

- `Mutation updateCardStatus` - update the card's status

```graphql
mutation {
  updateCardStatus {
    status
    message
  }
}
```

## Frontend Folder Structure

```
/@types - typescript type definition
/components - all components
/pages - all site pages
/styles - custom css
/utils - utility function
```

## Frontend route

- `/register` - generate user password
- `/login` - using username and password to log in
- `/` - main page (must login before access)
