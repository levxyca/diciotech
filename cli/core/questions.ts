import { validations } from "./prompt-validations";

export const inputBase = {
  required: true,
};

export const subjectivePromptQuestions = [
  {
    message: "Digite o nome do conceito",
    validation: validations.title,
    required: true,
  },
  {
    ...inputBase,
    message: "Digite a descrição do conceito",
    validation: validations.description
  },
];
