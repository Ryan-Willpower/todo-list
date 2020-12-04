import { Container } from "@material-ui/core"
import Box from "@material-ui/core/Box"

import { ILayoutProps } from "../@types/layout"
import { SEO } from "./seo"

export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <Box mx="auto">
      <Container maxWidth="md">
        <SEO title={title} />
        {children}
      </Container>
    </Box>
  )
}
