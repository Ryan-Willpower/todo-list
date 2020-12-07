import { useMutation, gql } from "@apollo/client"
import {
  Box,
  Card,
  CardContent,
  TextField,
  CardActions,
  IconButton,
} from "@material-ui/core"
import React, { useState } from "react"

import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import EditIcon from "@material-ui/icons/Edit"

import { DeleteTaskButton } from "./delete-task-button"
import { StatusSwitch } from "./status-switch"
import { ITodoCardProps } from "../@types/todo-card"

export const TodoCard: React.FC<ITodoCardProps> = ({ card, refetch }) => {
  const [isEditStage, setEditStage] = useState(false)
  const [changeData, updateData] = useState({
    name: card.name,
    content: card.content,
  })

  const [updateCard] = useMutation(
    gql`
      mutation UpdateCard(
        $id: String!
        $name: String
        $content: String
        $category: String
      ) {
        updateCard(
          id: $id
          name: $name
          content: $content
          category: $category
        ) {
          id
        }
      }
    `
  )

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    updateData({ ...changeData, [event.target.name]: event.target.value })
  }

  const submit = async () => {
    await updateCard({
      variables: { id: card.id, ...changeData },
    })

    await refetch()

    setEditStage(false)
  }

  if (isEditStage) {
    return (
      <Box my={1}>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <Box my={1}>
                <TextField
                  fullWidth
                  defaultValue={card.name}
                  onChange={e => handleFormChange(e)}
                  name="name"
                  label="Name"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rowsMax={12}
                placeholder="Remind yourself here"
                defaultValue={card?.content}
                onChange={e => handleFormChange(e)}
                name="content"
                label="Content"
              />
            </form>
          </CardContent>
          <CardActions disableSpacing>
            <StatusSwitch
              id={card.id}
              refetch={refetch}
              status={card.status}
              name={card.name}
            />
            <Box ml="auto">
              <IconButton
                onClick={() => setEditStage(false)}
                aria-label="cancel"
              >
                <ClearIcon color="error" />
              </IconButton>
              <IconButton
                onClick={async () => await submit()}
                aria-label="apply"
              >
                <CheckIcon color="primary" />
              </IconButton>
              <DeleteTaskButton refetch={refetch} id={card.id} />
            </Box>
          </CardActions>
        </Card>
      </Box>
    )
  }

  return (
    <Box my={1}>
      <Card>
        <CardContent>
          <h2>{card.name}</h2>
          {card.content && <p>{card.content}</p>}
        </CardContent>
        <CardActions disableSpacing>
          <StatusSwitch
            id={card.id}
            refetch={refetch}
            status={card.status}
            name={card.id}
          />
          <Box ml="auto">
            <IconButton onClick={() => setEditStage(true)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <DeleteTaskButton refetch={refetch} id={card.id} />
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}
