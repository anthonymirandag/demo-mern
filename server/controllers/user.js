const Users = require('../models/user')
const bcrypt = require('bcrypt')

const getUserByIdDb = (id,context)=>{
    return Users.findOne({_id:id}).lean()
}
const getUserByNameDb = (name,context)=>{
    return Users.findOne({name:name}).lean()
}
const getUserByEmailDb = (email,context)=>{
    return Users.findOne({email:email}).lean()
}


const createUserDB = (user,context) =>{
   user.password = bcrypt.hashSync(user.password,10)
    console.log(user)
    return Users.create(user)
}
const updateUserDb = (id,body ,options,context)=>{
    return Users.findOneAndUpdate({_id:id},body,options)
}
module.exports = {
    getUserByIdDb,
    getUserByNameDb,
    getUserByEmailDb,
    createUserDB,
    updateUserDb
}