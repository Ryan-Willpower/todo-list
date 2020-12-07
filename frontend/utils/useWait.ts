import { useState } from "react"

export function useWait() {
  const [isLoading, setLoadingStatus] = useState(false)
  const [isErrorResponse, setErrorResponseStatus] = useState(false)

  return {
    isLoading,
    isErrorResponse,
    setLoadingStatus,
    setErrorResponseStatus,
  }
}
