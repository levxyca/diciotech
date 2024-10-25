import { note as prompt } from "@clack/prompts"

export const notePrompt = (message: string, title: string) => {
  const note = prompt(message, title)
  return note
}