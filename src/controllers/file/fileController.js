const fileService = require('../../services/file/fileService')

const upload = (req,res)=>{
  // console.log(req.body, req.file)
  const response = fileService.uploadFile(req,res)
}

module.exports = {
  upload
}