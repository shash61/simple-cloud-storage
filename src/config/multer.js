const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   console.log(file, "file", req.body);
    //   const userDirectoryName = req.user.id; // Replace with your user identifier logic
    //   let userUploadPath = "";
    //   console.log(req.body.parent_folder_id);
    //   if (req.body.parent_folder_id.length) {
    //     // const parentFolderPath =
    //     userUploadPath = path.join("uploads", `${parentFolderPath}`);
    //   } else {
    //     userUploadPath = path.join("uploads", `/usr/${userDirectoryName}`);
    //     req.storedPath = userUploadPath;
    //   }
  
    //   // Create the destination directory if it doesn't exist
    //   fs.mkdirSync(userUploadPath, { recursive: true });
    //   cb(null, userUploadPath);
    // },
    filename: function (req, file, cb) {
      let userUploadPath = ""
      const userDirectoryName = req.user.id 
      if (req.body.parent_folder_path.length) {
        userUploadPath = path.join("uploads", `${parentFolderPath}/${file.originalname}`);
      } else {
        userUploadPath = path.join("uploads", `/usr/${userDirectoryName}/${file.originalname}`);
      }
      req.storagePath = userUploadPath
      fs.mkdirSync(userUploadPath, { recursive: true });
      console.log(req.body)
      cb(null, `${file.originalname}`);
    },
  });
  
  const processFile = multer({ storage: storage }).single("file");

  module.exports = processFile