const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file, "file", req.body);
      const userDirectoryName = req.user.id; // Replace with your user identifier logic
      let userUploadPath = "";
      console.log(req.body.parent_folder_id);
      if (req.body.parent_folder_id) {
        // const parentFolderPath =
        userUploadPath = path.join("newuploads", `${parentFolderPath}`);
      } else {
        userUploadPath = path.join("newuploads", `/usr/${userDirectoryName}`);
        req.userUploadPath = userUploadPath;
      }
  
      // Create the destination directory if it doesn't exist
      fs.mkdir(userUploadPath, { recursive: true }, (err)=> {
        if(err) throw new Error(err)
      });
      console.log("-------------calling callback-----")
      cb(null, '');
      console.log("-------------finished calling callback-----")
    },
    filename: function (req, file, cb) {
      let userUploadPath = ""
      // const userDirectoryName = req.user.id 
      // if (req.body.parent_folder_path.length) {
      //   userUploadPath = path.join("uploads", `${parentFolderPath}/${file.originalname}`);
      // } else {
      //   userUploadPath = path.join("uploads", `/usr/${userDirectoryName}/${file.originalname}`);
      // }
      req.storagePath = `${req.storagePath}/${file.originalname}`
      // fs.mkdirSync(userUploadPath, { recursive: true });
      // console.log(req.body)
      cb(null, `${file.originalname}`);
    },
  });
  
  const processFile = multer({ storage: storage }).single("file");

  module.exports = processFile