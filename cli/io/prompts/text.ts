
import { text } from "@clack/prompts";

import { handleCancelation } from "../../utils/handle-cancel";

import { SubjectiveQuestion } from "../../types";

interface QuestionProps {
  message: string;
  validation: (value: string) => void | string;
}

export const subjectiveQuestion = async (props: QuestionProps): Promise<SubjectiveQuestion> => {
   const prompt = await text({
    message: props.message,
    validate: props.validation
  });

  handleCancelation(prompt);
  return prompt;
};