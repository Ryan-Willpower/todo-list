import { useMutation, gql } from "@apollo/client"
import { Switch } from "@material-ui/core"
import React, { useState } from "react"

import { IStatusSwitchProps } from "../@types/status-switch"

enum CARD_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const StatusSwitch: React.FC<IStatusSwitchProps> = ({
  status,
  id,
  refetch,
  name,
}) => {
  const [isActive, setActiveStatus] = useState(
    status === CARD_STATUS.ACTIVE ? true : false
  )

  const [updateCard, { data }] = useMutation(
    gql`
      mutation UpdateCard($id: String!, $status: CARD_STATUS) {
        updateCard(id: $id, status: $status) {
          id
          status
        }
      }
    `
  )

  const handleStatusChange = async () => {
    await updateCard({
      variables: {
        id,
        status: !isActive ? CARD_STATUS.ACTIVE : CARD_STATUS.INACTIVE,
      },
    })

    if (!data) {
      await updateCard({
        variables: {
          id,
          status: !isActive ? CARD_STATUS.ACTIVE : CARD_STATUS.INACTIVE,
        },
      })
    }

    await refetch()

    setActiveStatus(!isActive)
  }

  return (
    <Switch
      checked={isActive}
      onChange={async () => await handleStatusChange()}
      color="primary"
      name={name}
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  )
}
