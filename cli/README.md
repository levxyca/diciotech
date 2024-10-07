# Diciotech Command Line Interface (CLI)

A **CLI do Diciotech** permite que você crie novos termos de forma interativa através de um terminal. Esta ferramenta foi desenvolvida usando o framework Node.js. Portanto, é necessário ter o Node.js instalado em sua máquina para utilizar a CLI.

## Sumário

- [Diciotech Command Line Interface (CLI)](#diciotech-command-line-interface-cli)
  - [Sumário](#sumário)
  - [Introdução](#introdução)
  - [Instalação](#instalação)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Criando um novo termo](#criando-um-novo-termo)
  - [Criando um novo termo com código](#criando-um-novo-termo-com-código)
  - [Visualização](#visualização)
  - [Contribuição](#contribuição)

## Introdução

A CLI do Diciotech é projetada para facilitar a criação e a gestão de termos de maneira eficiente. Este documento guiará você pelo processo de instalação, configuração e uso da ferramenta, garantindo que você possa contribuir com novos termos para o repositório do Diciotech.

## Instalação

Para começar, você precisa instalar o Node.js. Acesse o guia de instalação para diversos sistemas operacionais na [documentação oficial do Node.js](https://nodejs.org/en/download/) e instale uma versão a partir da `18.17.1`.

## Clonando o Repositório

Após instalar o Node.js, você precisa fazer um fork do projeto. Consulte o guia para [criar um fork de um repositório](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

Feito isso, você pode clonar o fork do diciotech que está em seu perfil do GitHub e começar a contribuir com novos termos. Siga os passos abaixo para clonar o fork:

1. Por exemplo, para clonar o fork, execute o seguinte comando em seu terminal (substitua `<my-user>` pelo seu nome de usuário do GitHub):
    ```bash
    git clone https://github.com/<my-user>/diciotech.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd diciotech
    ```

3. Crie uma nova branch para adicionar o termo:
    ```bash
    git checkout -b my-branch-name # ou git switch -c my-branch-name
    ```

## Criando um novo termo

Para criar um novo termo, execute o comando `npm run new` em seu terminal. A CLI fará uma série de perguntas:

1. Nome do termo que você deseja criar.
2. Definição que descreve o termo.
3. Categoria(s) do termo (tecla `Space` para selecionar).
4. Visualização prévia do termo antes de criá-lo.
5. Confirmação para gravar o termo.

Após responder às perguntas, o termo será criado. Em seguida, você pode fazer um pull request para o repositório do [Diciotech](https://github.com/levxyca/diciotech.git). Consulte o guia [CONTRIBUTING](https://github.com/levxyca/diciotech/blob/main/CONTRIBUTING.md) para mais detalhes sobre como contribuir.

## Criando um novo termo com código

Para criar um novo termo com um exemplo de código:

1. Localize o arquivo **code** na raiz do projeto.
2. Abra o arquivo e adicione o código que deseja incluir, devidamente indentado.
3. Execute o comando `npm run new` no seu terminal e siga os passos mencionados anteriormente.
4. Quando a CLI perguntar se você deseja visualizar o termo, selecione `Sim` para ver o termo com o código que você adicionou.

## Visualização

<img src="https://i.imgur.com/RXHCynd.png"  width="100%" />

## Contribuição

Quer contribuir para o Diciotech? Confira nosso guia de contribuição para aprender como você pode ajudar a melhorar e expandir o projeto. Seu feedback e suas contribuições são muito bem-vindos!

Para mais informações, consulte o [guia de contribuição](https://github.com/levxyca/diciotech/blob/main/CONTRIBUTING.md).