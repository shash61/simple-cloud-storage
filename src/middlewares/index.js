const jwt = require("jsonwebtoken")
const db = require("../models")

const validAuth = async(req,res,next)=>{
  console.log('in valid middleware')
  try{
    const token = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    console.log(token)
    const user = await db.User.findOne({
      where:{
        id: token._id
      }
    })
    req.user = user.dataValues
    next()
  }catch(err){
    console.log(err)
    res.status(403).json({err: err.message})
  }
}

module.exports = {
  validAuth
}