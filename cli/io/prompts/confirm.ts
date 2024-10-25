import { confirm } from "@clack/prompts";

import { handleCancelation } from "../../utils/handle-cancel";

/**
 * Generic multiselect prompt. Prompts the user for multiple options.
 */
export const confirmPrompt = async (message: string): Promise<symbol | boolean> => {
  const shouldContinue = await confirm({
    message: message,
    active: 'Sim',
    inactive: 'Não',
    initialValue: true,
  });

  handleCancelation(shouldContinue); // handle the user cancelation
  return shouldContinue;
};
