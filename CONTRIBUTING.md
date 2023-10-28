# 📖 Contribua com o Diciotech

Que bom que você resolveu contribuir conosco, obrigado 💙! Neste guia vamos explicar como funcionam os processos para que você possa contribuir com esse projeto.

## 🤔 Como contribuir

Existem diversas formas de contribuir com o projeto:

- [Adicionando um novo termo técnico no Diciotech](#adicionando-um-novo-termo-técnico-no-diciotech)
- [Adicionando uma nova tag no Diciotech](#adicionando-uma-nova-tag-no-diciotech)
- [Reportando bugs](#reportando-bugs)
- [Indicando melhorias e pedindo funcionalidades](#indicando-melhorias-e-pedindo-funcionalidades)
- [Discutindo as issues](#discutindo-as-issues)
- [Fazendo pull requests](#fazendo-pull-requests)
- [Outras formas de contribuir](#outras-formas-de-contribuir)

### Adicionando um novo termo técnico no Diciotech

Adicione mais conteúdo no Diciotech [abrindo um pull request](#fazendo-pull-requests) com o termo que deseja que esteja presente no site. Para adicionar um novo termo, você deve acessar o arquivo `assets/data/cards_pt-br.json` e inserir um novo item na lista, seguindo a seguinte estrutura:

```json
{
   "title": "Termo técnico",
   "description": "Explicação sobre o termo",
   "tags": ["Tag1"]
}
```

ou

```json
{
   "title": "Termo técnico",
   "description": "Explicação sobre o termo",
   "content": {
      "code": "Código de exemplo"
   },
   "tags": ["Tag1", "Tag2"]
}
```

> **Observação:** caso a sua contribuição não se alinhe com qualquer uma das tags disponíveis, listadas na seção seguinte, verifique a seção [Adicionando uma nova tag no Diciotech](#adicionando-uma-nova-tag-no-diciotech).

Antes de abrir o pull request, algumas **regras** e **requisitos** devem ser seguidos para uma maior organização e estabilidade do Diciotech.

- Se o termo conter um código de exemplo, evite o escrever em uma linguagem de programação específica, faça isso **apenas** se realmente necessário;
- Um termo, de forma obrigatória, deve ser vinculado a, no mínimo, uma tag;
- Atribuir a um termo apenas as tags presentes nessa documentação, da exata mesma forma e escrita;
- Não pode haver duplicações de tags em um mesmo termo. Exemplo: `"tags": ["Conceito", "Conceito"]`;
- As tags atribuídas a um termo devem fazer total sentido com o mesmo.

### Adicionando uma nova tag no Diciotech

Você pode contribuir com o projeto propondo uma nova tag e apresentando-a, como sugestão, por meio de uma [issue](https://github.com/levxyca/diciotech/issues) para que se possa abrir uma discussão a respeito, para uma futura adição através de pull request. A tags disponíveis **sempre** devem estar presentes nessa documentação.

Tags disponíveis:

- `Back-end`;
- `Biblioteca`;
- `Conceito`;
- `Design`;
- `Ferramenta`;
- `Framework`;
- `Front-end`;
- `Mobile`;
- `Paradigma`;
- `Versionamento`.

Antes de criar uma issue e abrir um PR, todas as tags devem seguir algumas regras e requisitos:

- Todas as tags devem estar no singular;
- Atualmente, as tags são _case sensitivity_, então, por padrão, apenas a primeira letra da tag deve ser maiúscula. Exemplo: Back-end, Conceito, Paradigma;
- Para adicionar uma nova tag, primeiro deve ser aberto uma issue e, caso as pessoas usuárias concordem, um PR deve ser aberto, contendo a tag a ser acrescentada na documentação. A PR sendo aprovada, a nova tag poderá ser vinculada a um termo;
- As tags devem ser mais generalistas e categóricas, já que dispomos de um campo de pesquisa para uma busca mais específica e precisa. Exemplo de tags: Front-end, Design, Back-end;
- Não devem existir tags de linguagens de programação, bibliotecas e frameworks. Exemplo: JavaScript, C#, React.js.

### Reportando bugs

Se encontrou um bug você pode reportá-lo usando a ferramenta de
[issues do GitHub](https://github.com/levxyca/diciotech/issues). Porém antes de enviar seu bug é importante fazer as seguintes verificações:

1. Atualize seu repositório local na branch `main` mais recente. Talvez seu bug já tenha sido corrigido na versão mais recente;
2. Verifique se o bug já foi reportado por outra pessoa fazendo uma busca pelas issues.

Se o bug realmente não foi resolvido ou reportado, você pode
[criar uma nova issue](https://github.com/levxyca/diciotech/issues/new). No
título da issue tente resumir da melhor forma o problema encontrado.

Se possível inclua imagens ou vídeos à descrição do bug para facilitar o
processo de reprodução. Você também deve adicionar o
label **bug** à issue.

### Indicando melhorias e pedindo funcionalidades

Outra ótima forma de contribuir é indicando melhorias ao código do projeto e em como ele está estruturado ou pedindo funcionalidades novas. Se você tem qualquer ideia de como podemos melhorar alguma abordagem na solução de problemas, refatoração de código, melhoria em algum recurso ou qualquer outra coisa relacionada, siga estes passos:

1. Certifique-se de que sua ideia já não esteja sendo abordada em nosso [roadmap](./ROADMAP.md);
2. Também verifique se a ideia já não está pressente em nossas [issues do GitHub](https://github.com/levxyca/diciotech/issues);

Concluindo esses dois passos, você pode [criar uma nova issue](https://github.com/levxyca/diciotech/issues/new) descrevendo as melhorias e usando o label **feature**.

### Discutindo as issues

Antes de partirmos para o código em si é muito importante discutirmos com a
comunidade como cada issue será abordada.

Issues que estão em processo de discussão devem receber o label **discussion**
indicando que aquela issue precisa dos inputs e feedbacks da
comunidade.

### Fazendo pull requests

Para isso faça um fork do projeto e trabalhe em cima de
um branch diferente de `main` implementando suas soluções. Para saber mais sobre
pull requests e como eles funcionam, veja
[este link](https://help.github.com/articles/about-pull-requests/).

Antes de abrir seu PR (pull request):

- Leia com atenção o [README](./README.md) do projeto
- Se atente para que tenha um issue aberta relacionada ao seu PR
- Caso não tenha, crie uma seguindo o guia de contribuição

### Outras formas de contribuir

Se você não trabalha com código mas quer ajudar o projeto, existe muitas outras
formas de contribuir:

- Ajude com a documentação do projeto;
- Fale sobre o projeto nas suas redes sociais;
- Viu alguma discussão que te interessa e onde você pode acrescentar mesmo sem
  conhecimento técnico? Não se acanhe e participe também nas issues do GitHub.

Pensou em alguma outra forma de contribuir? Compartilha com a gente!
