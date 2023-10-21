import crypto from "node:crypto";

import { promptMultiSelectTags } from "../io/multiselect-tags";
import { objectiveQuestions } from "../io/objective-questions";

/**
 * Prompts the user for the term's information.
 * @returns {Object} The term's information.
 * @throws {Error} If the user doesn't provide the required information.
 */
export const createNewTerm = async () => {
  const questions = await objectiveQuestions();
  const tagsPrompt: string[] = await promptMultiSelectTags.run();

  const card = {
    id: crypto.randomBytes(16).toString("hex"),
    title: questions.title,
    description: questions.description,
    tags: tagsPrompt,
    content: {
      code: questions.code,
    },
  };

  return card;
};
