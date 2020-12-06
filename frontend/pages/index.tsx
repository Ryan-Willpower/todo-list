import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Switch,
  IconButton,
  TextField,
  Fab,
  Modal,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import { useState } from "react"

import { Layout } from "../components/layout"

enum CARD_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface ICard {
  id: string
  name: string
  content?: string | null
  status: CARD_STATUS
}

let cards: ICard[] = [
  {
    id: "id1",
    name: "Hello world",
    content: null,
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id2",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id3",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id4",
    name: "Buy some milk",
    content:
      "Buy the milk from the store. But you know what? This task gonna has the longest content in all task we have here. Why? Well, because I wanna do some mockup content but I don't have better internet connection to do that, so I have to manually type whatever I can think of to make this task content long enough to make everyone know that this is the task with a long content",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id5",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id6",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id7",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id8",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id9",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
  {
    id: "id10",
    name: "Hello world With Content",
    content: "This is content of the hello world task",
    status: CARD_STATUS.ACTIVE,
  },
]

function HomePage() {
  const [isModalOpen, setModalOpenStatus] = useState(false)

  return (
    <Layout>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box pt={10}>
          <h1>What's your plan today?</h1>
          {cards.length === 0 ? (
            <p>You don't have any task now. Add now.</p>
          ) : (
            <Grid container spacing={1}>
              {cards.map(card => (
                <Grid key={card.id} item xs={12} md={6} lg={4} xl={3}>
                  <TodoCard card={card} />
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
          <ModalBody />
        </Modal>
        {/* @todo: make this icon responsive */}
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

interface ITodoCardProps {
  card: ICard
}

const TodoCard: React.FC<ITodoCardProps> = ({ card }) => {
  const [isEditStage, setEditStage] = useState(false)
  const [changeData, updateData] = useState({
    name: card.name,
    content: card.content,
  })

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    updateData({ ...changeData, [event.target.name]: event.target.value })
  }

  const submit = () => {
    const data = cards.find(item => item.id === card.id) as ICard
    data.name = changeData.name
    data.content = changeData.content
    const oldDataIndex = cards.findIndex(item => item.id === card.id)
    cards.splice(oldDataIndex, 1, data)

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
            <StatusSwitch status={card.status} name={card.name} />
            <Box ml="auto">
              <IconButton
                onClick={() => setEditStage(false)}
                aria-label="cancel"
              >
                <ClearIcon color="error" />
              </IconButton>
              <IconButton onClick={() => submit()} aria-label="apply">
                <CheckIcon color="primary" />
              </IconButton>
              <DeleteTaskButton id={card.id} />
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
          <StatusSwitch status={card.status} name={card.id} />
          <Box ml="auto">
            <IconButton onClick={() => setEditStage(true)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <DeleteTaskButton id={card.id} />
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

interface IStatusSwitchProps {
  status: CARD_STATUS
  name: string
}
function StatusSwitch({ name, status }: IStatusSwitchProps) {
  const [isActive, setActiveStatus] = useState(
    status === CARD_STATUS.ACTIVE ? true : false
  )

  const handleStatusChange = () => {
    setActiveStatus(!isActive)
  }

  return (
    <Switch
      checked={isActive}
      onChange={handleStatusChange}
      color="primary"
      name={name}
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  )
}

interface IDeleteIconProps {
  id: string
}

function DeleteTaskButton({ id }: IDeleteIconProps) {
  const remove = () => {}

  return (
    <IconButton onClick={() => remove()} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  )
}

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

function ModalBody() {
  const modalStyleClass = useModalStyle()

  return (
    <Paper className={modalStyleClass.paper}>
      <form noValidate autoComplete="off">
        <h1>Create a new task</h1>
        <Box my={1}>
          <TextField
            fullWidth
            placeholder="Set your task name"
            name="name"
            label="Name"
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rowsMax={12}
          placeholder="Remind yourself here"
          name="content"
          label="Content"
        />
        <Box display="flex" mt={4}>
          <Button
            className={modalStyleClass.button}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default HomePage
