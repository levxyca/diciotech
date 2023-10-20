type Code = string;

type Content = {
  code: Code;
};

export type Term = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content: Content;
};
