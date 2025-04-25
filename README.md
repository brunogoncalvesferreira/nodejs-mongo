# Api com Node e Mongodb

## Introdução

Node.js é uma plataforma poderosa que permite desenvolver aplicações de rede escaláveis de forma rápida e eficiente. Quando combinamos Node.js com MongoDB, um banco de dados NoSQL, podemos criar APIs robustas que manipulam dados de forma fácil e intuitiva. Neste artigo, vamos criar uma API que alimenta um banco de dados MongoDB utilizando Mongoose, uma biblioteca ODM (Object Data Modeling) para Node.js.

## O que é o Mongoose?

Mongoose é uma biblioteca que facilita a interação entre aplicações Node.js e o MongoDB, permitindo a modelagem de dados através de esquemas. Isso ajuda a manter a estrutura e a integridade dos dados, fornecendo validações e métodos úteis.

## O que é o MongoDB?

O MongoDB é um banco de dados NoSQL que armazena dados em documentos JSON-like, conhecido como BSON. Ele é altamente escalável e flexível, tornando-se uma escolha popular para aplicações que precisam lidar com grandes volumes de dados não estruturados.

## Vamos iniciar um projeto em NodeJS

Crie uma pasta com o nome node-mongo, abra no VSCode abra o terminal e digite o comando para iniciar o nodejs:

```bash
npm init -y
```

Instale o Fastity para lidar com as rotas do nosso projeto:

```bash
npm install fastify
```

Vamos no arquivo `package.json` para mudarmos duas coisas:

Na linha 6 adicionei o `"type": "module"` para lidar com `import` e `export` usando ES6 imports

Na linha 8 apagamos e criamos um script `"dev": "node --watch ./src/server.js"`

Agora crie uma pasta com o nome `src` é um arquivo com o nome `server.js`

![alt text](image-10.png)

## Instalação do MongoDB

Antes de começarmos, precisamos instalar o MongoDB é fazer cadastro no site do MongoDB

```bash
npm install mongodb
```

Acesse o site pelo link é faça seu cadastro caso não tenha: https://account.mongodb.com/account/login

Acesse `View all projects` para criar um projeto do zero.

![alt text](image.png)

Clique em `New Project`

![alt text](image-1.png)

Dê um nome ao `projeto` e clique em `next`.

![alt text](image-2.png)

Clieque em `Create Project`

![alt text](image-3.png)

Com o projeto criado clique em `+ Create`

![alt text](image-4.png)

Escolha o plano `free` e clique em `Create Deployment`

![alt text](image-5.png)

Copie o `Password` é guarde para usarmos depois, clique em `Create database user`, e depois clique em `Proceed to connect`

![alt text](image-6.png)

Instale o mongodb no projeto pelo terminal digitando o comando `npm install mongodb` é copie o link de conexão do mongodb.

![alt text](image-7.png)

Clique em `Clusters`

![alt text](image-8.png)

Clique em `Browse Collections`

![alt text](image-9.png)

Pronto já configuramos o projeto no Mongodb. Agora vamos voltar para o Nodejs.

## Iniciando o servidor

No arquivo `server.js` vamos iniciar o servidor com o fastify.

```js
import fastify from 'fastify'

const app = fastify()

app
  .listen({
    port: 8080,
  })
  .then(() => console.log('Server running on http://localhost:8080'))
```

No terminal execute o comando para rodar o servidor:

```bash
npm run dev
```

Pronto servidor está rodando na porta `http://localhost:8080`

## Instalando o Mongoose

Mongoose é uma biblioteca que facilita a interação entre aplicações Node.js e o MongoDB.

No terminal digite o comando:

```bash
npm install mongoose
```

Com o mongoose instalado precisamos criar o esquema da nossa coleção (DB). Crie uma pasta dentro da pasta `src` com o nome `models` dentro dessa pasta um arquivo com o nome `schema-user.js`

Nesse arquivo vamos iniciar nosso esquema dos dados que vamos criar.

```js
import mongoose from 'mongoose' // importando o mongoose

/* criando um objeto, instânciando o mongoose e gerando o schema
 * do dados que no caso vamos criar
 * uma coleção de usuários com nome e e-mail.
 */
const schemaUser = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
})

// criando o modelo
const user = mongoose.model('user', schemaUser)

// export user
export { user }
```

