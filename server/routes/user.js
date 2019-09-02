const { Router } = require('express')
const router = Router()
const { createUserDB ,getUserByIdDb ,getUserByNameDb , getUserByEmailDb ,updateUserDb} =  require('../controllers/user')
const Users = require('../models/user')
const {checkToken} = require('../middlewares/authentication')

router.get('/detail/:id',async (req,res)=>{
    const {params :{id}} = req;
    try{
        const user = await getUserByIdDb(id , null)
        res.json({
            success : true,
            user
     })    
    }catch(error){
        res.json({
            success : false,
            mensaje : error.mesagge
        })
    }
    
})
router.get('/v2/:name',async (req,res)=>{
    const {params :{name}} = req;
    try{
        const user = await getUserByNameDb(name , null)
        res.json({
            success : true,
            user
     })    
    }catch(error){
        res.json({
            success : false,
            mensaje : error.mesagge
        })
    }
    
})
router.get('/:email',async (req,res)=>{
    const {params :{email}} = req;
    console.log(email)
     try{
        const user = await getUserByEmailDb(email, null)
        res.json({
            success : true,
            user
     })    
    }catch(error){
        res.json({
            success : false,
            mensaje : error.mesagge
        })
    }
    
})
router.post('/insertDb', async (req,res)=>{
    const {body} = req;
    
    try{
        const newUser = await createUserDB(body,null)
        console.log(body)
        res.json({
            success : true,
            user : newUser
        })
    }catch(error){
        res.json({
            success : false,
            mensaje : error
        })
    }
    
})
router.put('/:id', async (req,res)=>{
    const {params : {id}} = req
    const {body} = req
    delete body.password
    console.log(id,body)
    try{
        const userOld = await updateUserDb(id,body,{new:true , runValidators : true})     
        res.json({
            success:true,
            user : userOld
        })
    }catch(err){
        res.status(400).json({
            success: false,
            err: err
        })
    }
   
})

router.post('/', checkToken ,async (req,res)=>{
    const {body} = req
    
    try{
        const users = await Users.find({}).limit(5)
        res.json({
            ok:true,
            user: users
        })
    }catch(err){
        res.json({
            ok : true,
            err:err
        })
    }
    
})

module.exports = router