const express = require('express')
const router = express.Router()
const Categories = require('../models/category')



router.get('/:termino', async (req,res)=>{
    const {termino} = req.params
    console.log(termino)
    const regex = new RegExp("^"+termino+"\\w+","i")
    console.log(regex)
    try{
        const categories = await Categories.find({name: regex})     
        res.json({
            ok : true,
            categories
        })
    }catch(err){
        res.status(500).json({
            ok : false,
            err
        })
    }
    
})

router.post('/',async (req,res)=>{
    const { body } = req
    try{
        const category = new Categories({
            name : body.name
        })
        const newCategory =  await category.save()
        res.json({
            ok:true,
            category: newCategory
        })         
    }catch(err){
        res.status(500).json({
            ok: false,
            err
        })
    }
    
})


module.exports = router