Agora crie uma pasta com o nome `lib` e dentro dessa pasta um arquivo com o nome `mongo.js` onde vamos conectar nosso node com o mongodb.

```js
import mongoose from 'mongoose' // importando o mongoose

// configurando o mongoose para se conectar ao banco de dados mongodb
mongoose
  .connect(
    'mongodb+srv://seu-usuário:password@cluster0.quxrmlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' // cole aqui o seu link de conexão do mango db, o password que você guardou cole onde está escrito password
  )
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))
```

No `server.js` faça a impotarção do arquivo `mongo.js` para que o servidor se conecte com o mongodb.

```js
import fastify from 'fastify'

import './lib/mongo.js' // importando o arquivo mongo

const app = fastify()p

app
  .listen({
    port: 8080,
  })
  .then(() => console.log('Server running on http://localhost:8080'))
```

Se estiver tudo certo você verá a mensagem de `Database connected` no seu terminal.

![alt text](image-11.png)

Podemos agora criar um usuário no nosso banco de dados mongodb.

Importe no `server.js` o nosso `schema-user.js`

```js
import fastify from 'fastify'

import './lib/mongo.js'

import { user } from './models/schema-user.js' // importando o arquivo schema-user

const app = fastify()
```

Agora vamos criar nossa rota de criação de usuário usando o método POST.

```js
// criar um usuário
app.post('/users', async (request, reply) => {
  const { name, email } = request.body // pegando o nome e o e-mail do corpo da requisição

  // criando uma variável para criar um usuário, passando o nome e o e-mail como parâmetros chamando o método create do mongoose
  const userCreated = await user.create({
    name,
    email,
  })

  return userCreated // retornando o usuário criado
})
```

Para testar você pode usar o `Thunder Client` extensão do VSCODE para fazer requisições para o servidor.

![alt text](image-12.png)

Crie uma `new request` do método POST para criar um usuário.

![alt text](image-13.png)

Você pode ir no projeto no site do Mongodb é ver os dados criado.

Clique em Browser Collections para ver os dados criado.

![alt text](image-14.png)

Podemos ver nosso primeiro registro criado.

![alt text](image-15.png)

Vamos buscar e listar nossos registros.

```js
// listar os usuários
app.get('/users', async (request, reply) => {
  const users = await user.find() // usamos o método find para buscar os registros cadastrados em nosso banco de dados

  return users // retornamos todos os registros
})
```

Podemos testar com o `Thunder Client` usando o método http GET

![alt text](image-16.png)

Vamos atualizar um dado de um registro usando o método http PUT

```js
// atualizar um usuário
app.put('/users/:id', async (request, reply) => {
  const { id } = request.params // recebemos o id de um registro pelo params da requisição
  const { name, email } = request.body // recebemos pelo corpo da requisição os dados que queremos atualizar do registro

  // usamos o método finbByIdAndUpdate para atualizar os dados do registro, passando o id para identificar o usuário que vamos atualizar e os dados name e email caso queira atualizar
  const userUpdated = await user.findByIdAndUpdate(id, {
    name,
    email,
  })

  return userUpdated // retornamos o usuário atualizado
})
```

Podemos testar com o `Thunder Client` usando o método http PUT, repare na imagem que precisamos passar o id do usuário no params da rota `localhost:8080/users/680b9dce24d249da715eba4a`

![alt text](image-17.png)

Agora vamos deletar um usuário do nosso banco de dados com o método http DELETE, que e bem parecido com o método de atualizar

```js
// deletar um usuário
app.delete('/users/:id', async (request, reply) => {
  const { id } = request.params // recebemos o id do usuário que será deletado pelos params da requisição

  // usamos o método findByIdAndDelete para deletar um registro do banco recebendo o id
  const userDeleted = await user.findByIdAndDelete(id)

  // retornamos o usuário deletado com uma messagem de `User deleted`
  return {
    userDeleted,
    message: 'User deleted',
  }
})
```

Podemos testar com o `Thunder Client` usando o método HTTP DELETE

![alt text](image-18.png)

Se você usar o método GET para listar essa lista estará vazia.

Chegamos ao final onde criamos uma API REST com NodeJS, MongoDB usando o Mongoose para facilitar a integração do NodeJS com o Mongo.
