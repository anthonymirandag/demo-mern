const mongoose = require('mongoose')
const Schema = mongoose.Schema

let opinionSchema=new Schema({

    position:{
        type:[Number],
        required : [true, 'La posicion es obligatoria']
    },
    description:{
        type:String,
        required: [true, 'La descripción es obligatoria']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    valoracion:{
        type:Number
    },
    category:{
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    foro:{
        type : Schema.Types.ObjectId,
        ref : 'Foro'
    }

})
module.exports = mongoose.model('Opiniones',opinionSchema);