import { useMutation, gql } from "@apollo/client"
import { IconButton } from "@material-ui/core"
import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"

import { IDeleteIconProps } from "../@types/delete-task-button"

export const DeleteTaskButton: React.FC<IDeleteIconProps> = ({
  id,
  refetch,
}) => {
  const [deleteCard] = useMutation(gql`
    mutation DeleteCard($id: String!) {
      deleteCard(id: $id) {
        status
        message
      }
    }
  `)

  const remove = async () => {
    await deleteCard({ variables: { id } })

    await refetch()
  }

  return (
    <IconButton onClick={() => remove()} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  )
}
