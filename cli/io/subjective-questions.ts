import Enquirer from "enquirer";

import { basePrompt } from "./base";

import { validations } from "../core/prompt-validations";

import { SubjectiveQuestions } from "../types";

export const subjectiveQuestions = async (): Promise<SubjectiveQuestions> => {
  const questions: SubjectiveQuestions = await Enquirer.prompt([
    {
      ...basePrompt,
      name: "title",
      message: "Qual título o seu conceito tem ?",
      validate: validations.title,
    },
    {
      ...basePrompt,
      name: "description",
      message: "Qual descrição o seu conceito tem ?",
      validate: validations.description,
    },
    {
      type: "input",
      name: "code",
      message: "Seu conceito tem algum código ? (opcional)",
    },
  ]);

  return questions;
};
