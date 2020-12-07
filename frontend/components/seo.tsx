import Helmet from "next/head"

import { ISEOProps } from "../@types/seo"

export const SEO: React.FC<ISEOProps> = ({ title = "Todolist app" }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
