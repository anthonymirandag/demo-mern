const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* mongoose.connect('mongodb://localhost/demo',{ useNewUrlParser:true },(err)=>{
    if(err)
        console.log(err)
    else
        console.log('Mongo connect success')
}) */
let generos = {
    values : ['male','femine'],
    message : '{VALUE} no es genero valido'
}

const userSchema = new Schema({
    name : {
        type:String , 
        required : [true, 'Nombre de usuario es necesario']
    },
    email : { 
        type:String,
        unique : true,
        required : [true, 'Email de usuario es necesario']
    },
    gender: { 
        type : String,
        required : [true, 'Genero de usuario es necesario'],
        enum: generos   

    },
    birthdate : {
        type : Date,
        required : [true, 'Fecha de nacimiento de usuario es necesario']
    
    },
    password : {
        type : String , 
        required : [true, 'Password de usarios es necesario']
    },
    createAt: { 
        type: Date, 
        default: new Date() 
    },
})

userSchema.methods.toJSON = function (){
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

const Users = mongoose.model('Users',userSchema)



module.exports = Users
