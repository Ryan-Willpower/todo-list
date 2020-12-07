import { Box, Container, Grid, Link as StyledLink } from "@material-ui/core"
import Link from "next/link"
import { useUser } from "../utils/useUser"

export const NavBar: React.FC = () => {
  const user = useUser()

  return (
    <Box
      py={3}
      position="fixed"
      top="0"
      width={1}
      zIndex="2"
      bgcolor="#fff"
      boxShadow="0px 1px rgba(0,0,0,0.1)"
    >
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Link href="/">
            <Box fontSize={18}>
              <StyledLink>Todo List</StyledLink>
            </Box>
          </Link>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            alignItems="center"
          >
            {user ? (
              <div>user: {user}</div>
            ) : (
              <>
                <Link href="/login">
                  <StyledLink>Login</StyledLink>
                </Link>
                <Box mx={2}>|</Box>
                <Link href="/register">
                  <StyledLink>Register</StyledLink>
                </Link>
              </>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
