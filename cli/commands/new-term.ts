import { intro, outro } from '@clack/prompts';
import crypto from "node:crypto";
import c from 'ansi-colors';

import { subjectivePromptQuestions } from "../core/questions";
import { availableTags } from "../core/available-tags";

import { multiSelect } from "../io/prompts/multiselect";
import { subjectiveQuestion } from "../io/prompts/text";
import { readFileContents } from "../io/read-file-sync";
import { confirmPrompt } from "../io/prompts/confirm";
import { writeToFile } from "../io/write-to-file";
import { notePrompt } from "../io/prompts/note";

import { cardsPath } from "../config/cards_pt-br-path";
import { codePath } from "../config/code-path";

import { parseJSONTerms } from "../utils/parse-terms";
import { merge } from "../utils/merge-item";

import { Term } from "../types";
import fs from "node:fs";

/**
 * Prompts the user for the term's information.
 */
export const createNewTerm = async (): Promise<Term> => {
  intro(c.bold.bgCyanBright.black(" Olá, boas-vindas ao Diciotech CLI! "))

  fs.stat(codePath, (err) => {
    if (err) {
      fs.writeFileSync(codePath, "")
    }
  })

  notePrompt(
    c.cyanBright(`Antes de começar, precisamos saber se o seu conceito ${c.bold.yellow("possui algum trecho de código")}.\nSe sim, você pode ${c.bold.yellow("escrever o código no arquivo")} ${c.bold.magenta(codePath)}.\nCaso contrário, ${c.bold.yellow("apenas ignore isso e continue")}.`),
    c.bold.bgYellow.black(" Importante ")
  )

  const [promptTitle, promptDescription] = subjectivePromptQuestions

  const title = await subjectiveQuestion({
    message: c.cyanBright(promptTitle.message),
    validation: promptTitle.validation,
  })
  const description = await subjectiveQuestion({
    message: c.cyanBright(promptDescription.message),
    validation: promptDescription.validation,
  })

  const tags = await multiSelect(
    "Selecione a(s) (tag)s relacionada(s) ao conceito",
    availableTags,
    (tags: symbol | string[]) => {
      if (typeof tags !== 'symbol' && tags.length < 1) {
        outro(c.bgRed.black(" Você precisa selecionar pelo menos uma tag. Tente novamente. "))
        process.exit(0);
      }
    }
  )

  const code = readFileContents(codePath)

  const card = {
    id: crypto.randomBytes(16).toString("hex"),
    title: title.toString(),
    description: description.toString(),
    tags: Array.isArray(tags) ? tags as string[] : [],
    content: {
      code: code?.trim(),
    },
  };

  const shouldVisualizeTerm = await confirmPrompt(
    c.cyanBright(`Deseja ${c.bold("visualizar")} o novo termo ?`)
  );

  const truncatedDescription = card.description.length > 60 ? `${card.description.slice(0, 60)}...` : card.description

  if (shouldVisualizeTerm) {
    notePrompt(
      JSON.stringify({
        title: card.title,
        description: truncatedDescription,
        tags: card.tags,
        content: {
          code: card.content.code.split("\n").filter(line => line !== "")
        }
      }, null, 2),
      c.bold.bgCyanBright.black(" Termo ")
    )
  }

  const shouldContinue = await confirmPrompt(
    c.cyanBright(`Show! Agora vamos gravar o conceito. ${c.bold("Deseja continuar")} ?`)
  )

  if (!shouldContinue) {
    outro(c.bgYellow.black(` Tudo bem! Se quiser tentar novamente, é só rodar o comando ${c.bold('npm run new')}. `))
    process.exit(0);
  }

  return card;
};

/**
 * Compounds all the steps to write a new term to a file.
 */
const compose = (
  newTerm: Term,
  filepath: string
) =>
  writeToFile(
    filepath,
    JSON.stringify({
      cards: merge(parseJSONTerms(readFileContents(filepath)), newTerm)
    }, null, 2)
  );

export const newTerm = async () => {
  try {
    const newTerm = await createNewTerm();
    compose(newTerm, cardsPath);

    writeToFile(codePath, ""); // clear code file

    notePrompt(c.cyanBright(`Se você quiser adicionar mais termos, é só rodar o comando ${c.bold('npm run new')}`), c.bold.bgGreen.black(" Feito "));
    outro(c.green(`Tudo certo! você pode abrir um ${c.bold("Pull Request")} em <${c.bold("https://github.com/levxyca/diciotech/pulls")}>`))
  } catch (error: unknown) {
    notePrompt(
      c.italic.red(`- Ocorreu um erro ao adicionar o novo termo.\n- Tente novamente seguindo as instruções.\n- Caso o erro persista, abra uma issue em https://github.com/levxyca/diciotech/issues.`),
      c.bold.bgRedBright.black(" Eita! Algo deu errado :( ")
    )

    if (error instanceof Error) {
      outro(c.red(`❌ ${error.message}`));
    }
  }
};