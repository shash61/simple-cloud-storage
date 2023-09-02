const multer  = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDirectoryName = req.user.id; // Replace with your user identifier logic
    const userUploadPath = path.join('uploads', `/usr-${userDirectoryName}`);

    // Create the destination directory if it doesn't exist
    fs.mkdirSync(userUploadPath, { recursive: true });
    cb(null, userUploadPath)
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.originalname}.${ext}`)
  }
})

const upload = multer({ storage: storage }).single('test')


const uploadFile = (req,res,err)=>{
  try{
    upload(req,res,(err)=>{
      if (err instanceof multer.MulterError){
        res.status(500).json({err : "some err in uploading file"})
      }else if(err){
        res.status(500).json({err: err.message})
      }
      console.log(req.file)
    })

  }
  catch(err){
    res.status(500).json({err: err.message})
  }

}

module.exports = {
  uploadFile
}