import { cancel, isCancel } from "@clack/prompts";

/**
 * Handle the user cancelation in the CLI.
 */
export function handleCancelation(value: unknown) {
  if (!value) return;
  if (isCancel(value)) {
    cancel(' Operação cancelada. ');
    process.exit(0);
  }
}