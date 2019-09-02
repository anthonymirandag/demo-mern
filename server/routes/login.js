const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/',async (req,res)=>{
    let {body} =  req
    try{
        const user = await Users.findOne({email:body.email}) 
        if(!user){
            return res.status(400).json({
                    ok : false,
                    err : {
                        message : "Direccion de correo no registrado"
                    }
            })
        }
        console.log(user.password)
        if(!bcrypt.compareSync(body.password,user.password)){
            return res.status(400).json({
                    ok : false,
                    err : {
                        message : "Usuario o contrasena incorrecta"
                    }
            })
        }
        let token = jwt.sign(
            { user },
            process.env.SEED,
            { expiresIn : process.env.CADUCIDAD_TOKEN }
        ) 

        res.json({
            ok : true,
            user: user,
            token : token
        })
    }catch(err){
         res.status(500).json({
            ok : false,
            err: err
        })   
    }    
})
module.exports = router