# PROJETO DEVNOLOGY 2023

## Projeto

Extração de dados do site como forma de teste.

- https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops

## Tecnologias

- Node.js
- Express.js
- Docker
- Puppeteer
- Babel
- Winston

## Funcionalidades

- Busca de dados
- Filtro de busca
- Cadastro para uso da API

## Documentação da API

#### Retorna o estado do serviço

```http
  GET /api/v1/health
```

#### Retorna os produtos

```http
  GET /api/v1/products
```

| Parâmetro | Tipo     | Descrição                             |
| :-------- | :------- | :------------------------------------ |
| `filter`  | `string` | **Opcional**. O filtro para consulta. |

| Headers    | Tipo     | Descrição                                   |
| :--------- | :------- | :------------------------------------------ |
| `email`    | `string` | **Obrigatório**. O email para autenticação. |
| `password` | `string` | **Obrigatório**. A senha para autenticação. |

#### Cadatro de autenticação

```http
  POST /api/v1/account
```

| Parâmetro  | Tipo     | Descrição                               |
| :--------- | :------- | :-------------------------------------- |
| `name`     | `string` | **Obrigatório**. O nome para cadastro.  |
| `email`    | `string` | **Obrigatório**. O email para cadastro. |
| `password` | `string` | **Obrigatório**. A senha para cadastro. |

## Documentação

[Documentação](https://documenter.getpostman.com/view/16226643/2s8ZDeUex5)

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/MatheusWill/desafio-web-scraping.git
```

Entre no diretório do projeto

```bash
  cd desafio-web-scraping
```

Instale as dependências

```bash
  npm i
```

Inicie o modo desenvolvedor

```bash
  npm run server:dev
```

Inicie no ambiente Docker

```bash
  npm run docker:up
```

## Autores

- [@MatheusWill](https://github.com/MatheusWill)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-w-o/)

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de matheuswill6663@gmail.com
