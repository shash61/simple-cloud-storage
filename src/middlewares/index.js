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
    req.user = user
    next()
  }catch(err){
    console.log(err)
    res.status(403).json({err: err.message})
  }
  // if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==="JWT"){
  //   console.log(req.headers.authorization.split(' ')[0]==="JWT")
  //   jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function(err,decode){
  //     if(err){
  //       req.user=null
  //       console.log(err)
  //       res.status(403).json({err: 'not authorized'})
  //     }
  //     else{
  //       console.log(decode)
  //       db.User.findOne({
  //         where:{
  //          id: decode._id  
  //         }
  //       }).then(user=> console.log(user)).catch(err=> err)
  //      next() 
  //     }
  //   })


  // }
  // next()
}

module.exports = {
  validAuth
}