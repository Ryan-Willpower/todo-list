import { useState } from "react"

export function useForm() {
  const [userInput, setUserInput] = useState("")
  const [inputErrorStatus, setInputErrorStatus] = useState({
    isError: false,
    message: "",
  })

  const validateUserInput = (inputName: string) => {
    if (!userInput) {
      setInputErrorStatus({
        isError: true,
        message: `Please enter ${inputName}`,
      })

      return
    }

    setInputErrorStatus({
      isError: false,
      message: "",
    })
  }

  return {
    userInput,
    setUserInput,
    inputErrorStatus,
    validateUserInput,
  }
}
