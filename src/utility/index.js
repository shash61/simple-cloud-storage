const db = require("../models")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const emailExists = async (value, request,login=false)=>{
  // console.log(request,'request')
  // console.log('in email exist',value, {req})
  const user = await db.User.findOne({
    where:{
      email: value
    }
  })
  // console.log(user,'user',login)
  if(!login){
    if(user===null) return true
    else throw new Error('email already exists')
  }
  else {
    if (user !==null){
      request.req.user = user
      return true
    } 
    else throw new Error('user not found')
  }
}

const encrypt = async(password)=>{
  const hashedPass = await bcrypt.hash(password, saltRounds)
  return hashedPass
}

const checkPassword = async(loggedInPassword, storedPassword)=>{
  console.log(storedPassword, loggedInPassword)
  const check = await bcrypt.compare(loggedInPassword,storedPassword)
  return check
}

module.exports = {
  emailExists,
  encrypt,
  checkPassword
}