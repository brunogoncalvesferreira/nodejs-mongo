import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
})

const user = mongoose.model('user', schemaUser)

export { user }