const { validationResult } = require("express-validator")
const db = require('../../models/index')
const {encrypt, checkPassword}= require('../../utility/index')
const jwt = require('jsonwebtoken')



const registerUser = async(req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    const {username, email, password} = req.body

    console.log(username,email,password,'gw')
    
    const hashedPass =await encrypt(password)
    try{
      const resp = await db.sequelize.transaction(async(t)=>{
        const user = await db.User.create({
          username: username,
          email: email,
          password: hashedPass
        },{transaction: t})
        await user.update({storagePath: `/usr/${user.id}`},{transaction: t})
        // console.log(updateRes,'update')
        return user
      })
      console.log(resp,'user')
      res.status(200).json({message: 'user created successfully'})
    }
    catch(err){
      res.status(500).json({err: err.message})
    }
  }
  // const userDTO = req.body.user
  // const isValidated =   
  // console.log('helllloo')
}
const loginUser = async(req,res)=>{
  // console.log(req.user,'user')
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    try{
      const {email, password} = req.body
      const user = req.user
      const response = await checkPassword(password, user.password)
      if(response){
        const token = jwt.sign({
        _id: user.id
        },process.env.JWT_SECRET,{expiresIn: '2h'})
        // send jwt token 
        res.status(200).json({response: {
          token,
          user,
          message: 'Logged in successfully'
        }})
      }
      else {
        res.status(404).json({err: "password doesn't match"})
      }
    }
    catch(err){
      res.status(500).json({err:err.message})
    }

  }
  // console.log('heellooo login')
}
module.exports = {
registerUser,
loginUser
}