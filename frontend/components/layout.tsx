import Box from "@material-ui/core/Box"

import { ILayoutProps } from "../@types/layout"
import { NavBar } from "./navbar"
import { SEO } from "./seo"

export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <Box width={1} height="100vh">
      <SEO title={title} />
      <NavBar />
      {children}
    </Box>
  )
}
