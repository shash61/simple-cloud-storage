const multer  = require('multer')
const path = require('path')
const fs = require('fs')
const db = require('../../models')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file,'file', req.body)
    const userDirectoryName = req.user.id; // Replace with your user identifier logic
    let userUploadPath = ""
    if(req.body.parent_folder_id.length){
      // const parentFolderPath = 
      userUploadPath = path.join('uploads',`${parentFolderPath}`)
    }
    else{
      userUploadPath = path.join('uploads', `/usr/${userDirectoryName}`);
      req.file.storedPath = userUploadPath
    }

    // Create the destination directory if it doesn't exist
    fs.mkdirSync(userUploadPath, { recursive: true });
    cb(null, userUploadPath)
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage }).single('test')


const uploadFile = (req,res,err)=>{
  try{
    upload(req,res, async(err)=>{
      if (err instanceof multer.MulterError){
        res.status(500).json({err : "some err in uploading file"})
      }else if(err){
        res.status(500).json({err: err.message})
      }
    //   const resp = db.sequelize.transaction(async(t)=>{
    //     const file = await db.File.create({
    //       filename: req.file.originalname,
    //       parent_folder_id: req.body.parent_folder_id,
    //       owner_id: req.body.owner_id
    //     },{transaction: t})
    //     const fileMetaData = await db.MetaData.create({
          
    //     })
    //   })
    })

  }
  catch(err){
    res.status(500).json({err: err.message})
  }

}

module.exports = {
  uploadFile
}