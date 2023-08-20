const fileService = require('../../services/file/fileService')

const upload = (req,res)=>{
  const response = fileService.uploadFile(req,res)
}

module.exports = {
  upload
}