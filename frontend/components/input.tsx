import { Box, TextField } from "@material-ui/core"

import { InputProps } from "../@types/input"

export const Input: React.FC<InputProps> = ({ label }) => {
  return (
    <Box my={1}>
      <TextField label={label} />
    </Box>
  )
}
