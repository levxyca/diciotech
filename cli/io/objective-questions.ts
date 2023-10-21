import Enquirer from "enquirer";

import { basePrompt } from "./base";

import { validations } from "../core/prompt-validations";

import { ObjectiveQuestions } from "../types";

export const objectiveQuestions = async (): Promise<ObjectiveQuestions> => {
  const questions: ObjectiveQuestions = await Enquirer.prompt([
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
