import { CARD_STATUS } from "./app"

export interface IStatusSwitchProps {
  status: CARD_STATUS
  name: string
  refetch: Function
  id: string
}
