import { useMutation, gql } from "@apollo/client"
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Box,
  Button,
  TextField,
} from "@material-ui/core"
import React from "react"
import { IModalBodyProps } from "../@types/add-card-modal"
import { useForm } from "../utils/useForm"

const useModalStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        width: "300px",
      },
      [theme.breakpoints.up("md")]: {
        width: "600px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "800px",
      },
    },
    button: {
      marginLeft: "auto",
    },
  })
)

export const ModalBody: React.FC<IModalBodyProps> = ({
  refetch,
  setModalOpenStatus,
}) => {
  const modalStyleClass = useModalStyle()

  const {
    userInput: nameInput,
    setUserInput: setNameInput,
    inputErrorStatus: nameInputErrorStatus,
    validateUserInput: validateNameInput,
  } = useForm()

  const { userInput: contentInput, setUserInput: setContentInput } = useForm()

  const [addCard] = useMutation(gql`
    mutation AddCard($name: String!, $content: String) {
      addCard(name: $name, content: $content) {
        id
      }
    }
  `)

  const submit = async () => {
    if (nameInputErrorStatus.isError) {
      return
    }

    await addCard({ variables: { name: nameInput, content: contentInput } })

    await refetch()

    setModalOpenStatus(false)
  }

  return (
    <Paper className={modalStyleClass.paper}>
      <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
        <h1>Create a new task</h1>
        <Box my={1}>
          <TextField
            fullWidth
            placeholder="Set your task name"
            name="name"
            label="Name"
            onChange={e => setNameInput(e.target.value)}
            onBlur={e => validateNameInput(e.target.name)}
            error={nameInputErrorStatus.isError}
            helperText={nameInputErrorStatus.message}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rowsMax={12}
          placeholder="Remind yourself here"
          name="content"
          label="Content"
          onChange={e => setContentInput(e.target.value)}
        />
        <Box display="flex" mt={4}>
          <Button
            className={modalStyleClass.button}
            variant="contained"
            color="primary"
            onClick={() => submit()}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
