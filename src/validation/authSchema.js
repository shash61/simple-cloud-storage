const { emailExists } = require("../utility");

const signUpSchema = {
  email:{
    isEmail: {
      bail: true,
      errorMessage: 'please provide a valid email',
    },
    custom: {
      options: (value,{req})=> emailExists(value, {req}),
      bail: true
    }
  },
  password:{
      isLength:{
        options: {min:8},
        errorMessage: 'password lenth must be 8 or more',
        bail: true
      },
      matches: {
        options: /[-_$#]/,
        errorMessage: 'password must contain a symbol'
      }
  }
}

const loginSchema = {
  email:{
    isEmail: {
      bail: true,
      errorMessage: 'please provide a valid email',
    },
    custom:{
      options: (value,{req})=> emailExists(value, {req}, true),
      bail: true
    }
  },
  password: {
    notEmpty: true,
    errorMessage: "password should not be empty"
  }
}

module.exports= {
  signUpSchema,
  loginSchema
}