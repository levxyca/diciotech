export const validations = {
  title: (input: string) => {
    const raw = input.trim();

    if (raw.trim().length < 2) {
      return "O título precisa ter pelo menos 3 caracteres.";
    }
    return true;
  },
  description: (input: string) => {
    const raw = input.trim();

    if (raw.length < 10) {
      return "A descrição precisa ter pelo menos 10 caracteres.";
    }

    return true;
  },
  tags: (input: string[]) => {
    if (input.length < 1) {
      return "Você precisa selecionar pelo menos uma tag.";
    }
    return true;
  },
};
