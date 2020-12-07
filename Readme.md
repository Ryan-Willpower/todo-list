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

Add some basic authentication included:

- `POST /register` - generate user and return with a random password
- `POST /login` - using username and password to log in and return with an access token and store a refresh token in cookies
- `POST /refresh` - refresh the access token and generate the new refresh token

And included a card content (which using GraphQL):

- `Query listCards` - list all the cards in a database
- `Mutation addCard` - add the card
- `Mutation updateCard` - update the card's information
- `Mutation deleteCard` - remove the card
- `Mutation updateCardStatus` - update the card's status
