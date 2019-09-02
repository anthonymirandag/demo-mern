const mongoose=require('mongoose')

const Schema=mongoose.Schema;

let categoriaSchema=new Schema({
     name:{
         type:String ,
         require:[true]
        }
})
module.exports = mongoose.model('Categories',categoriaSchema);