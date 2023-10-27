import c from "ansi-colors";
import { multiselect } from "@clack/prompts";

import { handleCancelation } from "../../utils/handle-cancel";

import { AvailableTags } from "../../types";


/**
 * Generic multiselect prompt. Prompts the user for multiple options.
 */
export const multiSelect = async (
  message: string,
  availableTags: AvailableTags[],
  cb: Function
): Promise<symbol | unknown[] | void> => {
  const tags = await multiselect({
    message: c.cyanBright(message),
    options: availableTags,
    required: true,
  });

  cb(tags); // callback to validate the tags
  handleCancelation(tags); // handle the user cancelation
  return tags;
};
