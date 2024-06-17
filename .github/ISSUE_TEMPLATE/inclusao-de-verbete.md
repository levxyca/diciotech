---
name: Solicitar inclusão de verbete
about: Use este template se você quer propor um novo verbete no Diciotech
title: "[TERM] (informe o termo proposto)"
labels: new technical term
assignees: ''

body:
  - type: input
    id: term_title
    attributes:
      label: Como devemos apresentar o verbete?
      description: Aqui você pode sugerir um título para usarmos no dicionário
    validations:
      required: true
  - type: dropdown
    id: term_type
    attributes:
      label: Este verbete pertence a que categoria?
      description: Aqui você pode escolher mais de uma categoria se necessário
      multiple: true
      options:
        - Back-end
        - Biblioteca
        - Conceito
        - Design
        - Ferramenta
        - Framework
        - Front-end
        - Mobile
        - Paradigma
        - Versionamento
      validations:
        required: true
  - type: textarea
    id: term_description
    attributes:
      label: Como você acredita que podemos explicar o verbete?
      description: Como você propõe a explicação deste termo no dicionário
    validations:
      required: true
---


