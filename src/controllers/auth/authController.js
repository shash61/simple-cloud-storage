const userService = require("../../services/user/userService")

const signUp = (req,res)=>{
  const resp = userService.registerUser(req,res)
  
  // res.send('geelo ssignup')
}
const login = (req,res)=>{
  const resp = userService.loginUser(req,res)
  
  
}

module.exports = {
  signUp,
  login
}