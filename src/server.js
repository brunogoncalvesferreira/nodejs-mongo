import fastify from 'fastify'

import './lib/mongo.js'

import { user } from './models/schema-user.js' // importando o arquivo schema-user 

const app = fastify()

// criar um usuário
app.post('/users', async (request, reply) => {
    const { name, email } = request.body // pegando o nome e o e-mail do corpo da requisição


    // criando uma variável para criar um usuário, passando o nome e o e-mail como parâmetros chamando o método create do mongoose
    const userCreated = await user.create({
        name, email
    })

    return userCreated // retornando o usuário criado
})

// listar os usuários
app.get('/users', async (request, reply) => {
    const users = await user.find()

    return users
})

// atualizar um usuário
app.put('/users/:id', async (request, reply) => {
    const { id } = request.params
    const { name, email } = request.body

    const userUpdated = await user.findByIdAndUpdate(id, {
        name, email
    })

    return userUpdated
})

// deletar um usuário
app.delete('/users/:id', async (request, reply) => {
    const { id } = request.params

    const userDeleted = await user.findByIdAndDelete(id)

    return {
        userDeleted,
        message: 'User deleted'
    }
})

app.listen({
    port: 8080
}).then(() => console.log('Server running on http://localhost:8080'))