import mongoose from 'mongoose' // importando o mongoose

// configurando o mongoose para se conectar ao banco de dados mongodb
mongoose.connect('mongodb+srv://seu-usuário:password@cluster0.quxrmlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))
