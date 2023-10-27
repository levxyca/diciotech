export const validations = {
  title: (input: string) => {
    const raw = input.trim();

    if (raw.trim().length < 1) {
      return `O título precisa ter pelo menos 1 caracteres. Você digitou ${raw.length} caracteres.`
    }
  },
  description: (input: string) => {
    const raw = input.trim();

    if (raw.length < 10) {
      return `A descrição precisa ter pelo menos 10 caracteres. Você digitou ${raw.length} caracteres.`;
    }
  },
  tags: (input: string[]) => {
    if (input.length < 1) {
      return `Você precisa selecionar pelo menos uma tag. Você selecionou ${input.length} opções.`
    }
  },
};
