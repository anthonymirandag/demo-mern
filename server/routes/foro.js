const express = require('express')
const router = express.Router()
const Foros = require('../models/foro')
const { getTitleForo} = require('../controllers/foro')


router.get('/', async (req, res)=>{
    try{
        const foros = await Foros.find({}).populate('category','name')
        res.json({
            ok : true,
            foros
        })
    }catch(err){
        res.json({
            ok: false,
            err
        })
    }
    
})
router.post('/', async (req,res)=>{

    const { body } = req
    try{
        let foro = new Foros({
            title : body.title,
            category : body.category
        })
        let newForo = await foro.save()
        res.json({
            ok : true,
            foro : newForo
        })
    }catch(err){
        res.status(500).json({
            ok : false,
            err 
        })
    }
})
router.post('/semaforo', async (req,res)=>{
    const { body } = req
    const type = body.title
    const category = body.category
    console.log(type)
    try{
        let title =  await getTitleForo(type)
        let foro = new Foros({
            title : title,
            category
        })
        let newForo = foro.save()
        res.json({
            ok:true,
            newForo
        })
    }catch(err){
        res.json({
            ok:false,
            err
        })    
    }   
   
})




module.exports = router