const { MultiSelect } = require("enquirer");

import { availableTags } from "../core/available-tags";
import { validations } from "../core/prompt-validations";

export const promptMultiSelectTags = new MultiSelect({
  name: "tags",
  message: "Selecione as tags relacionadas ao seu conceito",
  choices: availableTags,
  validate: validations.tags,
});
