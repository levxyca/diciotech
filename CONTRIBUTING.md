# 📖 Contribua com o Diciotech

Quer contribuir conosco?! Gratidão 💙

Neste guia vamos explicar como funcionam os processos para que você possa contribuir com o Diciotech.

## Como contribuir

Existem diversas formas de contribuir com o projeto:

- [📖 Contribua com o Diciotech](#-contribua-com-o-diciotech)
  - [Como contribuir](#como-contribuir)
  - [🤔 Entendendo a estrutura do Diciotech](#-entendendo-a-estrutura-do-diciotech)
  - [Discutindo as issues](#discutindo-as-issues)
  - [Fazendo pull requests](#fazendo-pull-requests)
  - [Adicionando um novo termo técnico no Diciotech](#adicionando-um-novo-termo-técnico-no-diciotech)
  - [Adicionando uma nova tag no Diciotech](#adicionando-uma-nova-tag-no-diciotech)
  - [Reportando bugs](#reportando-bugs)
  - [Indicando melhorias e pedindo funcionalidades](#indicando-melhorias-e-pedindo-funcionalidades)
  - [⚒️ Instalando o ambiente de desenvolvimento para contribuir](#️-instalando-o-ambiente-de-desenvolvimento-para-contribuir)
    - [Usando Development Containers (recomendado)](#usando-development-containers-recomendado)
    - [Instalando manualmente](#instalando-manualmente)
      - [Instalando Ruby e rbenv](#instalando-ruby-e-rbenv)
      - [Instalando as dependências do Diciotech](#instalando-as-dependências-do-diciotech)
      - [Executando o Diciotech localmente](#executando-o-diciotech-localmente)
  - [Outras formas de contribuir](#outras-formas-de-contribuir)

## 🤔 Entendendo a estrutura do Diciotech

O `diciotech` optou por utilizar o [Jekyll](https://jekyllrb.com/), um gerador de sites estáticos. Esta migração se deve principalmente por 3 motivos:

1. Suporte a internacionalização - usando o plugin [polyglot](https://github.com/untra/polyglot), é possível traduzir o site para várias línguas;
2. Divisão de conteúdo - o Jekyll permite dividir os dados dos termos em arquivos YAML por letra, o que facilita a manutenção e a adição de novos termos;
3. Facilidade de manutenção - como o site é "compilado" pelo Jekyll, ele é responsável por otimizar o html, css e js, isolando o desenvolvedor de ter que lidar manualmente com o [compilador sass](https://sass-lang.com/guide/), por exemplo.

A estrutura do repositório segue o padrão de [estrutura de sites em Jekyll](https://jekyllrb.com/docs/structure/), e é da seguinte forma:

```
diciotech
├── _assets (cria os cards.json final a partir dos yml)
│   ├── en-us
│   │   └── cards.json
│   └── pt-br
│       └── cards.json
├── assets (vão ser copiados tal qual pro repositório final, menos o style.scss)
│   ├── css
│   │   └── style.scss (usado pra gerar o style.css final)
│   ├── img
│   │   └── ...
│   └── js
│       ├── cookies.js
│       ├── levenshtein.js
│       └── theme.js
├── _config.yml (arquivo de configuração do Jekyll)
├── _data (onde ficam os dados de fato dos cards)
│   ├── en-us
│   │   ├── a.yml
│   │   ├── ...
│   │   └── z.yml
│   └── pt-br
│       ├── a.yml
│       ├── ...
│       └── z.yml
├── Gemfile (arquivo de dependências do Ruby)
├── Gemfile.lock (arquivo de dependências do Ruby com as versões)
├── _includes
│   └── script.liquid.js (script que gera o script.js final)
├── _layouts
│   └── base.liquid (layout base do site)
├── _pages (onde ficam as traduções dos termos nas páginas)
│   ├── en-us
│   │   └── search.md
│   └── pt-br
│       └── search.md
├── _sass (vai ser todo compilado no style.css)
│   ├── base.scss
│   ├── cookies.scss
│   ├── dark_theme.scss
│   ├── light_theme.scss
│   └── variables.scss
└── _site (onde o Jekyll gera o site final, não deve ser versionado)
    └── ...
```

## Discutindo as issues

Antes de partirmos para o código em si, é muito importante discutirmos com a comunidade como cada issue será abordada.

Issues que estão em processo de discussão devem receber a label **discussion**, indicando que aquela issue precisa de feedbacks da comunidade.

## Fazendo pull requests

Antes de abrir o seu PR, faça um fork do projeto e trabalhe em cima de um branch diferente da `main`, implementando suas soluções. Para saber mais sobre pull requests e como eles funcionam, veja [este link](https://help.github.com/articles/about-pull-requests/).

Antes de abrir seu PR (pull request):

- Leia com atenção o [README](./README.md) do projeto;
- Se atente para que tenha um issue aberta relacionada ao seu PR;
- Caso não tenha, crie uma seguindo o guia de contribuição.

## Adicionando um novo termo técnico no Diciotech

Adicione mais conteúdo no Diciotech [abrindo um pull request](#fazendo-pull-requests) com o termo que deseja que esteja presente no site. Para adicionar novos termos técnicos não é necessário instalar o ambiente de desenvolvimento. Todo o processo pode ser feito pela própria interface web do GitHub. Para isso, você deve acessar o arquivo referente à letra inicial do termo que deseja adicionar na pasta da língua específica em `_data/`. Por exemplo, para adicionar a explicação do termo `Abstraction` em português, é necessário abrir o arquivo `_data/pt-br/a.yml` e inserir um novo item na lista, em ordem alfabética por título, seguindo a seguinte estrutura:

```yml
- title: Termo técnico
  tags:
    - Tag 1
  description:
    "Explicação sobre o termo."
```

ou se quiser adicionar também um exemplo de código:

```yml
- title: Termo técnico
  tags:
    - Tag 1
    - Tag 2
  description:
    "Explicação sobre o termo."
  content:
    code: "curl https://www.google.com"
```

Note que o campo `content` é opcional e só deve ser usado se houver um exemplo de código que você deseja adicionar. Todos os outros campos são obrigatórios. Note também que os campos antes dos `:` são sempre em inglês, minúsculos e separados por `_`, e os campos depois dos `:` são sempre com a primeira letra maiúscula, com exceção do exemplo de código. Ao inserir o valor de um campo, não esqueça de colocar o valor entre aspas duplas. Esse passo não é estritamente necessário, mas evita problemas em que, por exemplo, a descrição contenha caracteres que podem levar o YAML a interpretar errado o valor (por exemplo, o `:` dentro do código acima). Para saber mais sobre o padrão YAML, leia [esta postagem](https://www.redhat.com/pt-br/topics/automation/what-is-yaml).

> **Observação:** caso a sua contribuição não se alinhe com qualquer uma das tags disponíveis, listadas na seção seguinte, verifique a seção [Adicionando uma nova tag no Diciotech](#adicionando-uma-nova-tag-no-diciotech).

Antes de abrir o pull request, algumas **boas práticas** devem ser seguidas para uma maior organização e estabilidade do Diciotech.

- Se o termo conter um código de exemplo, evite o escrever em uma linguagem de programação específica, faça isso **apenas** se realmente necessário;
- Um termo, deve ser vinculado a, no mínimo, uma tag;
- Atribuir a um termo apenas as tags presentes nessa documentação, da exata mesma forma e escrita;
- Evite duplicações de tags em um mesmo termo;
- Tome a cuidado para que as tags atribuídas a um termo façam sentido com o mesmo.

## Adicionando uma nova tag no Diciotech

Você pode contribuir com o projeto propondo uma nova tag e a apresentando, como sugestão, por meio de uma [issue](https://github.com/levxyca/diciotech/issues) para que se possa abrir uma discussão a respeito, para uma futura adição através de pull request. As tags disponíveis **sempre** vão estar presentes nessa documentação.

Tags disponíveis:

- `Back-end`;
- `Biblioteca`;
- `Conceito`;
- `Design`;
- `Ferramenta`;
- `Framework`;
- `Front-End`;
- `Front-end`;
- `Inteligência artificial`;
- `Mobile`;
- `Paradigma`;
- `Rede neural`;
- `Segurança cibernética`;
- `Versionamento`;
- `DevOps`;

Antes de criar uma issue e abrir um PR, todas as tags devem seguir algumas boas práticas:

- Todas as tags devem estar no singular
- Atualmente, as tags são _case sensitive_, então, por padrão, apenas a primeira letra da tag deve ser maiúscula. Exemplo: Back-end, Conceito, Paradigma
- Para adicionar uma nova tag, primeiro deve criar uma issue e, caso as pessoas usuárias concordem, um pull request deve ser aberto, contendo a tag. A PR sendo aprovada, a nova tag poderá ser vinculada a um termo
- As tags devem ser mais generalistas e categóricas, já que dispomos de um campo de pesquisa para uma busca mais específica e precisa. Exemplo de tags: Front-end, Design, Back-end

## Reportando bugs

Se encontrou um bug você pode reportá-lo usando a ferramenta de [issues do GitHub](https://github.com/levxyca/diciotech/issues). Porém, antes de criar a issue com as informações sobre o bug, é importante fazer as seguintes verificações:

1. Atualize seu repositório local na branch `main` mais recente. Talvez seu bug já tenha sido corrigido na versão mais recente
2. Verifique se o bug já foi reportado por outra pessoa, então faça uma busca pelas issues abertas

Se o bug realmente não foi resolvido ou reportado, você pode [criar uma nova issue](https://github.com/levxyca/diciotech/issues/new). No título da issue tente resumir da melhor forma o problema encontrado.

Se possível inclua imagens ou vídeos à descrição do bug para facilitar o processo de reprodução. Você também deve adicionar o label **bug** à issue.

## Indicando melhorias e pedindo funcionalidades

Outra ótima forma de contribuir é indicando melhorias ao código do projeto e em como ele está estruturado ou pedindo funcionalidades novas. Se você tem qualquer ideia de como podemos melhorar alguma abordagem na solução de problemas, refatoração de código, melhoria em algum recurso ou qualquer outra coisa relacionada, siga estes passos:

1. Certifique-se de que sua ideia já não esteja sendo abordada em nosso [roadmap](./ROADMAP.md)
2. Verifique se a ideia já não está presente em nossas [issues do GitHub](https://github.com/levxyca/diciotech/issues)

Concluindo esses dois passos, você pode [criar uma nova issue](https://github.com/levxyca/diciotech/issues/new) descrevendo as melhorias e usando o label **feature**.

## ⚒️ Instalando o ambiente de desenvolvimento para contribuir

Para adicionar novos termos técnicos não é necessário instalar o ambiente de desenvolvimento. Todo o processo pode ser feito pela própria interface web do GitHub.

Já para contribuições de layout ou qualquer outra, você precisa instalar o ambiente de desenvolvimento. O `diciotech` é construído com Ruby e Jekyll, então você precisa ter o Ruby instalado em sua máquina. Aqui estão as instruções para instalar o ambiente de desenvolvimento:

### Usando Development Containers (recomendado)

O `diciotech` suporta [Development Containers](https://containers.dev/supporting). Para isso é necessário ter instalado o [Docker](https://www.docker.com/products/docker-desktop). Ao abrir o repositório com o Visual Studio Code (VSCode), ele solicita que você instale a extensão necessária, então ele instala automaticamente tudo o que é necessário.

### Instalando manualmente

A instalação manual é um pouco mais trabalhosa, mas é útil se você deseja ter mais controle sobre o ambiente de desenvolvimento. Recomendado somente para usuários avançados.

#### Instalando Ruby e rbenv

Este tutorial foi testado em um ambiente Linux nativo (Ubuntu 24.04 LTS) e em um [ambiente WSL no Windows](https://learn.microsoft.com/pt-br/windows/wsl/install). Primeiro você precisa instalar o suporte à linguagem Ruby. A maneira recomendada é usar [rbenv](https://github.com/rbenv/rbenv) para instalar o Ruby de uma forma isolada do restante do sistema. Para instalar o `rbenv`, execute os seguintes comandos:

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
```

Isso fará o download e compilação do repositório `rbenv` no seu home. **NÃO** instale via `apt`, pois ele baixa uma versão mais antiga do pacote e não permite que você instale as versões mais recentes do Ruby. Em seguida, adicione as seguintes linhas ao seu arquivo `~/.bashrc`:

```bash
# habilita o rbenv
if [ -d "$HOME/.rbenv/" ]; then
    export PATH="$HOME/.rbenv/bin:$PATH"
    eval "$(rbenv init - bash)"
fi
```

Reinicie seu terminal ou execute `. ~/.bashrc` para recarregar suas configurações do bash. Isso tornará o comando `rbenv` disponível no terminal. Para testar se está funcionando corretamente, execute `curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash`. Ele deve produzir algo semelhante a isso:

```
Checking for `rbenv' in PATH: /home/gca/.rbenv/bin/rbenv
Checking for rbenv shims in PATH: Not found
Checking `rbenv install' support: /home/gca/.rbenv/plugins/ruby-build/bin/rbenv-install (ruby-build 20220910.1-10-gecb9d22)
Counting installed Ruby versions: 1 versions
Auditing installed plugins: OK
```

Vai aparecer um erro na linha `Checking for rbenv shims in PATH`. Não se preocupe, isso vai ser corrigido. Em seguida, você precisa instalar o [ruby-build](https://github.com/rbenv/ruby-build) como um plugin do `rbenv`, para que você possa facilmente baixar e instalar diferentes versões do Ruby. Para isso, execute os seguintes comandos:

```bash
mkdir -p "$(rbenv root)"/plugins
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

Para verificar quais versões do Ruby estão disponíveis para instalação, basta executar `rbenv install --list`. Você pode instalar qualquer versão que desejar, mas recomendo instalar a versão estável mais recente. No momento é a versão 3.3.4. Para instalá-la, você precisa primeiro instalar a dependência ssl e depois o Ruby.

```bash
sudo apt install -y libssl-dev
rbenv install 3.3.4
```

#### Instalando as dependências do Diciotech

Agora que você tem o Ruby instalado, você pode instalar as dependências do `diciotech`. Primeiro, clone o repositório `diciotech` em sua máquina local. Em seguida, entre no diretório do repositório e crie um ambiente Ruby local com a versão do Ruby instalada. Em seguida, instale o pacote `bundle`, para que ele se encarregue de instalar o restante das dependências. Para fazer tudo isso, execute os seguintes comandos:

```bash
git clone ~/git@github.com:levxyca/diciotech.git
cd ~/diciotech
rbenv local 3.3.4
gem install bundle
bundle install
```

#### Executando o Diciotech localmente

Agora você pode executar o site localmente. Tudo o que você precisa fazer é abrir o diretório do `diciotech` e executar o Jekyll:

```bash
bundle exec jekyll serve
```

Para ver o site em execução, abra seu navegador e vá para `http://localhost:4000`. Você deve ver uma cópia do [site](https://diciotech.netlify.app/). Agora, sinta-se à vontade para personalizar o site como desejar. Depois de terminar, lembre-se de **commitar** suas alterações finais.

## Outras formas de contribuir

Se você não trabalha com código mas quer ajudar o projeto, existe muitas outras formas de contribuir:

- Ajude com a documentação do projeto;
- Fale sobre o projeto nas suas redes sociais;
- Viu alguma discussão que te interessa e onde você pode acrescentar mesmo sem conhecimento técnico? Não se acanhe e participe também nas issues do GitHub.

Pensou em alguma outra forma de contribuir? Compartilha com a gente!
