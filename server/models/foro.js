const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foroSchema = new Schema({
    title : {
        type: String,
        required: [true, 'Tipo es requerido']
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }
})

const Foros = mongoose.model('Foros',foroSchema)

module.exports = Foros