import Link from "next/link"
import { Box, Link as StyleLink, Typography } from "@material-ui/core"
import { ICustomLinkProps } from "../@types/link"

export const CustomLink: React.FC<ICustomLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <Box {...props}>
        <Typography>
          <StyleLink>{children}</StyleLink>
        </Typography>
      </Box>
    </Link>
  )
}
