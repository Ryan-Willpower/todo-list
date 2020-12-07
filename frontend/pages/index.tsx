import { Box, Container, Grid, Fab, Modal } from "@material-ui/core"
import { useQuery, gql } from "@apollo/client"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"

import { Layout } from "../components/layout"
import { useRefreshToken } from "../utils/useRefreshToken"
import { ModalBody } from "../components/add-card-modal"
import { TodoCard } from "../components/todo-card"
import { ICard } from "../@types/app"

interface IListCardResponse {
  listCards: ICard[]
}

function HomePage() {
  useRefreshToken()

  const [isModalOpen, setModalOpenStatus] = useState(false)

  const { loading, data, refetch } = useQuery<IListCardResponse>(
    gql`
      query {
        listCards {
          id
          name
          content
          status
        }
      }
    `
  )

  if (loading || !data) {
    return <div>loading..</div>
  }

  return (
    <Layout>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box pt={10}>
          <h1>What's your plan today?</h1>
          {data.listCards.length === 0 ? (
            <p>You don't have any task now. Add now.</p>
          ) : (
            <Grid container spacing={1}>
              {data.listCards.map(card => (
                <Grid key={card.id} item xs={12} md={6} lg={4} xl={3}>
                  <TodoCard refetch={refetch} card={card} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Modal
          open={isModalOpen}
          onClose={() => setModalOpenStatus(false)}
          aria-label="Add a new task"
        >
          <ModalBody
            setModalOpenStatus={setModalOpenStatus}
            refetch={refetch}
          />
        </Modal>
        <Fab
          style={{ position: "fixed", bottom: "16px", right: "16px" }}
          color="primary"
          aria-label="add"
          onClick={() => setModalOpenStatus(true)}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Layout>
  )
}

export default HomePage
